"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Server,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SKILLS } from "@/lib/data";
import { SkillCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const SECTORS: {
  id: SkillCategory;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
}[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    subtitle: "Modern interfaces, 3D web graphics, and clean design",
    icon: Code,
    color: "cyan",
  },
  {
    id: "backend",
    name: "Backend & APIs",
    subtitle: "Fast servers, databases, and REST/WebSocket APIs",
    icon: Server,
    color: "purple",
  },
  {
    id: "embedded",
    name: "Embedded & IoT",
    subtitle: "Microcontrollers, sensors, and hardware programming",
    icon: Cpu,
    color: "amber",
  },
  {
    id: "security",
    name: "Cybersecurity",
    subtitle: "Ethical hacking, system auditing, and security testing",
    icon: ShieldCheck,
    color: "emerald",
  },
];

export function SkillsMatrix() {
  const [activeSector, setActiveSector] = useState<SkillCategory>("frontend");

  const activeSkills = SKILLS.filter((s) => s.category === activeSector);

  return (
    <section id="skills" className="relative py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-medium text-purple-300 mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>SKILLS &amp; TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Technical Skills &amp;{" "}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Technologies and tools I use for web applications, backend services, hardware projects, and security testing.
          </p>
        </div>

        {/* Tab Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            const isActive = activeSector === sector.id;

            return (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={cn(
                  "relative flex flex-col text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                  isActive
                    ? "bg-obsidian-800/90 border-cyan-500/40 shadow-glow-cyan"
                    : "bg-obsidian-900/50 border-white/10 hover:border-white/20 hover:bg-obsidian-850/60"
                )}
              >
                {/* Active Indicator Top Light */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
                )}

                <div
                  className={cn(
                    "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl mb-2 sm:mb-3 border",
                    isActive
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                      : "bg-white/5 border-white/10 text-zinc-400"
                  )}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <h3 className="text-xs sm:text-base font-bold text-white mb-0.5 sm:mb-1 leading-tight">
                  {sector.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {sector.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {activeSkills.map((skill, idx) => (
              <div
                key={skill.name}
                className="group relative flex items-center justify-between p-4 rounded-xl border border-white/10 bg-obsidian-850/70 backdrop-blur-md hover:border-cyan-500/40 hover:bg-obsidian-800 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-zinc-100 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                </div>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 border border-white/5 group-hover:border-cyan-500/20 transition-all">
                  {skill.level}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
