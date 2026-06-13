"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createInvoice } from "@/actions/invoice";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewInvoicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    amount: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.amount || !formData.description) {
      alert("Harap lengkapi field yang wajib (Nama, Nominal, Deskripsi).");
      return;
    }

    setSaving(true);
    try {
      const res = await createInvoice({
        ...formData,
        amount: parseFloat(formData.amount),
      });

      if (res.success) {
        router.push("/admin/invoices");
      } else {
        alert(res.error || "Gagal membuat invoice.");
        setSaving(false);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted mb-1">
            <Link href="/admin/invoices" className="hover:text-foreground transition-colors flex items-center">
              <ChevronLeft size={12} className="mr-1" /> Kembali
            </Link>
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Buat Invoice Baru</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Memproses..." : "Simpan & Buat Link"}
        </button>
      </div>

      {/* Form */}
      <div className="bg-surface border border-border p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-[11px] font-medium text-foreground uppercase tracking-wider">
              Nama Klien <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-[#555] transition-colors"
              placeholder="Contoh: PT. Maju Bersama"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-foreground uppercase tracking-wider">
              Email Klien
            </label>
            <input
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              type="email"
              className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-[#555] transition-colors"
              placeholder="klien@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-foreground uppercase tracking-wider">
              No. Telepon Klien
            </label>
            <input
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              type="tel"
              className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-[#555] transition-colors"
              placeholder="0812xxxx"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-[11px] font-medium text-foreground uppercase tracking-wider">
              Deskripsi Tagihan <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-[#555] transition-colors resize-none"
              placeholder="Contoh: Pembayaran DP 50% untuk pembuatan website e-commerce"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-[11px] font-medium text-foreground uppercase tracking-wider">
              Nominal (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-[#555] transition-colors"
              placeholder="1500000"
            />
            <p className="text-[11px] text-muted mt-1">Masukkan angka saja tanpa titik/koma.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
