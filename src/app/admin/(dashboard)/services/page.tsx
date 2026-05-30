"use client";

import React, { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "@/actions/services";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Star,
} from "lucide-react";

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: any;
  priceFrom: string | null;
  isFeatured: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Globe");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getServices();
      if (res.success && res.services) setServices(res.services as Service[]);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingService) setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setTitle(""); setSlug(""); setDescription(""); setIcon("Globe");
    setFeatures([]); setFeatureInput(""); setPriceFrom(""); setIsFeatured(false);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setTitle(s.title); setSlug(s.slug); setDescription(s.description); setIcon(s.icon);
    let featList: string[] = [];
    if (Array.isArray(s.features)) featList = s.features;
    else if (typeof s.features === "string") { try { featList = JSON.parse(s.features); } catch {} }
    setFeatures(featList); setFeatureInput("");
    setPriceFrom(s.priceFrom || ""); setIsFeatured(s.isFeatured);
    setDrawerOpen(true);
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    const val = featureInput.trim();
    if (val && !features.includes(val)) setFeatures([...features, val]);
    setFeatureInput("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { slug, title, description, icon, features, priceFrom: priceFrom.trim() || null, isFeatured };
    try {
      const res = editingService ? await updateService(editingService.id, data) : await createService(data);
      if (res.success) { setDrawerOpen(false); fetchServices(); }
      else alert(res.error || "Gagal menyimpan.");
    } catch { alert("Kesalahan jaringan."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus layanan ini?")) {
      const res = await deleteService(id);
      if (res.success) fetchServices();
      else alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#AAA] mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-[#111] tracking-tight">Services</h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Tambah Layanan
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat...
        </div>
      ) : services.length === 0 ? (
        <div className="py-16 text-center text-[#CCC] text-sm border border-dashed border-[#E0E0E0] bg-white">
          Tidak ada layanan. Buat layanan baru atau seed data dari Dashboard.
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E8] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-16 text-center">Ikon</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium">Layanan</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-40">Harga Mulai</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-56">Fitur Unggulan</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-24 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F4]">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block text-[11px] bg-[#F0F0F0] text-[#666] px-2 py-1">{service.icon}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-medium text-[#111] flex items-center gap-1.5">
                      {service.title}
                      {service.isFeatured && <Star size={12} className="fill-amber-400 text-amber-400" />}
                    </div>
                    <span className="text-[11px] text-[#BBB]">/{service.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[#555]">{service.priceFrom || "Hubungi Kami"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(service.features) && service.features.slice(0, 3).map((feat: string, i: number) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#F4F4F4] text-[#666] border border-[#EEE]">{feat}</span>
                      ))}
                      {Array.isArray(service.features) && service.features.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#F4F4F4] text-[#AAA] border border-[#EEE]">+{service.features.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => handleOpenEdit(service)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                        <Edit2 size={13} strokeWidth={1.8} />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-1.5 border border-[#E0E0E0] hover:border-red-300 text-[#888] hover:text-red-500 transition-colors">
                        <Trash2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex justify-end" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-lg h-full bg-white border-l border-[#E0E0E0] flex flex-col overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div>
                <h3 className="text-[15px] font-semibold text-[#111]">
                  {editingService ? "Edit Layanan" : "Tambah Layanan"}
                </h3>
                <p className="text-[11px] text-[#AAA] mt-0.5">
                  {editingService ? `ID: ${editingService.id}` : "Layanan baru"}
                </p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 px-6 py-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Nama Layanan</label>
                <input required value={title} onChange={handleTitleChange} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="Web App Development" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Slug</label>
                <input required value={slug} onChange={(e) => setSlug(e.target.value)} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="web-app-development" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Deskripsi</label>
                <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors resize-none"
                  placeholder="Deskripsi singkat layanan..." />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Ikon (Lucide)</label>
                <select value={icon} onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors">
                  <option value="Globe">Globe (Web)</option>
                  <option value="Smartphone">Smartphone (Mobile)</option>
                  <option value="Cpu">Cpu (ML/AI)</option>
                  <option value="Code">Code (Software)</option>
                  <option value="Search">Search (Analyst)</option>
                  <option value="PenTool">PenTool (Design)</option>
                </select>
              </div>
              {/* Features */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Fitur Layanan</label>
                <div className="flex gap-2">
                  <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} type="text"
                    className="flex-1 px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                    placeholder="Tambah fitur..." />
                  <button type="button" onClick={handleAddFeature}
                    className="px-4 bg-[#111] hover:bg-[#333] text-white text-[12px] transition-colors">
                    Tambah
                  </button>
                </div>
                <ul className="space-y-1.5 mt-2">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-center justify-between px-3 py-2 bg-[#F7F7F7] border border-[#E0E0E0] text-[12px]">
                      <span className="text-[#444]">{feat}</span>
                      <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-[#BBB] hover:text-red-500 text-[11px] transition-colors">Hapus</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Harga Mulai (Opsional)</label>
                <input value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="Rp 5.000.000" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-[#F7F7F7] border border-[#E0E0E0] hover:border-[#999] transition-colors w-fit">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-[#111]" />
                <span className="text-[12px] text-[#444] flex items-center gap-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> Layanan Unggulan
                </span>
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
                {saving ? "Menyimpan..." : "Simpan Layanan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
