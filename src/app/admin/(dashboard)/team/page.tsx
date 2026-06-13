"use client";

import React, { useEffect, useState } from "react";
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "@/actions/team";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Upload,
  User
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
}

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await getTeamMembers();
      if (res.success && res.teamMembers) {
        setTeamMembers(res.teamMembers as TeamMember[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenCreate = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setPhotoUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150");
    setDrawerOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setPhotoUrl(member.photoUrl);
    setDrawerOpen(true);
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
        setPhotoUrl(data.url);
      } else {
        alert(data.error || "Gagal mengunggah foto");
      }
    } catch (err) {
      alert("Kesalahan jaringan saat mengunggah foto");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !photoUrl.trim()) {
      alert("Semua field wajib diisi.");
      return;
    }

    setSaving(true);
    const data = { name, role, photoUrl };
    try {
      const res = editingMember
        ? await updateTeamMember(editingMember.id, data)
        : await createTeamMember(data);
      if (res.success) {
        setDrawerOpen(false);
        fetchMembers();
      } else {
        alert(res.error || "Gagal menyimpan.");
      }
    } catch (err) {
      alert("Kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus anggota tim ini?")) {
      const res = await deleteTeamMember(id);
      if (res.success) {
        fetchMembers();
      } else {
        alert("Gagal menghapus.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Our Team</h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Tambah Anggota Tim
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat...
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="py-16 text-center text-muted text-sm border border-dashed border-border bg-surface">
          Belum ada anggota tim. Tambahkan anggota pertama Anda!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-surface border border-border p-5 hover:border-border transition-colors flex flex-col justify-between"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border border-border bg-surface-hover flex items-center justify-center text-muted">
                    <User size={30} />
                  </div>
                )}
                <div>
                  <h3 className="text-[14px] font-semibold text-foreground">{member.name}</h3>
                  <p className="text-[11px] text-muted mt-0.5">{member.role}</p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0F0F0] flex justify-center gap-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-border hover:border-border text-muted hover:text-foreground text-[11px] transition-colors"
                >
                  <Edit2 size={11} strokeWidth={1.8} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-3 py-1.5 border border-border hover:border-red-300 text-muted hover:text-red-500 transition-colors"
                  aria-label="Hapus"
                >
                  <Trash2 size={11} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer Form */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg h-full bg-surface border-l border-border flex flex-col overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">
                  {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
                </h3>
                <p className="text-[11px] text-muted mt-0.5">
                  {editingMember ? `ID: ${editingMember.id}` : "Anggota tim baru"}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 border border-border hover:border-border text-muted hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 px-6 py-5 space-y-4 text-[13px]">
              {/* Name */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Nama Lengkap</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Jabatan / Role</label>
                <input
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors"
                  placeholder="Lead Architect / Full-stack Developer"
                />
              </div>

              {/* Photo Upload / URL */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Foto URL / Upload Foto</label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      required
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      type="text"
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[12px] focus:outline-none focus:border-border transition-colors"
                      placeholder="/uploads/... atau https://..."
                    />
                  </div>
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-background border border-border hover:border-border text-foreground text-[12px] cursor-pointer transition-colors whitespace-nowrap">
                    {uploadingImage ? <Loader2 size={14} className="animate-spin text-muted" /> : <Upload size={14} className="text-muted" />}
                    {uploadingImage ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/gif"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {photoUrl && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative p-2 border border-border bg-background rounded-full overflow-hidden w-24 h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoUrl}
                        alt="Photo preview"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        onLoad={(e) => (e.currentTarget.style.display = "block")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>

            <div className="px-6 py-4 border-t border-[#F0F0F0] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-2.5 border border-border hover:border-border text-muted text-[12px] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImage}
                className="px-5 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] flex items-center gap-1.5 transition-colors"
              >
                {saving && <Loader2 size={12} className="animate-spin" />}
                {saving ? "Menyimpan..." : "Simpan Anggota"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
