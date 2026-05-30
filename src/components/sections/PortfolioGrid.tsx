"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects, ProjectCategory } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioGridProps {
  filterCategory?: ProjectCategory;
}

export function PortfolioGrid({ filterCategory }: PortfolioGridProps) {
  const [activeTab, setActiveTab] = useState<ProjectCategory | "all">(filterCategory || "all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "architect", label: "Architecture" },
  ];

  const filteredProjects = portfolioProjects.filter((p) => 
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
              onClick={() => setActiveTab(cat.id as ProjectCategory | "all")}
              className={cn(
                "px-5 py-2 font-mono text-sm transition-colors border",
                activeTab === cat.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-surface border-border text-muted hover:border-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
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
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-green font-bold">
                    [ {project.categoryLabel.toUpperCase()} ]
                  </span>
                  <Link 
                    href={project.link}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-green group-hover:bg-green group-hover:text-background transition-colors"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-foreground mb-3 group-hover:text-green transition-colors">
                  <Link href={project.link} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                
                <p className="font-sans text-muted text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
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
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center font-mono text-muted border border-border border-dashed">
          <p>No projects found for this category.</p>
        </div>
      )}
    </div>
  );
}
