"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Terminal,
  Shield,
  Radio,
  Layers,
  Cpu,
  Sparkles,
} from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: string; value: ProjectCategory | "all"; icon: any }[] = [
  { label: "All Works", value: "all", icon: Sparkles },
  { label: "Cybersecurity", value: "cybersecurity", icon: Shield },
  { label: "IoT & Hardware", value: "iot", icon: Radio },
  { label: "WebGL & Web", value: "web", icon: Layers },
  { label: "Systems", value: "systems", icon: Cpu },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-400 mb-3">
              <Terminal className="h-3.5 w-3.5" />
              <span>PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Featured Projects &amp;{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
            <p className="mt-3 text-zinc-400 max-w-xl text-sm sm:text-base">
              A collection of cybersecurity tools, hardware sensors, web applications, and systems I have built.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full rounded-2xl border border-white/10 bg-obsidian-900/80 p-1.5 backdrop-blur-md no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const accentGlow =
              project.accentColor === "cyan"
                ? "rgba(0, 243, 255, 0.15)"
                : project.accentColor === "amber"
                ? "rgba(245, 158, 11, 0.15)"
                : project.accentColor === "violet"
                ? "rgba(139, 92, 246, 0.15)"
                : "rgba(16, 185, 129, 0.15)";

            const borderAccent =
              project.accentColor === "cyan"
                ? "hover:border-cyan-500/40"
                : project.accentColor === "amber"
                ? "hover:border-amber-500/40"
                : project.accentColor === "violet"
                ? "hover:border-violet-500/40"
                : "hover:border-emerald-500/40";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard
                  maxTilt={8}
                  glowColor={accentGlow}
                  className={cn("p-7 h-full flex flex-col justify-between transition-colors", borderAccent)}
                >
                  <div>
                    {/* Top Metadata Badge */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-zinc-300">
                        {project.category}
                      </span>

                      {project.featured && (
                        <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> FEATURED PROJECT
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Performance / Architectural Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2.5 mb-6 rounded-xl bg-obsidian-950/60 p-3 border border-white/5">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-sm font-bold font-mono text-zinc-100">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-tight">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                      {project.liveUrl ? (
                        <MagneticButton
                          asAnchor
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                          className="border-white/15 hover:border-cyan-400/50"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </MagneticButton>
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">
                          Active System
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
