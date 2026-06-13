import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft } from "lucide-react";

export const revalidate = 0;

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#111] px-8 py-6 text-white text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">INVOICE</p>
            <h1 className="text-xl font-medium tracking-tight">JelasBeres.id</h1>
          </div>

          <div className="p-8 space-y-8">
            {/* Status & Info */}
            <div className="flex flex-col items-center justify-center space-y-2 pb-6 border-b border-gray-100">
              {invoice.status === "PAID" ? (
                <div className="flex flex-col items-center text-green-600">
                  <CheckCircle2 size={48} strokeWidth={1.5} className="mb-3" />
                  <span className="text-lg font-semibold uppercase tracking-wider">Lunas</span>
                  <span className="text-sm text-gray-500 mt-1">Terima kasih atas pembayaran Anda!</span>
                </div>
              ) : invoice.status === "CANCELLED" ? (
                <div className="flex flex-col items-center text-red-500">
                  <span className="text-lg font-semibold uppercase tracking-wider">Dibatalkan</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-yellow-600">
                  <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full mb-2 uppercase tracking-widest">
                    Menunggu Pembayaran
                  </span>
                </div>
              )}
            </div>

            {/* QRIS Section (Moved to top) */}
            {invoice.status === "PENDING" && (
              <div className="flex flex-col items-center justify-center pb-6 space-y-4 border-b border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                  Silakan scan QRIS di bawah ini menggunakan aplikasi mobile banking atau e-wallet pilihan Anda.
                </p>
                <div className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm max-w-[280px]">
                  <Image 
                    src="/qris.jpg" 
                    alt="QRIS JelasBeres.id" 
                    width={500} 
                    height={500}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                </div>
                <p className="text-xs text-gray-400 text-center px-4">
                  Pastikan nama penerima adalah <strong>Jelas Beres</strong> dan masukkan nominal <strong>{formatCurrency(invoice.amount)}</strong>.
                </p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-start text-sm">
                <span className="text-gray-500">Invoice ID</span>
                <span className="font-medium font-mono text-gray-900">{invoice.id}</span>
              </div>
              <div className="flex justify-between items-start text-sm">
                <span className="text-gray-500">Tagihan Kepada</span>
                <span className="font-medium text-gray-900 text-right">
                  {invoice.clientName}
                  {invoice.clientEmail && <span className="block text-gray-500 text-xs font-normal">{invoice.clientEmail}</span>}
                </span>
              </div>
              <div className="flex justify-between items-start text-sm">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-medium text-gray-900">
                  {new Date(invoice.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>       
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Deskripsi Tagihan</p>
              <p className="text-sm text-gray-900 font-medium">{invoice.description}</p>
            </div>

            <div className="flex justify-between items-center pt-6 pb-2 border-t border-gray-100">
              <span className="text-sm text-gray-500">Total Tagihan</span>
              <span className="text-2xl font-bold text-gray-900">{formatCurrency(invoice.amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
