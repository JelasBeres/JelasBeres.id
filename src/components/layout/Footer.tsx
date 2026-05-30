import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                JelasBeres
              </span>
              <span className="font-display font-bold text-2xl text-green">
                .id
              </span>
            </Link>
            <p className="text-muted font-sans text-sm mb-6 max-w-sm">
              Engineering Clarity, Delivering Results. We build world-class digital products with clear processes and solid outcomes.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-foreground mb-6">SERVICES</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="#services" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Web Development</Link></li>
              <li><Link href="#services" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Mobile Apps</Link></li>
              <li><Link href="#services" className="text-muted hover:text-foreground font-sans text-sm transition-colors">UI/UX Design</Link></li>
              <li><Link href="#services" className="text-muted hover:text-foreground font-sans text-sm transition-colors">IT Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-foreground mb-6">COMPANY</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="#process" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Process</Link></li>
              <li><Link href="#portfolio" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Portfolio</Link></li>
              <li><Link href="#pricing" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-foreground font-sans text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-foreground mb-6">CONNECT</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted hover:text-green font-sans text-sm transition-colors">
                  LinkedIn <ArrowUpRight className="ml-1 w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted hover:text-green font-sans text-sm transition-colors">
                  GitHub <ArrowUpRight className="ml-1 w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted hover:text-green font-sans text-sm transition-colors">
                  X (Twitter) <ArrowUpRight className="ml-1 w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="mailto:hello@jelasberes.id" className="flex items-center text-muted hover:text-green font-sans text-sm transition-colors">
                  hello@jelasberes.id <ArrowUpRight className="ml-1 w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted font-mono text-xs">
            © {new Date().getFullYear()} JelasBeres.id. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse"></span>
            <span className="text-muted font-mono text-xs">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
