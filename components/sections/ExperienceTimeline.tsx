"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Calendar,
  Clock,
  MapPin,
  Award,
  CheckCircle,
  Sparkles,
  Building2,
  Terminal,
} from "lucide-react";
import { PERSONAL_INFO, TIMELINE } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-medium text-amber-300 mb-3">
            <Award className="h-3.5 w-3.5" />
            <span>EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            ODNI CTIIC &amp;{" "}
            <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified background as Cyber Executive at the ODNI CTIIC, along with my journey building software and security tools.
          </p>
        </div>

        {/* Featured ODNI CTIIC Banner Dossier */}
        <div className="mb-16">
          <TiltCard
            maxTilt={6}
            glowColor="rgba(245, 158, 11, 0.15)"
            className="p-8 sm:p-10 border-amber-500/30 bg-gradient-to-br from-obsidian-850 via-obsidian-900 to-obsidian-950"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Emblem & Identity */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-amber-400/50 bg-obsidian-950 p-2 shadow-glow-amber">
                  <Image
                    src="/assets/dni_logo.png"
                    alt="ODNI CTIIC Official Emblem"
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-mono font-bold text-amber-300 border border-amber-400/30 mb-2">
                  <ShieldAlert className="h-3.5 w-3.5" /> VERIFIED EXECUTIVE DOSSIER
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {PERSONAL_INFO.dniDossier.agency}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {PERSONAL_INFO.dniDossier.agencyFull}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-obsidian-800 px-3 py-1.5 text-xs font-mono text-cyan-300 border border-cyan-500/30">
                    Role: {PERSONAL_INFO.dniDossier.role}
                  </span>
                  <span className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-mono font-bold text-amber-300 border border-amber-400/40">
                    Badge: {PERSONAL_INFO.dniDossier.badgeNumber}
                  </span>
                </div>
              </div>

              {/* Service Details & Responsibilities */}
              <div className="lg:col-span-8 space-y-6">
                {/* Duration Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-cyan-400" /> TENURE (A.D.)
                    </div>
                    <div className="text-xs font-bold font-mono text-zinc-100 mt-1">
                      {PERSONAL_INFO.dniDossier.tenureAd}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-purple-400" /> TENURE (B.S.)
                    </div>
                    <div className="text-xs font-bold font-mono text-zinc-100 mt-1">
                      {PERSONAL_INFO.dniDossier.tenureBs}
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/30">
                    <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> TOTAL DURATION
                    </div>
                    <div className="text-xs font-bold font-mono text-amber-300 mt-1">
                      {PERSONAL_INFO.dniDossier.duration}
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {PERSONAL_INFO.dniDossier.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Step Timeline with Dynamic Trail Line */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-white/10 space-y-12 ml-3 sm:ml-6">
          {TIMELINE.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Node Marker on Trail Line */}
              <div
                className={`absolute -left-[15px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                  event.isVerifiedRecord
                    ? "border-amber-400 bg-obsidian-950 text-amber-300 shadow-glow-amber"
                    : "border-cyan-400 bg-obsidian-950 text-cyan-300 shadow-glow-cyan"
                }`}
              >
                {event.isVerifiedRecord ? (
                  <ShieldAlert className="h-3.5 w-3.5" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Event Card */}
              <div className="rounded-2xl border border-white/10 bg-obsidian-850/60 p-6 sm:p-8 backdrop-blur-md hover:border-white/20 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-medium">
                      {event.period}
                    </span>
                    {event.duration && (
                      <span className="text-xs font-mono text-zinc-400">
                        &bull; {event.duration}
                      </span>
                    )}
                  </div>

                  {event.highlightBadge && (
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border ${
                        event.isVerifiedRecord
                          ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                          : "bg-purple-400/10 text-purple-300 border-purple-400/30"
                      }`}
                    >
                      {event.highlightBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {event.title}
                </h3>
                <div className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-zinc-400" />
                  <span>{event.organization}</span>
                  <span className="text-zinc-500">&bull;</span>
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {event.description.map((desc, i) => (
                    <p key={i} className="text-sm text-zinc-300 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {event.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
