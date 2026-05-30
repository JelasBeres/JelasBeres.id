"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Code2 } from "lucide-react";

const codeSnippet = `const buildWorldClass = async () => {
  const requirements = {
    performance: "95+ Lighthouse",
    accessibility: "WCAG 2.1 AA",
    codeQuality: "FAANG Standards",
  };
  
  await JelasBeres.execute(requirements);
  return { status: "Success", details: "It works. Period." };
};`;

export function Hero() {
  const [typedCode, setTypedCode] = useState("");
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Apple-like scroll morphing values
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const terminalScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const terminalRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedCode(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) {
        clearInterval(typingInterval);
      }
    }, 50); // Speed of typing
    
    return () => clearInterval(typingInterval);
  }, []);

  const headline = "Engineering Clarity, Delivering Results.";
  const words = headline.split(" ");

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden bg-background blueprint-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background"></div>
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-2xl"
        >


          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-foreground">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="font-sans text-lg md:text-xl text-muted mb-10 max-w-xl">
            We are a team of experienced engineers and designers building high-quality digital products. From web apps to enterprise systems, we work with global industry standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#contact"
              className="px-8 py-4 bg-foreground text-background font-sans font-bold hover:bg-green transition-colors text-center"
            >
              Mulai Project Sekarang →
            </Link>
            <Link
              href="#portfolio"
              className="px-8 py-4 border border-border text-foreground font-sans font-bold hover:border-foreground transition-colors text-center bg-surface/50 backdrop-blur-sm"
            >
              Lihat Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Terminal UI */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: terminalY, scale: terminalScale, rotate: terminalRotate, opacity: terminalOpacity }}
          className="relative w-full max-w-lg mx-auto lg:ml-auto border border-border bg-surface/90 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl origin-bottom-right"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-hover">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-muted" />
              <span className="font-mono text-xs text-muted">execute.ts</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 font-code text-sm md:text-base leading-relaxed overflow-x-auto">
            <pre className="text-muted">
              <code dangerouslySetInnerHTML={{ 
                __html: typedCode
                  .replace(/const|async|await|return/g, '<span class="text-green">$&</span>')
                  .replace(/".*?"/g, '<span class="text-foreground">$&</span>')
                  .replace(/JelasBeres/g, '<span class="text-foreground font-bold">$&</span>') 
              }} />
              <span className="inline-block w-2 h-5 bg-green ml-1 align-middle animate-pulse"></span>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-green" />
        </motion.div>
      </motion.div>
    </section>
  );
}
