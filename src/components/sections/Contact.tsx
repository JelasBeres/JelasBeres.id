"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContact } from "@/actions/contact";
import { Terminal, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ServiceData {
  slug: string;
  title: string;
}

interface ContactProps {
  services?: ServiceData[];
}

export function Contact({ services }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const result = await submitContact(formData);
    
    if (result.success) {
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-background border-t border-border relative">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-8">
          <span className="font-mono text-sm text-green tracking-wider mb-2 block flex items-center justify-center gap-2">
            <Terminal size={14} /> ./initiate_contact.sh
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight mb-3">
            Siap membangun sesuatu yang luar biasa?
          </h2>
          <p className="font-sans text-muted text-sm md:text-base">
            Let's discuss your next project. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-surface border border-border p-6 relative overflow-hidden">
          {/* Blueprint decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted">NAME *</label>
                <input
                  {...register("name")}
                  className="w-full bg-surface-hover border border-border px-4 py-2 text-foreground focus:border-green transition-colors text-sm"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs font-mono mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted">EMAIL *</label>
                <input
                  {...register("email")}
                  className="w-full bg-surface-hover border border-border px-4 py-2 text-foreground focus:border-green transition-colors text-sm"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs font-mono mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company */}
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted">COMPANY</label>
                <input
                  {...register("company")}
                  className="w-full bg-surface-hover border border-border px-4 py-2 text-foreground focus:border-green transition-colors text-sm"
                  placeholder="ACME Corp"
                />
              </div>

              {/* Service Type */}
              <div className="space-y-1">
                <label className="font-mono text-xs text-muted">SERVICE *</label>
                <select
                  {...register("serviceType")}
                  className="w-full bg-surface-hover border border-border px-4 py-2 text-foreground focus:border-green transition-colors appearance-none text-sm"
                >
                  <option value="">Select a service</option>
                  {services && services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.slug} value={service.title}>
                        {service.title}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Web Development">Pengembangan Web</option>
                      <option value="Mobile App">Aplikasi Mobile</option>
                      <option value="UI/UX Design">Desain UI/UX</option>
                      <option value="Backend & API">Integrasi API</option>
                      <option value="Tech Consulting">Konsultasi IT</option>
                      <option value="Maintenance">Pemeliharaan Sistem</option>
                    </>
                  )}
                </select>
                {errors.serviceType && <p className="text-red-400 text-xs font-mono mt-1">{errors.serviceType.message}</p>}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="font-mono text-xs text-muted">MESSAGE *</label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full bg-surface-hover border border-border px-4 py-2 text-foreground focus:border-green transition-colors resize-none text-sm"
                placeholder="Tell us about your project requirements..."
              />
              {errors.message && <p className="text-red-400 text-xs font-mono mt-1">{errors.message.message}</p>}
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="bg-green/10 border border-green text-green p-4 flex items-center gap-2 font-mono text-sm">
                <CheckCircle size={16} /> Pesan berhasil dikirim. Kami akan segera menghubungi Anda.
              </div>
            )}
            
            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 flex items-center gap-2 font-mono text-sm">
                <AlertCircle size={16} /> {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 text-sm bg-foreground text-background font-sans font-bold hover:bg-green transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "UPLOADING..." : "Kirim Pesan"} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
