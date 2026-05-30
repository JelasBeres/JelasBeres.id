"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return { success: true, projects };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { success: false, error: "Gagal memuat portofolio." };
  }
}

export async function getPublicProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch public projects:", error);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { orderIndex: "asc" },
      take: 6,
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export async function createProject(data: {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  thumbnailUrl: string;
  liveUrl?: string | null;
  repoUrl?: string | null;
  category: string;
  featured?: boolean;
  orderIndex?: number;
}) {
  try {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        techStack: data.techStack,
        thumbnailUrl: data.thumbnailUrl,
        liveUrl: data.liveUrl || null,
        repoUrl: data.repoUrl || null,
        category: data.category,
        featured: data.featured ?? false,
        orderIndex: data.orderIndex ?? 0,
      },
    });

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${data.category}`);
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Slug sudah digunakan. Silakan gunakan slug lain." };
    }
    return { success: false, error: "Gagal membuat project baru." };
  }
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    slug: string;
    description: string;
    techStack: string[];
    thumbnailUrl: string;
    liveUrl?: string | null;
    repoUrl?: string | null;
    category: string;
    featured?: boolean;
    orderIndex?: number;
  }
) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        techStack: data.techStack,
        thumbnailUrl: data.thumbnailUrl,
        liveUrl: data.liveUrl || null,
        repoUrl: data.repoUrl || null,
        category: data.category,
        featured: data.featured ?? false,
        orderIndex: data.orderIndex ?? 0,
      },
    });

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${data.category}`);
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to update project:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Slug sudah digunakan. Silakan gunakan slug lain." };
    }
    return { success: false, error: "Gagal memperbarui project." };
  }
}

export async function deleteProject(id: number) {
  try {
    const project = await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.category}`);
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Gagal menghapus project." };
  }
}
