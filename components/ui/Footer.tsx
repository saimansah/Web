"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Heart, ShieldAlert } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-obsidian-950 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand & Philosophy */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian-900 border border-cyan-500/30 p-1.5 shadow-glow-cyan">
              <Image
                src="/assets/s_logo.svg"
                alt="Saiman Sah Logo"
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="font-bold tracking-wider text-sm text-white">
                SAIMAN SAH
              </div>
              <div className="text-xs font-mono text-zinc-400">
                {PERSONAL_INFO.philosophySanskrit} &bull; &ldquo;{PERSONAL_INFO.philosophyEnglish}&rdquo;
              </div>
            </div>
          </div>

          {/* Center ODNI Badge Record */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>ODNI CTIIC CYBER EXECUTIVE &bull; BADGE NO. 118</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Saiman Sah. All rights reserved. Architected with Next.js &amp; TypeScript.
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-zinc-300 transition-colors">
              Overview
            </a>
            <a href="#projects" className="hover:text-zinc-300 transition-colors">
              Showcase
            </a>
            <a href="#skills" className="hover:text-zinc-300 transition-colors">
              Arsenal
            </a>
            <a href="#experience" className="hover:text-zinc-300 transition-colors">
              Timeline
            </a>
            <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
