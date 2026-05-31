"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const articleSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(10, "Content is required"),
  coverImage: z.string().optional().nullable(),
  category: z.string().default("blog"),
  isPublished: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

export async function getArticles(admin = false) {
  try {
    const articles = await prisma.article.findMany({
      where: admin ? undefined : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string, admin = false) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });
    
    if (!article) return null;
    
    // Only return if it's published or if admin is requesting
    if (!admin && !article.isPublished) return null;
    
    return article;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}

export async function getArticleById(id: number) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });
    return article;
  } catch (error) {
    console.error("Error fetching article by id:", error);
    return null;
  }
}

export async function createArticle(data: ArticleFormData) {
  try {
    const validatedData = articleSchema.parse(data);

    // Check if slug already exists
    const existing = await prisma.article.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existing) {
      return { success: false, error: "Slug already exists. Please choose another one." };
    }

    await prisma.article.create({
      data: {
        ...validatedData,
        publishedAt: validatedData.isPublished ? new Date() : null,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", details: error.issues };
    }
    return { success: false, error: "Internal server error" };
  }
}

export async function updateArticle(id: number, data: ArticleFormData) {
  try {
    const validatedData = articleSchema.parse(data);

    // Check if slug is taken by another article
    const existing = await prisma.article.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existing && existing.id !== id) {
      return { success: false, error: "Slug already exists. Please choose another one." };
    }

    const currentArticle = await prisma.article.findUnique({ where: { id } });
    
    let publishedAt = currentArticle?.publishedAt;
    if (validatedData.isPublished && !currentArticle?.isPublished) {
      publishedAt = new Date(); // newly published
    }

    await prisma.article.update({
      where: { id },
      data: {
        ...validatedData,
        publishedAt,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${validatedData.slug}`);
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error updating article:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", details: error.issues };
    }
    return { success: false, error: "Internal server error" };
  }
}

export async function deleteArticle(id: number) {
  try {
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Internal server error" };
  }
}
