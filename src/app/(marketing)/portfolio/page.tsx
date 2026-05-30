import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | JelasBeres.id",
  description: "Explore our latest projects spanning web development, mobile apps, and enterprise architecture.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <span className="font-mono text-sm text-muted tracking-wider mb-4 block">
            [03] OUR WORK
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight max-w-3xl mb-6">
            Engineered <span className="text-green">Excellence</span>
          </h1>
          <p className="font-sans text-muted text-lg max-w-2xl">
            Explore our curated selection of digital products, enterprise architectures, and robust web applications.
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </div>
  );
}
