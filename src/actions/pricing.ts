"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPricingPlans() {
  try {
    const plans = await prisma.pricing.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return { success: true, plans };
  } catch (error) {
    console.error("Failed to fetch pricing plans:", error);
    return { success: false, error: "Gagal memuat pricing plans." };
  }
}

export async function getPublicPricingPlans() {
  try {
    const plans = await prisma.pricing.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return plans;
  } catch (error) {
    console.error("Failed to fetch public pricing plans:", error);
    return [];
  }
}

export async function createPricingPlan(data: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  orderIndex?: number;
}) {
  try {
    const plan = await prisma.pricing.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        features: data.features,
        highlighted: data.highlighted ?? false,
        orderIndex: data.orderIndex ?? 0,
      },
    });

    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { success: true, plan };
  } catch (error: any) {
    console.error("Failed to create pricing plan:", error);
    return { success: false, error: "Gagal membuat pricing plan baru." };
  }
}

export async function updatePricingPlan(
  id: number,
  data: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    orderIndex?: number;
  }
) {
  try {
    const plan = await prisma.pricing.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        features: data.features,
        highlighted: data.highlighted ?? false,
        orderIndex: data.orderIndex ?? 0,
      },
    });

    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { success: true, plan };
  } catch (error: any) {
    console.error("Failed to update pricing plan:", error);
    return { success: false, error: "Gagal memperbarui pricing plan." };
  }
}

export async function deletePricingPlan(id: number) {
  try {
    await prisma.pricing.delete({
      where: { id },
    });

    revalidatePath("/pricing");
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete pricing plan:", error);
    return { success: false, error: "Gagal menghapus pricing plan." };
  }
}
