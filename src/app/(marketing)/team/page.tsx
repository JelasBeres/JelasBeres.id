import React from "react";
import Link from "next/link";
import { getPublicTeamMembers } from "@/actions/team";
import { Users, Mail } from "lucide-react";

export const metadata = {
  title: "Our Team | JelasBeres.id",
  description: "Wajah-wajah profesional di balik JelasBeres.id yang siap merealisasikan proyek digital & fisik Anda.",
};

export default async function TeamPage() {
  const teamMembers = await getPublicTeamMembers();

  return (
    <div className="bg-background text-foreground pt-14 md:pt-16 pb-10 min-h-screen selection:bg-green selection:text-white">
      {/* Hero Section */}
      <section className="relative py-4 md:py-6 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-surface-hover border border-border rounded-sm mb-2.5">
            <Users size={12} className="text-green" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground font-medium">Creative Minds</span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground uppercase">
            Wajah di Balik <span className="normal-case">JelasBeres<span className="text-green">.id</span></span>
          </h1>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="max-w-4xl mx-auto px-6 py-4">
        {teamMembers.length === 0 ? (
          <div className="py-12 text-center text-muted text-sm border border-dashed border-border bg-surface">
            Halaman sedang diperbarui. Silakan kembali beberapa saat lagi.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 md:gap-x-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="group border border-border hover:border-green bg-surface hover:bg-surface-hover transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Photo frame */}
                <div className="relative w-full aspect-square overflow-hidden border-b border-border bg-background">
                  {member.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted bg-surface-hover">
                      <Users size={24} className="stroke-[1.2]" />
                    </div>
                  )}
                </div>

                <div className="p-3 w-full">
                  <h3 className="font-display text-xs md:text-sm font-bold text-foreground group-hover:text-green transition-colors duration-300 truncate">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[9px] tracking-wider text-muted uppercase mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center py-10">
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-foreground tracking-tight">
          Ingin Berkolaborasi dengan Tim Kami?
        </h2>
        <p className="font-sans text-muted mb-6 leading-relaxed max-w-xl mx-auto text-xs md:text-sm">
          Mulai dari konsep desain arsitektur hingga infrastruktur cloud skala besar, tim kami siap memberikan hasil yang terjamin beres.
        </p>
        <Link 
          href="/#contact"
          className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-[10px] font-semibold px-6 py-3 uppercase tracking-widest hover:bg-green hover:text-white transition-all active:scale-95 border border-transparent"
        >
          <Mail size={10} />
          Mulai Proyek Sekarang
        </Link>
      </section>
    </div>
  );
}
