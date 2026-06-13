"use client";

import {
  MonitorSmartphone,
  Smartphone,
  PenTool,
  Database,
  Lightbulb,
  Wrench,
  Globe,
  Server,
  Code2,
  Shield,
  BarChart3,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Map icon name strings from DB → Lucide components
const iconMap: Record<string, LucideIcon> = {
  MonitorSmartphone,
  Smartphone,
  PenTool,
  Database,
  Lightbulb,
  Wrench,
  Globe,
  Server,
  Code2,
  Shield,
  BarChart3,
  Cpu,
};

// Grid layout classes based on index for visual variety
const gridClasses = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

interface ServiceData {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: unknown;
  priceFrom: string | null;
  isFeatured: boolean;
}

interface ServicesProps {
  services?: ServiceData[];
}

export function Services({ services }: ServicesProps) {
  const items = services && services.length > 0 ? services : null;

  return (
    <section id="services" className="py-4 md:py-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dots opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4"
        >
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2 block">
              [01] OUR SERVICES
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground uppercase tracking-tight">
              Comprehensive <span className="text-green">Capabilities</span>
            </h2>
          </div>
          <p className="font-sans text-muted text-xs md:text-sm max-w-xs leading-relaxed">
            End-to-end digital solutions tailored to your business needs, delivered with uncompromising quality.
          </p>
        </motion.div>

        {items ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
            {items.map((service, index) => {
              const Icon = iconMap[service.icon] || Code2;
              const colClass = gridClasses[index % gridClasses.length];
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02 }}
                  key={service.id}
                  className={cn(
                    "group relative p-6 flex flex-col justify-between border border-border bg-surface hover:border-green transition-all duration-300",
                    colClass
                  )}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-10 h-10 bg-surface-hover border border-border flex items-center justify-center mb-4 group-hover:border-green transition-colors"
                    >
                      <Icon className="w-5 h-5 text-foreground group-hover:text-green transition-colors" />
                    </motion.div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-green transition-colors duration-300 uppercase">
                      {service.title}
                    </h3>
                    <p className="font-sans text-muted text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-2 flex items-center text-green font-mono text-xs opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <span className="ml-1.5">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center font-mono text-muted text-xs border border-border border-dashed">
            <p>Belum ada layanan yang ditambahkan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
