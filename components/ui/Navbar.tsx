"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ExternalLink, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { useDevice } from "@/hooks/useDevice";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Overview", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Arsenal", href: "#skills" },
  { name: "Timeline", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const device = useDevice();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ["hero", "projects", "skills", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-obsidian-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-glass-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo & Telemetry */}
        <a
          href="#hero"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian-800 p-1.5 border border-cyan-500/30 shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/s_logo.svg"
              alt="Saiman Sah Logo"
              width={28}
              height={28}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-wider text-sm text-zinc-100 group-hover:text-cyan-400 transition-colors">
              SAIMAN SAH
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
              ODNI EXECUTIVE • BADGE 118
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-obsidian-900/60 p-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-obsidian-800/80 px-3 py-1.5 border border-white/5 text-xs font-mono text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{PERSONAL_INFO.locationShort}</span>
          </div>

          <MagneticButton
            asAnchor
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3" />
          </MagneticButton>

          <MagneticButton
            asAnchor
            href="#contact"
            variant="primary"
            size="sm"
          >
            <Sparkles className="h-3 w-3" />
            <span>Get in Touch</span>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-obsidian-800 text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-obsidian-950/95 backdrop-blur-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> ODNI Cyber Executive #118
                </span>
                <span className="text-zinc-400">{PERSONAL_INFO.locationShort}</span>
              </div>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-200 hover:text-cyan-400 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <MagneticButton
                  asAnchor
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                >
                  Connect on LinkedIn
                </MagneticButton>
                <MagneticButton
                  asAnchor
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  Get in Touch
                </MagneticButton>
              </div>

              {/* Detected Device Status Strip */}
              {device.isMounted && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{device.label}</span>
                  </span>
                  <span className="text-zinc-500">
                    {device.orientation.toUpperCase()} &bull; {device.screenWidth}×{device.screenHeight}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
