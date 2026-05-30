"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: "asc" },
    });
    return { success: true, services };
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return { success: false, error: "Gagal memuat layanan." };
  }
}

export async function getPublicServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: "asc" },
    });
    return services;
  } catch (error) {
    console.error("Failed to fetch public services:", error);
    return [];
  }
}

export async function createService(data: {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceFrom?: string | null;
  isFeatured?: boolean;
}) {
  try {
    const service = await prisma.service.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        icon: data.icon,
        features: data.features,
        priceFrom: data.priceFrom || null,
        isFeatured: data.isFeatured ?? false,
      },
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, service };
  } catch (error: any) {
    console.error("Failed to create service:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Slug sudah digunakan. Silakan gunakan slug lain." };
    }
    return { success: false, error: "Gagal membuat layanan baru." };
  }
}

export async function updateService(
  id: number,
  data: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    priceFrom?: string | null;
    isFeatured?: boolean;
  }
) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        icon: data.icon,
        features: data.features,
        priceFrom: data.priceFrom || null,
        isFeatured: data.isFeatured ?? false,
      },
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, service };
  } catch (error: any) {
    console.error("Failed to update service:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Slug sudah digunakan. Silakan gunakan slug lain." };
    }
    return { success: false, error: "Gagal memperbarui layanan." };
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Gagal menghapus layanan." };
  }
}
