"use client";

import React, { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/actions/projects";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Code,
  Globe,
  Loader2,
  Star,
  Upload,
  Image as ImageIcon
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  techStack: any;
  thumbnailUrl: string;
  liveUrl: string | null;
  repoUrl: string | null;
  category: string;
  featured: boolean;
  orderIndex: number;
}

const CATEGORIES = ["all", "web", "mobile", "ml", "architect"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [category, setCategory] = useState("web");
  const [featured, setFeatured] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      if (res.success && res.projects) setProjects(res.projects as Project[]);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingProject) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setTitle(""); setSlug(""); setDescription(""); setTechStack([]); setTechStackInput("");
    setThumbnailUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600");
    setLiveUrl(""); setRepoUrl(""); setCategory("web"); setFeatured(false); setOrderIndex(0);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title); setSlug(p.slug); setDescription(p.description);
    let stack: string[] = [];
    if (Array.isArray(p.techStack)) stack = p.techStack;
    else if (typeof p.techStack === "string") { try { stack = JSON.parse(p.techStack); } catch {} }
    setTechStack(stack); setTechStackInput("");
    setThumbnailUrl(p.thumbnailUrl); setLiveUrl(p.liveUrl || ""); setRepoUrl(p.repoUrl || "");
    setCategory(p.category); setFeatured(p.featured); setOrderIndex(p.orderIndex);
    setDrawerOpen(true);
  };

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = techStackInput.trim().replace(/,$/, "");
      if (val && !techStack.includes(val)) setTechStack([...techStack, val]);
      setTechStackInput("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setThumbnailUrl(data.url);
      } else {
        alert(data.error || "Gagal mengunggah gambar");
      }
    } catch (err) {
      alert("Kesalahan jaringan saat mengunggah gambar");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { title, slug, description, techStack, thumbnailUrl,
      liveUrl: liveUrl.trim() || null, repoUrl: repoUrl.trim() || null,
      category, featured, orderIndex: Number(orderIndex) };
    try {
      const res = editingProject ? await updateProject(editingProject.id, data) : await createProject(data);
      if (res.success) { setDrawerOpen(false); fetchProjects(); }
      else alert(res.error || "Gagal menyimpan.");
    } catch { alert("Kesalahan jaringan."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus project ini?")) {
      const res = await deleteProject(id);
      if (res.success) fetchProjects();
      else alert("Gagal menghapus.");
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#AAA] mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-[#111] tracking-tight">Portfolio Projects</h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Tambah Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBB]" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Cari project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E0E0E0] text-[#111] text-[13px] placeholder:text-[#CCC] focus:outline-none focus:border-[#999] transition-colors"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-2 text-[11px] tracking-[0.08em] border transition-colors ${
                filterCategory === cat
                  ? "bg-[#111] text-white border-[#111]"
                  : "bg-white text-[#666] border-[#E0E0E0] hover:border-[#999]"
              }`}
            >
              {cat === "all" ? "Semua" : cat === "ml" ? "ML / AI" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-[#CCC] text-sm border border-dashed border-[#E0E0E0] bg-white">
          Tidak ditemukan project.
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E8] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-10 text-center">#</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium">Project</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-28">Kategori</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-40">Tech Stack</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-24 text-center">Link</th>
                <th className="px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#AAA] font-medium w-24 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F4]">
              {filtered.map((project) => (
                <tr key={project.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3 text-center text-[12px] text-[#AAA]">{project.orderIndex}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {project.thumbnailUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.thumbnailUrl} alt={project.title} className="w-9 h-9 object-cover border border-[#EEE]" />
                      )}
                      <div>
                        <div className="text-[13px] font-medium text-[#111] flex items-center gap-1.5">
                          {project.title}
                          {project.featured && <Star size={12} className="fill-amber-400 text-amber-400" />}
                        </div>
                        <span className="text-[11px] text-[#BBB]">/{project.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] bg-[#F0F0F0] text-[#666] px-2 py-0.5 rounded-sm">{project.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(project.techStack) && project.techStack.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#F4F4F4] text-[#666] border border-[#EEE]">{tag}</span>
                      ))}
                      {Array.isArray(project.techStack) && project.techStack.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#F4F4F4] text-[#AAA] border border-[#EEE]">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex gap-2">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[#BBB] hover:text-[#111] transition-colors">
                          <Globe size={14} strokeWidth={1.8} />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-[#BBB] hover:text-[#111] transition-colors">
                          <Code size={14} strokeWidth={1.8} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => handleOpenEdit(project)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                        <Edit2 size={13} strokeWidth={1.8} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-1.5 border border-[#E0E0E0] hover:border-red-300 text-[#888] hover:text-red-500 transition-colors">
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
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg h-full bg-white border-l border-[#E0E0E0] flex flex-col overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div>
                <h3 className="text-[15px] font-semibold text-[#111]">
                  {editingProject ? "Edit Project" : "Tambah Project"}
                </h3>
                <p className="text-[11px] text-[#AAA] mt-0.5">
                  {editingProject ? `ID: ${editingProject.id}` : "Project baru"}
                </p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 border border-[#E0E0E0] hover:border-[#999] text-[#888] hover:text-[#111] transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 px-6 py-5 space-y-4 text-[13px]">
              {/* Title */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Judul Project</label>
                <input required value={title} onChange={handleTitleChange} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="Nama project" />
              </div>
              {/* Slug */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Slug</label>
                <input required value={slug} onChange={(e) => setSlug(e.target.value)} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="nama-project" />
              </div>
              {/* Description */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Deskripsi</label>
                <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors resize-none"
                  placeholder="Deskripsi project..." />
              </div>
              {/* Category */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors">
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="ml">Machine Learning / AI</option>
                  <option value="architect">Architect</option>
                </select>
              </div>
              {/* Tech Stack */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Tech Stack (Enter untuk tambah)</label>
                <input value={techStackInput} onChange={(e) => setTechStackInput(e.target.value)} onKeyDown={handleAddTech} type="text"
                  className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                  placeholder="Next.js, Tailwind..." />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {techStack.map((tech, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-[#F0F0F0] text-[#555] border border-[#E0E0E0]">
                      {tech}
                      <button type="button" onClick={() => setTechStack(techStack.filter((_, j) => j !== i))} className="hover:text-red-500">
                        <X size={9} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Thumbnail */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Thumbnail URL / Upload Gambar</label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input required value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} type="text"
                      className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[12px] focus:outline-none focus:border-[#999] transition-colors"
                      placeholder="/uploads/... atau https://..." />
                  </div>
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] hover:border-[#999] text-[#111] text-[12px] cursor-pointer transition-colors whitespace-nowrap">
                    {uploadingImage ? <Loader2 size={14} className="animate-spin text-[#888]" /> : <Upload size={14} className="text-[#888]" />}
                    {uploadingImage ? "Uploading..." : "Upload"}
                    <input type="file" accept="image/png, image/jpeg, image/webp, image/gif" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                </div>
                {thumbnailUrl && (
                  <div className="mt-2 p-2 border border-[#E0E0E0] bg-[#F7F7F7] inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbnailUrl} alt="Thumbnail preview" className="h-20 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                  </div>
                )}
              </div>
              {/* URLs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Live URL</label>
                  <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} type="url"
                    className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                    placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Repo URL</label>
                  <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} type="url"
                    className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors"
                    placeholder="https://github.com/..." />
                </div>
              </div>
              {/* Featured + Order */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-[#F7F7F7] border border-[#E0E0E0] hover:border-[#999] transition-colors">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-[#111]" />
                  <span className="text-[12px] text-[#444] flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" /> Featured
                  </span>
                </label>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] mb-1.5">Order Index</label>
                  <input type="number" min={0} value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F7F7F7] border border-[#E0E0E0] text-[#111] text-[13px] focus:outline-none focus:border-[#999] transition-colors" />
                </div>
              </div>
            </form>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-[#F0F0F0] flex justify-end gap-2">
              <button type="button" onClick={() => setDrawerOpen(false)}
                className="px-4 py-2.5 border border-[#E0E0E0] hover:border-[#999] text-[#666] text-[12px] transition-colors">
                Batal
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] flex items-center gap-1.5 transition-colors">
                {saving && <Loader2 size={12} className="animate-spin" />}
                {saving ? "Menyimpan..." : "Simpan Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
