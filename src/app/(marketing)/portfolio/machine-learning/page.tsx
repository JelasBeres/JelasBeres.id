import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Metadata } from "next";
import { getPublicProjects } from "@/actions/projects";

export const metadata: Metadata = {
  title: "Machine Learning Portfolio | JelasBeres.id",
  description: "Explore our latest machine learning projects.",
};

export const revalidate = 0;

export default async function MachineLearningPortfolioPage() {
  const projects = await getPublicProjects();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <span className="font-mono text-sm text-green tracking-wider mb-4 block">
            PORTFOLIO / MACHINE LEARNING
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Machine Learning <span className="text-green">Projects</span>
          </h1>
          <p className="font-sans text-muted text-lg max-w-2xl">
            Intelligent models and predictive systems tailored for complex business challenges.
          </p>
        </div>

        <PortfolioGrid filterCategory="machine-learning" projects={projects as any} />
      </div>
    </div>
  );
}
