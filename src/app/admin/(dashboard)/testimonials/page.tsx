"use client";

import React, { useEffect, useState } from "react";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/testimonials";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Star,
} from "lucide-react";

interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl: string | null;
  content: string;
  rating: number;
  isPublished: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isPublished, setIsPublished] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await getTestimonials();
      if (res.success && res.testimonials) setTestimonials(res.testimonials as Testimonial[]);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setClientName(""); setClientRole(""); setCompany("");
    setAvatarUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150");
    setContent(""); setRating(5); setIsPublished(true);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setClientName(t.clientName); setClientRole(t.clientRole); setCompany(t.company);
    setAvatarUrl(t.avatarUrl || ""); setContent(t.content); setRating(t.rating); setIsPublished(t.isPublished);
    setDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { clientName, clientRole, company, avatarUrl: avatarUrl.trim() || null, content, rating: Number(rating), isPublished };
    try {
      const res = editingTestimonial ? await updateTestimonial(editingTestimonial.id, data) : await createTestimonial(data);
      if (res.success) { setDrawerOpen(false); fetchTestimonials(); }
      else alert(res.error || "Gagal menyimpan.");
    } catch { alert("Kesalahan jaringan."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus testimoni ini?")) {
      const res = await deleteTestimonial(id);
      if (res.success) fetchTestimonials();
      else alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#AAA] mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-[#111] tracking-tight">Testimonials</h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Tambah Ulasan
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="py-16 text-center text-[#CCC] text-sm border border-dashed border-[#E0E0E0] bg-white">
          Tidak ada testimoni. Buat baru atau seed data dari Dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`bg-white border border-[#E8E8E8] p-5 hover:border-[#CCC] transition-colors relative ${!t.isPublished ? "opacity-60" : ""}`}
            >
              {!t.isPublished && (
                <span className="absolute top-4 right-4 text-[10px] tracking-[0.12em] uppercase bg-[#F0F0F0] text-[#888] px-2 py-0.5">Draft</span>
              )}

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-[#E0E0E0] fill-[#E0E0E0]"} />
                ))}
              </div>

              {/* Content */}
              <p className="text-[13px] text-[#444] leading-relaxed mb-4 italic">"{t.content}"</p>

              {/* Client + Actions */}
              <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {t.avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.avatarUrl} alt={t.clientName} className="w-8 h-8 rounded-full object-cover border border-[#E8E8E8]" />
                  )}
                  <div>
                    <p className="text-[13px] font-medium text-[#111]">{t.clientName}</p>
                    <p className="text-[10px] text-[#AAA]">{t.clientRole} · {t.company}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => handleOpenEdit(t)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                    <Edit2 size={12} strokeWidth={1.8} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 border border-[#E0E0E0] hover:border-red-300 text-[#888] hover:text-red-500 transition-colors">
                    <Trash2 size={12} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex justify-end" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-lg h-full bg-white border-l border-[#E0E0E0] flex flex-col overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div>
                <h3 className="text-[15px] font-semibold text-[#111]">
                  {editingTestimonial ? "Edit Testimoni" : "Tambah Testimoni"}
                </h3>
                <p className="text-[11px] text-[#AAA] mt-0.5">
                  {editingTestimonial ? `ID: ${editingTestimonial.id}` : "Ulasan baru"}
                </p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 px-6 py-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Nama Klien</label>
                <input required value={clientName} onChange={(e) => setClientName(e.target.value)} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="Budi Santoso" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Jabatan</label>
                  <input required value={clientRole} onChange={(e) => setClientRole(e.target.value)} type="text"
                    className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                    placeholder="CEO / PM" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Perusahaan</label>
                  <input required value={company} onChange={(e) => setCompany(e.target.value)} type="text"
                    className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                    placeholder="Perusahaan" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Avatar URL</label>
                <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} type="url"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[12px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Ulasan / Feedback</label>
                <textarea required rows={4} value={content} onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors resize-none"
                  placeholder="Tuliskan ulasan klien..." />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Rating (1–5)</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors">
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★ (4/5)</option>
                  <option value={3}>★★★ (3/5)</option>
                  <option value={2}>★★ (2/5)</option>
                  <option value={1}>★ (1/5)</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-[#F7F7F7] border border-[#E0E0E0] hover:border-[#999] transition-colors w-fit">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-[#111]" />
                <span className="text-[12px] text-[#444]">Publish di Halaman Utama</span>
              </label>
            </form>

            <div className="px-6 py-4 border-t border-[#F0F0F0] flex justify-end gap-2">
              <button type="button" onClick={() => setDrawerOpen(false)}
                className="px-4 py-2.5 border border-[#E0E0E0] hover:border-[#999] text-[#666] text-[12px] transition-colors">
                Batal
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] flex items-center gap-1.5 transition-colors">
                {saving && <Loader2 size={12} className="animate-spin" />}
                {saving ? "Menyimpan..." : "Simpan Ulasan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
