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

      {/* Compact List */}
      <motion.div layout className="flex flex-col gap-3">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative border border-border bg-surface hover:border-green transition-all"
              >
                <Link href={link} className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
                  {/* Compact Image */}
                  <div className="relative w-full md:w-40 h-24 sm:h-20 shrink-0 overflow-hidden bg-surface-hover border border-border">
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                    {project.thumbnailUrl && (
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, 160px"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-green font-bold tracking-wider">
                        [ {categoryLabel.toUpperCase()} ]
                      </span>
                      <span className="md:hidden w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-green group-hover:bg-green group-hover:text-background transition-colors">
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1 group-hover:text-green transition-colors truncate">
                      {project.title}
                    </h3>
                    
                    <p className="font-sans text-muted text-xs sm:text-sm truncate">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack & Arrow */}
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 shrink-0 mt-2 md:mt-0">
                    <div className="flex flex-wrap gap-1.5 md:max-w-[200px] md:justify-end">
                      {parsedTechStack.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 bg-background border border-border text-foreground font-mono text-[10px] whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                      {parsedTechStack.length > 3 && (
                        <span className="px-2 py-0.5 bg-background border border-border text-muted font-mono text-[10px]">
                          +{parsedTechStack.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-border items-center justify-center text-muted group-hover:border-green group-hover:bg-green group-hover:text-background transition-colors shrink-0">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
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
