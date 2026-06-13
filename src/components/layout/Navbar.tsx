"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { 
      href: "/portfolio", 
      label: "Portfolio",
      dropdown: [
        { href: "/portfolio/web-development", label: "Web Development" },
        { href: "/portfolio/mobile-development", label: "Mobile Development" },
        { href: "/portfolio/architect", label: "Architect" },
        { href: "/portfolio/machine-learning", label: "Machine Learning / Data Science" },
      ]
    },
    { href: "/pricing", label: "Pricing" },
    { href: "/team", label: "Team" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative h-8 md:h-10 w-48">
          {mounted && (
            <AnimatePresence mode="wait">
              {currentTheme === "light" ? (
                <motion.div
                  key="light-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src="/image/jelasberes-logo-white.webp" 
                    alt="JelasBeres.id Logo" 
                    fill
                    sizes="(max-width: 768px) 192px, 192px"
                    className="object-contain object-left invert"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="dark-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src="/image/jelasberes-logo-white.webp" 
                    alt="JelasBeres.id Logo" 
                    fill
                    sizes="(max-width: 768px) 192px, 192px"
                    className="object-contain object-left"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
                <li 
                  key={link.href} 
                  className="relative"
                  onMouseEnter={() => {
                    if (link.dropdown) setActiveDropdown(link.label);
                    setHoveredLink(link.label);
                  }}
                  onMouseLeave={() => {
                    if (link.dropdown) setActiveDropdown(null);
                    setHoveredLink(null);
                  }}
                >
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-surface-hover -z-10 rounded-sm"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className="font-apple font-medium text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1 px-3 py-2"
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} />}
                  </Link>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-surface border border-border p-2 flex flex-col gap-1 shadow-2xl"
                      >
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="font-apple font-medium text-xs text-muted hover:text-green hover:bg-surface-hover px-4 py-3 transition-colors"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-foreground hover:border-green hover:text-green transition-all"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait">
                  {currentTheme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
            
            <Link
              href="/#contact"
              className="px-6 py-2 border border-border text-foreground font-apple font-medium text-sm hover:border-green hover:text-green transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden"
          >
            <div className="p-6">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <div className="flex flex-col gap-4">
                      <Link
                        href={link.href}
                        className="font-apple font-medium text-lg text-foreground hover:text-green transition-colors"
                        onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      
                      {/* Mobile Dropdown items */}
                      {link.dropdown && (
                        <div className="flex flex-col gap-3 pl-4 border-l border-border ml-2">
                          {link.dropdown.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="font-apple font-medium text-sm text-muted hover:text-green transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex gap-4">
                  <Link
                    href="/#contact"
                    className="flex-1 inline-block px-6 py-3 border border-border text-foreground font-apple font-medium text-sm text-center hover:border-green hover:text-green transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hubungi Kami
                  </Link>
                  {mounted && (
                    <button
                      onClick={() => {
                        setTheme(currentTheme === "dark" ? "light" : "dark");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-12 flex items-center justify-center border border-border text-foreground hover:border-green hover:text-green transition-all"
                      aria-label="Toggle Theme"
                    >
                      {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
