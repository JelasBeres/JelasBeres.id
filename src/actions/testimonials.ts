"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, testimonials };
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return { success: false, error: "Gagal memuat testimoni." };
  }
}

export async function getPublicTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return testimonials;
  } catch (error) {
    console.error("Failed to fetch public testimonials:", error);
    return [];
  }
}

export async function createTestimonial(data: {
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string | null;
  content: string;
  rating: number;
  isPublished?: boolean;
}) {
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: data.clientName,
        clientRole: data.clientRole,
        company: data.company,
        avatarUrl: data.avatarUrl || null,
        content: data.content,
        rating: data.rating,
        isPublished: data.isPublished ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, error: "Gagal membuat testimoni baru." };
  }
}

export async function updateTestimonial(
  id: number,
  data: {
    clientName: string;
    clientRole: string;
    company: string;
    avatarUrl?: string | null;
    content: string;
    rating: number;
    isPublished?: boolean;
  }
) {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        clientName: data.clientName,
        clientRole: data.clientRole,
        company: data.company,
        avatarUrl: data.avatarUrl || null,
        content: data.content,
        rating: data.rating,
        isPublished: data.isPublished ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, error: "Gagal memperbarui testimoni." };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, error: "Gagal menghapus testimoni." };
  }
}
