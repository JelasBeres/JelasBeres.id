"use client";

import React, { useState } from "react";
import { loginAdmin } from "@/actions/admin";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        window.location.href = "/admin";
      } else {
        setError(res.error || "Email atau password salah.");
        setLoading(false);
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="w-full max-w-[360px]">
        {/* Wordmark */}
        <div className="mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-1">Admin Panel</p>
          <h1 className="text-[22px] font-semibold text-foreground tracking-tight">JelasBeres.id</h1>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="nama@jelasberes.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-[#111] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-[#111] transition-colors"
              />
            </div>

            {error && (
              <div className="text-[12px] text-red-500 py-2 px-3 bg-red-50 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#111] hover:bg-[#333] disabled:bg-[#999] text-white text-[12px] tracking-[0.12em] uppercase font-medium transition-colors"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.15em] uppercase text-[#BBB]">
          Secure Access · JelasBeres.id
        </p>
      </div>
    </div>
  );
}
