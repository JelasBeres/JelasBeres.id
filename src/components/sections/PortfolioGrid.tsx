"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectData {
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

interface PortfolioGridProps {
  filterCategory?: string;
  projects?: ProjectData[];
}

export function PortfolioGrid({ filterCategory, projects = [] }: PortfolioGridProps) {
  const [activeTab, setActiveTab] = useState<string | "all">(filterCategory || "all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "architect", label: "Architecture" },
    { id: "ml", label: "Machine Learning / AI" },
  ];

  const filteredProjects = projects.filter((p) => 
    activeTab === "all" ? true : p.category === activeTab
  );

  return (
    <div className="w-full">
      {/* Filters (only show if no strict filterCategory was provided) */}
      {!filterCategory && (
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-5 py-2 font-mono text-sm transition-colors border relative z-10",
                activeTab === cat.id
                  ? "text-background border-transparent"
                  : "bg-surface border-border text-muted hover:border-foreground hover:text-foreground"
              )}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="active-portfolio-tab"
                  className="absolute inset-0 bg-foreground -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            let parsedTechStack: string[] = [];
            if (Array.isArray(project.techStack)) {
              parsedTechStack = project.techStack;
            } else if (typeof project.techStack === "string") {
              try { parsedTechStack = JSON.parse(project.techStack); } catch {}
            }

            const categoryLabel = categories.find(c => c.id === project.category)?.label || project.category;
            const link = `/portfolio/${project.slug}`;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative border border-border bg-surface overflow-hidden hover:border-green transition-all"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-surface-hover">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                  {project.thumbnailUrl && (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-green font-bold">
                      [ {categoryLabel.toUpperCase()} ]
                    </span>
                    <Link 
                      href={link}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-green group-hover:bg-green group-hover:text-background transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl text-foreground mb-3 group-hover:text-green transition-colors">
                    <Link href={link} className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="font-sans text-muted text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {parsedTechStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-background border border-border text-foreground font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center font-mono text-muted border border-border border-dashed">
          <p>Belum ada project untuk kategori ini.</p>
        </div>
      )}
    </div>
  );
}
