"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/actions/admin";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  MessageSquare,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "CRM & Inbox", href: "/admin/crm", icon: Inbox },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm("Yakin ingin keluar?")) {
      await logoutAdmin();
      window.location.href = "/admin/login";
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Brand */}
      <div className="px-6 pt-8 pb-6 border-b border-[#EBEBEB]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#AAA] mb-0.5">Admin Panel</p>
        <h2 className="text-[15px] font-semibold text-[#111] tracking-tight">JelasBeres.id</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-[13px] transition-all rounded-sm ${
                isActive
                  ? "bg-[#111] text-white"
                  : "text-[#555] hover:text-[#111] hover:bg-[#F4F4F4]"
              }`}
            >
              <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={isActive ? "font-medium" : "font-normal"}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#EBEBEB] space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#888] hover:text-[#111] hover:bg-[#F4F4F4] transition-colors rounded-sm"
        >
          <ExternalLink size={13} strokeWidth={1.8} />
          <span>Lihat Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#888] hover:text-red-500 hover:bg-red-50 transition-colors text-left rounded-sm"
        >
          <LogOut size={13} strokeWidth={1.8} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-[#E0E0E0] text-[#333] md:hidden shadow-sm"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-56 bg-white border-r border-[#EBEBEB] flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-56 bg-white border-r border-[#EBEBEB] flex flex-col z-50">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
