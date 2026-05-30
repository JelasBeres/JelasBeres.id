"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, messages };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return { success: false, error: "Gagal memuat kontak/pesan masuk." };
  }
}

export async function createContact(data: {
  name: string;
  email: string;
  company?: string | null;
  serviceType: string;
  status?: string;
  message: string;
}) {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        serviceType: data.serviceType,
        status: data.status || "pending",
        message: data.message,
      },
    });

    revalidatePath("/admin/crm");
    revalidatePath("/admin");
    return { success: true, contact };
  } catch (error) {
    console.error("Failed to create contact:", error);
    return { success: false, error: "Gagal menambahkan kontak baru." };
  }
}

export async function updateContact(
  id: number,
  data: {
    name: string;
    email: string;
    company?: string | null;
    serviceType: string;
    status: string;
    message: string;
  }
) {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        serviceType: data.serviceType,
        status: data.status,
        message: data.message,
      },
    });

    revalidatePath("/admin/crm");
    revalidatePath("/admin");
    return { success: true, contact };
  } catch (error) {
    console.error("Failed to update contact:", error);
    return { success: false, error: "Gagal memperbarui kontak." };
  }
}

export async function updateMessageStatus(id: number, status: string) {
  try {
    const message = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/crm");
    revalidatePath("/admin");
    return { success: true, message };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Gagal memperbarui status." };
  }
}

export async function deleteMessage(id: number) {
  try {
    await prisma.contact.delete({
      where: { id },
    });

    revalidatePath("/admin/crm");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return { success: false, error: "Gagal menghapus kontak." };
  }
}
