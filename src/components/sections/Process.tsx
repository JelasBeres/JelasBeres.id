import { cn } from "@/lib/utils";

const processes = [
  { step: "01", title: "Discovery & Planning", desc: "Understanding your requirements and defining architecture." },
  { step: "02", title: "Design & Prototyping", desc: "Creating UI/UX wireframes and interactive prototypes." },
  { step: "03", title: "Development", desc: "Writing clean, scalable code with modern tech stacks." },
  { step: "04", title: "Testing & QA", desc: "Rigorous testing to ensure quality and performance." },
  { step: "05", title: "Deployment", desc: "Seamless launch to production environments." },
];

export function Process() {
  return (
    <section id="process" className="py-8 md:py-16 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2 block">
            [02] OUR PROCESS
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground uppercase tracking-tight max-w-2xl">
            Engineered for <span className="text-green">Success</span>
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 md:gap-x-8">
            {processes.map((p, i) => (
              <div key={i} className="group relative z-10">
                {/* Connecting line to the next item (only shown on desktop lg screen for items 1-4) */}
                {i < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-10 w-[calc(100%-40px+2rem)] h-[1px] bg-border group-hover:bg-green transition-all duration-500 z-[-1]" />
                )}
                <div className="w-10 h-10 bg-surface border border-border group-hover:border-green group-hover:bg-surface-hover flex items-center justify-center font-mono text-foreground text-sm font-bold mb-4 transition-colors duration-300">
                  {p.step}
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-1.5 uppercase group-hover:text-green transition-colors duration-300">{p.title}</h3>
                <p className="font-sans text-muted text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
