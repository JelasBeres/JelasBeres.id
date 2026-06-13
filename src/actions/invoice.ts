"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, invoices };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { success: false, error: "Failed to fetch invoices" };
  }
}

export async function createInvoice(data: {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  amount: number;
  description: string;
  dueDate?: Date;
}) {
  try {
    // Generate an order ID based on timestamp or random string to avoid duplicate
    const orderId = `INV-${Date.now()}`;

    // Save to database
    const invoice = await prisma.invoice.create({
      data: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        amount: data.amount,
        description: data.description,
        dueDate: data.dueDate,
        status: "PENDING",
      },
    });

    // Update paymentUrl to point to the local invoice page
    const paymentUrl = `/invoice/${invoice.id}`;
    
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { paymentUrl }
    });

    revalidatePath("/admin/invoices");

    return { success: true, invoice: { ...invoice, paymentUrl } };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function updateInvoiceStatus(id: string, status: string) {
  try {
    await prisma.invoice.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/invoices");
    return { success: true };
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
