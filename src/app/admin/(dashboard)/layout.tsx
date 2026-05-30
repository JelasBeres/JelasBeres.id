import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div
      className="min-h-screen bg-[#F7F7F7]"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <Sidebar />
      <main className="md:ml-56 min-h-screen p-8 md:p-10">
        {children}
      </main>
    </div>
  );
}
