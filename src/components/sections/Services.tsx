"use client";

import { MonitorSmartphone, Smartphone, PenTool, Database, Lightbulb, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description: "Custom web applications, corporate websites, and enterprise systems built for scale and performance.",
    className: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    className: "md:col-span-1",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "User-centric interface design and seamless user experiences.",
    className: "md:col-span-1",
  },
  {
    icon: Database,
    title: "Backend & API",
    description: "Robust architecture, database design, and REST/GraphQL APIs.",
    className: "md:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Tech Consulting",
    description: "Strategic technology planning and architecture review.",
    className: "md:col-span-1",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Ongoing support, optimization, and system upgrades.",
    className: "md:col-span-2",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dots opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-sm text-muted tracking-wider mb-4 block">
              [01] OUR SERVICES
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight">
              Comprehensive <span className="text-green">Capabilities</span>
            </h2>
          </div>
          <p className="font-sans text-muted max-w-sm">
            End-to-end digital solutions tailored to your business needs, delivered with uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                key={index}
                className={cn(
                  "group relative p-8 flex flex-col justify-between border border-border bg-surface hover:border-green transition-all duration-300",
                  service.className
                )}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 bg-surface-hover border border-border flex items-center justify-center mb-6 group-hover:border-green transition-colors"
                  >
                    <Icon className="w-6 h-6 text-foreground group-hover:text-green transition-colors" />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-muted text-sm md:text-base line-clamp-3">
                    {service.description}
                  </p>
                </div>
                
                <div className="relative z-10 mt-4 flex items-center text-green font-mono text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Explore <span className="ml-2">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
