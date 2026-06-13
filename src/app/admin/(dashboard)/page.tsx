"use client";

import React, { useEffect, useState } from "react";
import { getDashboardStats, seedSampleData } from "@/actions/admin";
import {
  Briefcase,
  Layers,
  MessageSquare,
  Inbox,
  Database,
  RefreshCw,
  ArrowUpRight,
  Terminal,
  Tag,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  projectCount: number;
  contactCount: number;
  testimonialCount: number;
  serviceCount: number;
  pricingCount: number;
  pendingContacts: number;
}

interface RecentContact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  serviceType: string;
  message: string;
  status: string;
  createdAt: Date;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  contacted: "bg-blue-50 text-blue-600 border-blue-200",
  active: "bg-green-50 text-green-600 border-green-200",
  completed: "bg-gray-50 text-gray-500 border-gray-200",
};

const statCards = (stats: DashboardStats | null) => [
  {
    label: "Pesan Masuk",
    value: stats?.contactCount ?? 0,
    icon: Inbox,
    badge: stats?.pendingContacts ? `${stats.pendingContacts} baru` : null,
    href: "/admin/crm",
  },
  {
    label: "Portofolio",
    value: stats?.projectCount ?? 0,
    icon: Briefcase,
    href: "/admin/projects",
  },
  {
    label: "Testimoni",
    value: stats?.testimonialCount ?? 0,
    icon: MessageSquare,
    href: "/admin/testimonials",
  },
  {
    label: "Layanan",
    value: stats?.serviceCount ?? 0,
    icon: Layers,
    href: "/admin/services",
  },
  {
    label: "Pricing Plans",
    value: stats?.pricingCount ?? 0,
    icon: Tag,
    href: "/admin/pricing",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [dbStatus, setDbStatus] = useState<"connecting" | "online" | "error">("connecting");
  const [currentDate, setCurrentDate] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getDashboardStats();
      if (res.success && res.stats) {
        setStats(res.stats);
        const formatted = (res.recentContacts || []).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }));
        setRecentContacts(formatted);
        setDbStatus("online");
      } else {
        setDbStatus("error");
      }
    } catch {
      setDbStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    setCurrentDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleSeed = async () => {
    if (confirm("Seeding akan mereset semua data ke sampel default. Lanjutkan?")) {
      setSeeding(true);
      try {
        const res = await seedSampleData();
        if (res.success) {
          alert("Database berhasil diisi dengan data sampel!");
          fetchStats();
        } else {
          alert("Gagal: " + res.error);
        }
      } catch {
        alert("Gagal terhubung ke server.");
      } finally {
        setSeeding(false);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-1">{currentDate}</p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2 text-[12px]">
          <Database
            size={13}
            className={dbStatus === "online" ? "text-emerald-500" : "text-red-400"}
            strokeWidth={2}
          />
          <span className="text-muted">
            Database:{" "}
            <span
              className={
                dbStatus === "online"
                  ? "text-emerald-600"
                  : dbStatus === "error"
                  ? "text-red-500"
                  : "text-amber-500"
              }
            >
              {dbStatus === "connecting" ? "Connecting" : dbStatus === "online" ? "Online (Neon)" : "Error"}
            </span>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-20 justify-center text-muted text-sm">
          <RefreshCw size={15} className="animate-spin" />
          <span>Memuat data...</span>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards(stats).map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-surface border border-border p-5 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-surface-hover rounded-sm">
                      <Icon size={16} strokeWidth={1.8} className="text-[#444]" />
                    </div>
                    {card.badge && (
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-sm">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-semibold text-foreground leading-none mb-1">{card.value}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[12px] text-muted">{card.label}</span>
                    <Link
                      href={card.href}
                      className="text-[11px] text-muted hover:text-foreground flex items-center gap-0.5 transition-colors"
                    >
                      Kelola <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Messages */}
            <div className="lg:col-span-2 bg-surface border border-border">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
                <h3 className="text-[13px] font-medium text-foreground">Pesan Masuk Terbaru</h3>
                <Link href="/admin/crm" className="text-[11px] text-muted hover:text-foreground flex items-center gap-0.5 transition-colors">
                  Semua <ArrowUpRight size={11} />
                </Link>
              </div>

              {recentContacts.length === 0 ? (
                <div className="py-12 text-center text-[#BBB] text-sm">Belum ada pesan masuk.</div>
              ) : (
                <div className="divide-y divide-[#F4F4F4]">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-hover transition-colors">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-medium text-foreground">{contact.name}</span>
                          {contact.company && (
                            <span className="text-[11px] text-muted">· {contact.company}</span>
                          )}
                          <span className="text-[10px] bg-surface-hover text-muted px-1.5 py-0.5 rounded-sm">{contact.serviceType}</span>
                        </div>
                        <p className="text-[11px] text-muted mt-0.5 truncate max-w-md">{contact.message}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.5 border rounded-sm ${STATUS_STYLES[contact.status] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
                          {contact.status}
                        </span>
                        <span className="text-[10px] text-muted">
                          {contact.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Actions */}
            <div className="bg-surface border border-border p-5 h-fit">
              <h3 className="text-[13px] font-medium text-foreground mb-1">Operasi Database</h3>
              <p className="text-[12px] text-muted leading-relaxed mb-5">
                Reset seluruh konten portofolio, testimoni, dan layanan ke data sampel default.
              </p>
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.08em] transition-colors"
              >
                <Terminal size={13} className={seeding ? "animate-spin" : ""} />
                {seeding ? "Seeding..." : "Seed Sample Data"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
