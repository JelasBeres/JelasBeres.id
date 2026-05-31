import Image from "next/image";
import Link from "next/link";
import { Compass, Settings, Building2, Server, Layers, Zap } from "lucide-react";

export const metadata = {
  title: "Architecture & Engineering | JelasBeres.id",
  description: "Bridging the gap between structural CAD engineering and high-performance digital IT infrastructure.",
};

export default function ArchitectPage() {
  return (
    <div className="bg-background text-foreground selection:bg-green selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden blueprint-grid">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-hover border border-border rounded-sm mb-8">
            <Compass size={16} className="text-green" />
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-medium">Engineering Excellence</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 max-w-5xl mx-auto text-foreground uppercase">
            Equilibrium<br className="hidden md:block" /> In Precision
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridging the gap between structural CAD engineering and high-performance digital IT infrastructure. We design the physical and code the virtual.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="#contact" 
              className="w-full sm:w-auto bg-foreground text-background font-mono text-xs font-medium px-8 py-4 uppercase tracking-widest hover:bg-green hover:text-white transition-all active:scale-95 text-center"
            >
              Initiate System Sync
            </Link>
            <Link 
              href="#showcase" 
              className="w-full sm:w-auto border border-border text-foreground font-mono text-xs font-medium px-8 py-4 uppercase tracking-widest hover:bg-surface-hover transition-all active:scale-95 text-center"
            >
              View Blueprint
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-24 max-w-7xl mx-auto px-6">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-none overflow-hidden border border-border shadow-2xl bg-surface group">
            <img 
              alt="Technical blueprint of a turbine assembly" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2942&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="bg-surface/80 backdrop-blur-md p-6 border border-border">
                <p className="font-mono text-xs font-bold tracking-widest text-green mb-2">PROJECT: SYNC-01</p>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">Integrated Infrastructure Hub</p>
              </div>
              
              <div className="hidden md:block font-mono text-xs text-muted text-right bg-surface/80 backdrop-blur-md p-4 border border-border">
                COORDINATES: 40.7128° N, 74.0060° W<br/>
                LATENCY: 0.2MS / PRECISION: ±0.001MM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 bg-surface" id="expertise">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Our Expertise Core</h2>
              <p className="font-sans text-lg text-muted">We operate at the intersection of bits and atoms, ensuring your physical structures are as robust as your digital networks.</p>
            </div>
            <div className="font-mono text-xs font-medium uppercase tracking-widest text-muted border border-border px-4 py-2">
              Solutions / 01-03
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Expertise Card 1 */}
            <div className="group p-10 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[400px]">
              <div>
                <Settings size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-4 text-foreground">CAD Engineering</h3>
                <p className="font-sans text-muted leading-relaxed">High-fidelity 2D and 3D modeling for industrial components and architectural masterplans.</p>
              </div>
              <ul className="font-mono text-[11px] font-medium uppercase tracking-widest space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Parametric Design</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Tolerancing Analysis</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> BIM Integration</li>
              </ul>
            </div>
            
            {/* Expertise Card 2 */}
            <div className="group p-10 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[400px]">
              <div>
                <Building2 size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Architectural Systems</h3>
                <p className="font-sans text-muted leading-relaxed">Intelligent building systems that integrate HVAC, security, and automation into a single cohesive UI.</p>
              </div>
              <ul className="font-mono text-[11px] font-medium uppercase tracking-widest space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Smart Sensor Mesh</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Energy Optimization</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Digital Twins</li>
              </ul>
            </div>
            
            {/* Expertise Card 3 */}
            <div className="group p-10 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[400px]">
              <div>
                <Server size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-4 text-foreground">IT Infrastructure</h3>
                <p className="font-sans text-muted leading-relaxed">Next-gen server deployment, low-latency networking, and cloud-native architectural strategy.</p>
              </div>
              <ul className="font-mono text-[11px] font-medium uppercase tracking-widest space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Edge Computing</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> SDN Deployment</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-green"></span> Security Hardening</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Process Section */}
      <section className="py-32 bg-background border-y border-border overflow-hidden relative" id="process">
        <div className="absolute inset-0 blueprint-grid opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Hybrid Deployment Flow</h2>
            <div className="h-1 w-20 bg-green mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative">
              {/* Step 1 */}
              <div className="bg-surface p-8 border border-border z-10 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-4 block">PHASE 01</span>
                <h4 className="font-display text-xl font-bold mb-3 text-foreground">Blueprint Mapping</h4>
                <p className="font-sans text-muted text-sm leading-relaxed">Translating physical requirements into a digital schematic with millimeter precision.</p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-surface p-8 border border-border z-10 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-4 block">PHASE 02</span>
                <h4 className="font-display text-xl font-bold mb-3 text-foreground">Structural Audit</h4>
                <p className="font-sans text-muted text-sm leading-relaxed">Stress-testing the architecture against both environmental and digital load factors.</p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-surface p-8 border border-border z-10 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-4 block">PHASE 03</span>
                <h4 className="font-display text-xl font-bold mb-3 text-foreground">Digital Layering</h4>
                <p className="font-sans text-muted text-sm leading-relaxed">Injecting the IT stack into the physical model, configuring routing and nodes.</p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-surface p-8 border border-border z-10 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-4 block">PHASE 04</span>
                <h4 className="font-display text-xl font-bold mb-3 text-foreground">System Sync</h4>
                <p className="font-sans text-muted text-sm leading-relaxed">Live deployment and validation of the hybrid ecosystem for full production use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-32 bg-surface" id="showcase">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 border border-border p-2 bg-background shadow-xl">
                <img 
                  alt="A sleek computer monitor displaying advanced 3D CAD software" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000" 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop"
                />
              </div>
              
              {/* Floating Code Snippet Card */}
              <div className="absolute -bottom-10 -right-4 md:-right-10 p-6 bg-[#0B0B0F] text-gray-300 font-mono text-[11px] max-w-[280px] hidden sm:block border-l-4 border-green shadow-2xl z-20">
                <p className="mb-4 text-green opacity-80">// INITIALIZING CORE_STACK</p>
                <p className="mb-2 text-blue-400">const <span className="text-yellow-200">architecture</span> = new <span className="text-green">Hub</span>({'{'}</p>
                <p className="pl-4">nodes: <span className="text-orange-300">"Industrial_Tier_4"</span>,</p>
                <p className="pl-4">sync: <span className="text-purple-400">true</span>,</p>
                <p className="pl-4">precision: <span className="text-purple-400">0.001</span></p>
                <p className="text-blue-400">});</p>
                <p className="mt-4 text-green font-bold animate-pulse">STATUS: SYSTEM_READY</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight">Convergence of Design and Logic</h2>
              <p className="font-sans text-lg text-muted mb-10 leading-relaxed">
                We don't just build server rooms; we engineer digital environments that respect the physical constraints of space while maximizing computational throughput. 
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border bg-background flex items-center justify-center flex-shrink-0 mt-1">
                    <Layers className="text-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold mb-2 text-foreground">Multi-Layered Architecture</h4>
                    <p className="font-sans text-muted text-sm leading-relaxed">Synchronized physical blueprints with digital network topology mapping.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border bg-background flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="text-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold mb-2 text-foreground">Zero-Loss Performance</h4>
                    <p className="font-sans text-muted text-sm leading-relaxed">Optimized cabling and infrastructure layouts for minimal signal attenuation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-foreground text-background overflow-hidden relative">
        {/* Atmospheric effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full blueprint-grid filter invert"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-10 tracking-tighter uppercase">Ready To<br/>Stabilize?</h2>
          <p className="font-sans text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Connect with our lead architects to discuss your next precision-critical infrastructure project.
          </p>
          <Link 
            href="#contact"
            className="inline-block bg-background text-foreground font-mono text-sm font-bold px-12 py-5 uppercase tracking-[0.2em] hover:bg-green hover:text-white hover:border-green transition-all duration-300 scale-100 hover:scale-105 active:scale-95 border border-transparent"
          >
            Initiate System Sync
          </Link>
        </div>
      </section>
    </div>
  );
}
