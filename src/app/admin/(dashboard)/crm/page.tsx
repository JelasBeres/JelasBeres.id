"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  getMessages,
  createContact,
  updateContact,
  updateMessageStatus,
  deleteMessage,
} from "@/actions/messages";
import {
  Plus,
  Mail,
  Building2,
  Calendar,
  Trash2,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Columns,
  List,
  Search,
  Edit2,
  GripVertical,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  serviceType: string;
  message: string;
  status: string;
  createdAt: Date;
}

const STAGES = [
  { id: "pending",     label: "New Leads",     dot: "#F59E0B" },
  { id: "contacted",   label: "Contacted",     dot: "#3B82F6" },
  { id: "proposal",    label: "Proposal Sent", dot: "#8B5CF6" },
  { id: "negotiation", label: "Negotiation",   dot: "#EAB308" },
  { id: "active",      label: "Active",        dot: "#10B981" },
  { id: "completed",   label: "Completed",     dot: "#6B7280" },
  { id: "lost",        label: "Lost Deal",     dot: "#EF4444" },
];

function StageDot({ status }: { status: string }) {
  const stage = STAGES.find((s) => s.id === status);
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: stage?.dot ?? "#CCC" }}
    />
  );
}

export default function AdminCRMPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [activeTab, setActiveTab] = useState<"kanban" | "inbox">("kanban");

  // Drag state
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const dragContactRef = useRef<Contact | null>(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState("Web Development");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getMessages();
      if (res.success && res.messages) {
        setContacts(
          (res.messages as any[]).map((m) => ({ ...m, createdAt: new Date(m.createdAt) }))
        );
      }
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchContacts(); }, []);

  // ===== DRAG & DROP HANDLERS =====
  const handleDragStart = (e: React.DragEvent, contact: Contact) => {
    dragContactRef.current = contact;
    setDraggingId(contact.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(contact.id));
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverStage(null);
    dragContactRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStage(stageId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if leaving the column entirely (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverStage(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStage(null);
    setDraggingId(null);

    const contact = dragContactRef.current;
    dragContactRef.current = null;

    if (!contact || contact.status === targetStageId) return;

    // Optimistic update
    setContacts((prev) =>
      prev.map((c) => c.id === contact.id ? { ...c, status: targetStageId } : c)
    );
    if (selectedContact?.id === contact.id) {
      setSelectedContact((prev) => prev ? { ...prev, status: targetStageId } : null);
    }

    try {
      await updateMessageStatus(contact.id, targetStageId);
    } catch {
      // Revert on error
      setContacts((prev) =>
        prev.map((c) => c.id === contact.id ? { ...c, status: contact.status } : c)
      );
      alert("Gagal memindahkan prospek.");
    }
  };

  // ===== CRUD HANDLERS =====
  const handleOpenAdd = () => {
    setSelectedContact(null); setIsEditing(true);
    setName(""); setEmail(""); setCompany(""); setServiceType("Web Development");
    setStatus("pending"); setMessage("");
    setDrawerOpen(true);
  };

  const handleOpenDetail = (c: Contact) => {
    setSelectedContact(c); setIsEditing(false);
    setName(c.name); setEmail(c.email); setCompany(c.company || "");
    setServiceType(c.serviceType); setStatus(c.status); setMessage(c.message);
    setDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { name, email, company: company.trim() || null, serviceType, status, message };
    try {
      const res = selectedContact
        ? await updateContact(selectedContact.id, data)
        : await createContact(data);
      if (res.success && res.contact) {
        const saved = { ...res.contact, createdAt: new Date(res.contact.createdAt) } as Contact;
        await fetchContacts();
        if (selectedContact) { setSelectedContact(saved); setIsEditing(false); }
        else setDrawerOpen(false);
      } else {
        alert(res.error || "Gagal menyimpan.");
      }
    } catch { alert("Kesalahan jaringan."); }
    finally { setSaving(false); }
  };

  const handleMoveStage = async (id: number, direction: "prev" | "next") => {
    const contact = contacts.find((c) => c.id === id);
    if (!contact) return;
    const currentIndex = STAGES.findIndex((s) => s.id === contact.status);
    let nextIndex = currentIndex;
    if (direction === "prev" && currentIndex > 0) nextIndex = currentIndex - 1;
    else if (direction === "next" && currentIndex < STAGES.length - 1) nextIndex = currentIndex + 1;
    if (nextIndex === currentIndex) return;
    const nextStatus = STAGES[nextIndex].id;
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status: nextStatus } : c));
    if (selectedContact?.id === id) {
      setSelectedContact((prev) => prev ? { ...prev, status: nextStatus } : null);
      setStatus(nextStatus);
    }
    try {
      await updateMessageStatus(id, nextStatus);
    } catch { alert("Gagal memindahkan tahapan."); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus kontak ini?")) {
      const res = await deleteMessage(id);
      if (res.success) { setContacts(contacts.filter((c) => c.id !== id)); setDrawerOpen(false); setSelectedContact(null); }
      else alert("Gagal menghapus.");
    }
  };

  const filtered = contacts.filter((c) => {
    const matchSearch = [c.name, c.email, c.message, c.company || ""]
      .some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchService = filterService === "all" || c.serviceType === filterService;
    return matchSearch && matchService;
  });

  const getStageLabel = (id: string) => STAGES.find((s) => s.id === id)?.label ?? id;

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-1">Manajemen</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">CRM & Client Leads</h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] hover:bg-[#333] text-white text-[12px] tracking-[0.08em] transition-colors"
        >
          <Plus size={14} />
          Tambah Lead
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Cari prospek..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border text-foreground text-[13px] placeholder:text-muted focus:outline-none focus:border-border transition-colors"
            />
          </div>
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-3 py-2 bg-surface border border-border text-muted text-[12px] focus:outline-none focus:border-border transition-colors"
          >
            <option value="all">Semua Layanan</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Architect">Architect</option>
          </select>
        </div>

        {/* Tab switcher */}
        <div className="flex border border-border bg-surface self-start">
          {([["kanban", "Kanban", Columns], ["inbox", "Inbox", List]] as const).map(([tab, label, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] transition-colors ${
                activeTab === tab ? "bg-[#111] text-white" : "text-muted hover:bg-surface-hover"
              }`}
            >
              <Icon size={13} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 justify-center py-16 text-[#BBB] text-sm">
          <Loader2 size={15} className="animate-spin" /> Memuat data CRM...
        </div>
      ) : activeTab === "kanban" ? (
        /* ===== KANBAN BOARD WITH DRAG & DROP ===== */
        <>
          <p className="text-[11px] text-[#BBB] flex items-center gap-1.5">
            <GripVertical size={12} />
            Drag kartu ke kolom lain untuk memindahkan tahapan pipeline.
          </p>
          <div className="flex gap-3 overflow-x-auto pb-6 select-none min-h-[520px]">
            {STAGES.map((stage) => {
              const cards = filtered.filter((c) => c.status === stage.id);
              const isDragTarget = dragOverStage === stage.id;

              return (
                <div
                  key={stage.id}
                  onDragOver={(e) => handleDragOver(e, stage.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, stage.id)}
                  className={`w-72 shrink-0 flex flex-col h-[560px] overflow-hidden transition-all duration-150 ${
                    isDragTarget
                      ? "bg-surface-hover border-2 border-dashed"
                      : "bg-background border border-border"
                  }`}
                  style={{
                    borderColor: isDragTarget ? stage.dot : undefined,
                  }}
                >
                  {/* Column Header */}
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.dot }} />
                      <span className="text-[12px] font-medium text-foreground">{stage.label}</span>
                    </div>
                    <span className="text-[11px] text-muted bg-surface border border-border px-1.5 py-0.5 rounded-sm">
                      {cards.length}
                    </span>
                  </div>

                  {/* Drop zone hint when dragging over an empty column */}
                  {isDragTarget && cards.length === 0 && (
                    <div
                      className="mx-2.5 mt-2.5 py-6 text-center text-[11px] rounded-sm border-2 border-dashed transition-colors"
                      style={{ color: stage.dot, borderColor: stage.dot + "55" }}
                    >
                      Lepas di sini
                    </div>
                  )}

                  {/* Cards Container */}
                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
                    {cards.length === 0 && !isDragTarget ? (
                      <div className="py-8 text-center text-[11px] text-[#DDD] border border-dashed border-border bg-surface mt-1">
                        Kosong
                      </div>
                    ) : (
                      cards.map((contact) => {
                        const isDragging = draggingId === contact.id;
                        return (
                          <div
                            key={contact.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, contact)}
                            onDragEnd={handleDragEnd}
                            onClick={() => !isDragging && handleOpenDetail(contact)}
                            className={`bg-surface border p-3.5 cursor-grab active:cursor-grabbing transition-all group ${
                              isDragging
                                ? "opacity-40 border-[#DDD] scale-95"
                                : "border-border hover:border-border hover:shadow-sm"
                            }`}
                          >
                            {/* Drag handle hint */}
                            <div className="flex items-start justify-between mb-0.5">
                              <h4 className="text-[13px] font-medium text-foreground leading-snug">{contact.name}</h4>
                              <GripVertical
                                size={13}
                                className="text-[#DDD] group-hover:text-[#BBB] transition-colors flex-shrink-0 mt-0.5 -mr-0.5"
                                strokeWidth={1.8}
                              />
                            </div>

                            {contact.company && (
                              <p className="text-[11px] text-muted mb-2">{contact.company}</p>
                            )}

                            <div className="flex items-center justify-between gap-2 mt-2">
                              <span className="text-[10px] bg-surface-hover text-muted px-1.5 py-0.5 rounded-sm leading-relaxed">
                                {contact.serviceType.replace(" Development", "").replace(" App", "")}
                              </span>
                              <span className="text-[10px] text-muted">
                                {contact.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}

                    {/* Drop zone at bottom when has cards and dragging over */}
                    {isDragTarget && cards.length > 0 && (
                      <div
                        className="h-14 rounded-sm border-2 border-dashed flex items-center justify-center text-[11px] transition-colors"
                        style={{ color: stage.dot, borderColor: stage.dot + "55", background: stage.dot + "08" }}
                      >
                        Lepas di sini
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* ===== INBOX VIEW (SPLIT-PANE) ===== */
        <div className="grid grid-cols-1 lg:grid-cols-5 border border-border bg-surface h-[580px] overflow-hidden">
          {/* Left: List */}
          <div className="lg:col-span-2 border-r border-[#F0F0F0] flex flex-col h-full overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-muted text-sm">Tidak ada data.</div>
            ) : (
              <div className="divide-y divide-[#F7F7F7]">
                {filtered.map((c) => {
                  const isSelected = selectedContact?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleOpenDetail(c)}
                      className={`w-full px-4 py-3.5 text-left transition-colors flex flex-col gap-1.5 ${
                        isSelected ? "bg-background border-l-2 border-[#111]" : "hover:bg-surface-hover"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <StageDot status={c.status} />
                          <span className="text-[13px] font-medium text-foreground truncate">{c.name}</span>
                        </div>
                        <span className="text-[10px] text-muted flex-shrink-0">
                          {c.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 pl-4 flex-wrap">
                        <span className="text-[10px] bg-surface-hover text-muted px-1.5 py-0.5 rounded-sm">{c.serviceType}</span>
                        <span className="text-[10px] text-muted">{getStageLabel(c.status)}</span>
                      </div>
                      <p className="text-[11px] text-muted line-clamp-1 pl-4">{c.message}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-3 h-full flex flex-col overflow-y-auto p-6">
            {selectedContact ? (
              <div className="flex flex-col h-full gap-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#F0F0F0]">
                  <div>
                    <h2 className="text-[17px] font-semibold text-foreground">{selectedContact.name}</h2>
                    <a href={`mailto:${selectedContact.email}`} className="text-[12px] text-muted hover:text-foreground transition-colors">
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border hover:border-border text-muted hover:text-foreground text-[12px] transition-colors">
                      <Edit2 size={12} strokeWidth={1.8} /> Edit
                    </button>
                    <button onClick={() => handleDelete(selectedContact.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border hover:border-red-300 text-muted hover:text-red-500 text-[12px] transition-colors">
                      <Trash2 size={12} strokeWidth={1.8} /> Hapus
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 text-[12px]">
                  {selectedContact.company && (
                    <div className="flex items-center gap-2 text-muted">
                      <Building2 size={13} className="text-muted" strokeWidth={1.8} />
                      {selectedContact.company}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted">
                    <StageDot status={selectedContact.status} />
                    {getStageLabel(selectedContact.status)}
                  </div>
                  <div className="flex items-center gap-2 text-muted col-span-2">
                    <Calendar size={12} className="text-muted" strokeWidth={1.8} />
                    {selectedContact.createdAt.toLocaleString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="text-muted">
                    <span className="text-muted">Layanan: </span>{selectedContact.serviceType}
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted mb-2">Pesan / Catatan</p>
                  <div className="p-4 bg-background border border-[#EEEEEE] text-[13px] text-[#444] leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>

                {/* Stage navigation */}
                <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-[12px] text-muted">Ubah tahapan pipeline:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleMoveStage(selectedContact.id, "prev")}
                      disabled={selectedContact.status === STAGES[0].id}
                      className="flex items-center gap-1 px-3 py-1.5 border border-border hover:border-border text-muted text-[12px] disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={12} /> Mundur
                    </button>
                    <button
                      onClick={() => handleMoveStage(selectedContact.id, "next")}
                      disabled={selectedContact.status === STAGES[STAGES.length - 1].id}
                      className="flex items-center gap-1 px-3 py-1.5 border border-border hover:border-border text-muted text-[12px] disabled:opacity-30 transition-colors"
                    >
                      Maju <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted gap-2">
                <Mail size={24} strokeWidth={1} />
                <span className="text-[12px]">Pilih prospek dari daftar untuk melihat detail.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== DRAWER ===== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex justify-end" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-lg h-full bg-surface border-l border-border flex flex-col overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">
                  {isEditing
                    ? selectedContact ? "Edit Kontak" : "Tambah Lead"
                    : "Detail Prospek"}
                </h3>
                <p className="text-[11px] text-muted mt-0.5">
                  {selectedContact ? `ID: ${selectedContact.id}` : "Lead baru"}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {!isEditing && selectedContact && (
                  <button onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 border border-border hover:border-border text-muted text-[12px] transition-colors">
                    Edit
                  </button>
                )}
                <button onClick={() => setDrawerOpen(false)} className="p-1.5 border border-border hover:border-border text-muted hover:text-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {isEditing ? (
              <>
                <form onSubmit={handleSave} className="flex-1 px-6 py-5 space-y-4 text-[13px]">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Nama Lengkap</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} type="text"
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors"
                      placeholder="Budi Santoso" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Email</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors"
                      placeholder="budi@perusahaan.id" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Perusahaan (Opsional)</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} type="text"
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors"
                      placeholder="Nama perusahaan" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Layanan</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors">
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Machine Learning">Machine Learning / AI</option>
                      <option value="Architect">Architect</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Pipeline Stage</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors">
                      {STAGES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted mb-1.5">Pesan / Catatan CRM</label>
                    <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-[13px] focus:outline-none focus:border-border transition-colors resize-none"
                      placeholder="Detail pesan atau catatan internal..." />
                  </div>
                </form>
                <div className="px-6 py-4 border-t border-[#F0F0F0] flex justify-end gap-2">
                  <button type="button" onClick={() => setDrawerOpen(false)}
                    className="px-4 py-2.5 border border-border hover:border-border text-muted text-[12px] transition-colors">
                    Batal
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    className="px-5 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] flex items-center gap-1.5 transition-colors">
                    {saving && <Loader2 size={12} className="animate-spin" />}
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </>
            ) : (
              selectedContact && (
                <div className="flex-1 px-6 py-5 space-y-5 text-[13px]">
                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-background border border-[#EEEEEE]">
                    <div>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Nama</p>
                      <p className="text-foreground font-medium">{selectedContact.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Email</p>
                      <a href={`mailto:${selectedContact.email}`} className="text-muted hover:text-foreground transition-colors break-all">{selectedContact.email}</a>
                    </div>
                    {selectedContact.company && (
                      <div>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Perusahaan</p>
                        <p className="text-muted">{selectedContact.company}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Layanan</p>
                      <p className="text-muted">{selectedContact.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Status</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StageDot status={selectedContact.status} />
                        <span className="text-muted">{getStageLabel(selectedContact.status)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-0.5">Tanggal</p>
                      <p className="text-muted text-[12px]">
                        {selectedContact.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted mb-2">Pesan / Catatan</p>
                    <div className="p-4 bg-background border border-[#EEEEEE] text-[13px] text-[#444] leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </div>
                  </div>

                  {/* Stage move */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[12px] text-muted">Pindah tahapan:</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleMoveStage(selectedContact.id, "prev")} disabled={selectedContact.status === STAGES[0].id}
                        className="flex items-center gap-1 px-3 py-1.5 border border-border hover:border-border text-muted text-[12px] disabled:opacity-30 transition-colors">
                        <ChevronLeft size={12} /> Mundur
                      </button>
                      <button onClick={() => handleMoveStage(selectedContact.id, "next")} disabled={selectedContact.status === STAGES[STAGES.length - 1].id}
                        className="flex items-center gap-1 px-3 py-1.5 border border-border hover:border-border text-muted text-[12px] disabled:opacity-30 transition-colors">
                        Maju <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="pt-6 border-t border-[#F0F0F0]">
                    <button onClick={() => handleDelete(selectedContact.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#FFCCCC] hover:border-red-400 bg-[#FFF5F5] hover:bg-red-50 text-red-500 text-[12px] transition-colors">
                      <Trash2 size={13} strokeWidth={1.8} /> Hapus Kontak Ini
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
