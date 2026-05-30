import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Portfolio | JelasBeres.id",
  description: "Explore our latest mobile application projects.",
};

export default function MobilePortfolioPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <span className="font-mono text-sm text-green tracking-wider mb-4 block">
            PORTFOLIO / MOBILE APP
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Mobile App <span className="text-green">Projects</span>
          </h1>
          <p className="font-sans text-muted text-lg max-w-2xl">
            Native and cross-platform mobile experiences that engage users on the go.
          </p>
        </div>

        <PortfolioGrid filterCategory="mobile" />
      </div>
    </div>
  );
}
