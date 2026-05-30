import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Metadata } from "next";
import { getPublicProjects } from "@/actions/projects";

export const metadata: Metadata = {
  title: "Data Science Portfolio | JelasBeres.id",
  description: "Explore our latest data science projects.",
};

export const revalidate = 0;

export default async function DataSciencePortfolioPage() {
  const projects = await getPublicProjects();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <span className="font-mono text-sm text-green tracking-wider mb-4 block">
            PORTFOLIO / DATA SCIENCE
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Data Science <span className="text-green">Projects</span>
          </h1>
          <p className="font-sans text-muted text-lg max-w-2xl">
            Uncovering hidden patterns and actionable insights from complex datasets.
          </p>
        </div>

        <PortfolioGrid filterCategory="data-science" projects={projects as any} />
      </div>
    </div>
  );
}
