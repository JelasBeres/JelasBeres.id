"use server";

import { z } from "zod";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContact(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      serviceType: formData.get("serviceType") as string,
      message: formData.get("message") as string,
    };

    const validatedData = contactSchema.parse(data);

    // Save to Database
    await db.insert(contacts).values(validatedData);

    // Send email via Resend if API key is present
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "JelasBeres <hello@jelasberes.id>",
        to: validatedData.email,
        subject: "Terima kasih telah menghubungi JelasBeres.id",
        html: `
          <h1>Halo ${validatedData.name},</h1>
          <p>Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali.</p>
          <p><strong>Detail Pesan:</strong></p>
          <ul>
            <li>Layanan: ${validatedData.serviceType}</li>
            <li>Pesan: ${validatedData.message}</li>
          </ul>
          <p>Salam,<br/>Tim JelasBeres.id</p>
        `,
      });
    }

    return { success: true, message: "Pesan berhasil dikirim." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", details: error.issues };
    }
    return { success: false, error: "Internal server error" };
  }
}
