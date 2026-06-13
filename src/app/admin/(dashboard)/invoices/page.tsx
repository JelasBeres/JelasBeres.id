"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getInvoices, updateInvoiceStatus } from "@/actions/invoice";
import { Plus, Loader2, Search, ExternalLink, Receipt, Edit2, CheckCircle2 } from "lucide-react";

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  amount: number;
  description: string;
  status: string;
  paymentUrl: string | null;
  dueDate: Date | null;
  createdAt: Date;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await getInvoices();
      if (res.success && res.invoices) {
        setInvoices(res.invoices as Invoice[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleMarkAsPaid = async (id: string) => {
    if (confirm("Are you sure you want to mark this invoice as PAID?")) {
      const res = await updateInvoiceStatus(id, "PAID");
      if (res.success) {
        fetchInvoices();
      } else {
        alert("Failed to update status");
      }
    }
  };

  const filtered = invoices.filter((inv) =>
    [inv.clientName, inv.clientEmail, inv.description, inv.id]
      .some((f) => f?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Invoices & QRIS</h1>
        </div>
        <Link
          href="/admin/invoices/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Buat Invoice
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Cari invoice (nama, email, ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border text-foreground text-[13px] placeholder:text-muted focus:outline-none focus:border-border transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat data invoices...
        </div>
      ) : (
        <div className="border border-border bg-surface overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-muted text-sm">Tidak ada invoice ditemukan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface-hover text-[11px] uppercase tracking-wider text-muted">
                    <th className="px-4 py-3 font-medium">Invoice ID</th>
                    <th className="px-4 py-3 font-medium">Klien</th>
                    <th className="px-4 py-3 font-medium">Deskripsi</th>
                    <th className="px-4 py-3 font-medium">Nominal</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Tanggal</th>
                    <th className="px-4 py-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-[13px] text-foreground">
                  {filtered.map((inv) => (
                    <tr key={inv.id} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-[12px]">{inv.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{inv.clientName}</div>
                        {inv.clientEmail && <div className="text-[11px] text-muted">{inv.clientEmail}</div>}
                      </td>
                      <td className="px-4 py-3 text-muted max-w-[200px] truncate">{inv.description}</td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(inv.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium ${
                          inv.status === "PAID" ? "bg-green-100 text-green-700" :
                          inv.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted">
                        {new Date(inv.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                        {inv.paymentUrl && (
                          <a
                            href={inv.paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 border border-border rounded text-muted hover:text-blue-500 hover:border-blue-300 transition-colors tooltip-trigger"
                            title="Buka Link Pembayaran/QRIS"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {inv.status === "PENDING" && (
                          <button
                            onClick={() => handleMarkAsPaid(inv.id)}
                            className="p-1.5 border border-border rounded text-muted hover:text-green-500 hover:border-green-300 transition-colors tooltip-trigger"
                            title="Tandai Sudah Dibayar"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
