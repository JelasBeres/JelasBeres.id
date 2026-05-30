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
    <section id="process" className="py-24 bg-background border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-sm text-muted tracking-wider mb-4 block">
            [02] OUR PROCESS
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight max-w-2xl">
            Engineered for <span className="text-green">Success</span>
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-border z-0"></div>
          
          <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {processes.map((p, i) => (
              <div key={i} className="relative z-10 min-w-[280px] md:w-1/5 shrink-0 snap-start">
                <div className="w-14 h-14 bg-surface border border-border flex items-center justify-center font-mono text-foreground text-lg font-bold mb-6 group-hover:border-green transition-colors">
                  {p.step}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{p.title}</h3>
                <p className="font-sans text-muted text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
