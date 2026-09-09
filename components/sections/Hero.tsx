"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ArrowUpRight,
  Terminal,
  Activity,
  MapPin,
  Award,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { useDevice } from "@/hooks/useDevice";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";

export function Hero() {
  const device = useDevice();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines, Telemetry & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6"
          >
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md shadow-glow-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>VERIFIED PROFILE</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-medium text-amber-300 backdrop-blur-md">
                <Award className="h-3.5 w-3.5" />
                <span>ODNI CYBER EXECUTIVE (BADGE #118)</span>
              </div>

              {/* Automatic Device Detection Badge */}
              {device.isMounted && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-300 backdrop-blur-md">
                  {device.isMobile ? (
                    <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                  ) : device.isTablet ? (
                    <Tablet className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Monitor className="h-3.5 w-3.5 text-cyan-400" />
                  )}
                  <span>
                    {device.isMobile
                      ? "MOBILE VIEW ACTIVE"
                      : device.isTablet
                      ? "TABLET VIEW ACTIVE"
                      : "DESKTOP WORKSTATION"}
                  </span>
                </div>
              )}
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Building Fast <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
                  Web Applications
                </span>{" "}
                <br />
                &amp; Secure Systems.
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
                Hi, I’m <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong> &mdash; a
                full-stack developer and cybersecurity specialist from Nepal. Former Cyber Executive at{" "}
                <span className="text-cyan-400 font-medium">ODNI CTIIC</span>, focused on clean code, modern
                web apps, and practical security.
              </p>
            </div>

            {/* Philosophy Spotlight Mini Card */}
            <div className="w-full max-w-xl rounded-xl border border-white/10 bg-obsidian-800/60 p-3.5 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                    Philosophy
                  </div>
                  <div className="text-sm font-semibold text-zinc-100 font-serif tracking-wide">
                    {PERSONAL_INFO.philosophySanskrit} &bull;{" "}
                    <span className="text-zinc-300 font-sans text-xs font-normal">
                      &ldquo;{PERSONAL_INFO.philosophyEnglish}&rdquo;
                    </span>
                  </div>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400 border border-white/5 shrink-0">
                100% Self-Taught
              </span>
            </div>

            {/* Live Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl">
              <div className="rounded-xl border border-white/10 bg-obsidian-900/80 p-3 backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-400" /> STATUS
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ONLINE
                </div>
              </div>

              {/* Dynamic Auto-Detected Device Client */}
              <div className="rounded-xl border border-white/10 bg-obsidian-900/80 p-3 backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  {device.isMobile ? (
                    <Smartphone className="h-3 w-3 text-amber-400" />
                  ) : device.isTablet ? (
                    <Tablet className="h-3 w-3 text-amber-400" />
                  ) : (
                    <Monitor className="h-3 w-3 text-amber-400" />
                  )}
                  <span>CLIENT</span>
                </div>
                <div className="text-xs font-semibold text-amber-300 mt-1 truncate font-mono">
                  {device.isMounted
                    ? device.isMobile
                      ? "MOBILE"
                      : device.isTablet
                      ? "TABLET"
                      : "DESKTOP"
                    : "ACTIVE"}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-obsidian-900/80 p-3 backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3 text-cyan-400" /> BADGE ID
                </div>
                <div className="text-xs font-semibold text-cyan-300 mt-1 font-mono">NO. 118</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-obsidian-900/80 p-3 backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-purple-400" /> LOCATION
                </div>
                <div className="text-xs font-semibold text-zinc-100 mt-1 truncate">
                  {PERSONAL_INFO.locationShort}
                </div>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              <MagneticButton
                asAnchor
                href="#contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>

              <MagneticButton
                asAnchor
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center border-white/15"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Identity Card & ODNI Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <TiltCard
              maxTilt={12}
              glowColor="rgba(0, 243, 255, 0.18)"
              className="w-full max-w-md p-6 border-cyan-500/20 bg-gradient-to-b from-obsidian-850/90 to-obsidian-950/90"
            >
              {/* Profile Image with S-Badge Overlay */}
              <div className="relative mx-auto mb-6 h-60 w-full overflow-hidden rounded-2xl border border-white/15 bg-obsidian-900">
                <Image
                  src="/assets/profile.png"
                  alt="Saiman Sah"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top filter contrast-[1.05]"
                  priority
                />
                {/* Floating S-Logo Badge */}
                <div className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-xl bg-obsidian-900/90 p-2 border border-cyan-400/40 shadow-glow-cyan backdrop-blur-md">
                  <Image
                    src="/assets/s_logo.svg"
                    alt="S Logo"
                    width={26}
                    height={26}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian-950 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5 bg-obsidian-900/80 px-2.5 py-1 rounded-md border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Verified Profile
                  </span>
                  <span className="bg-obsidian-900/80 px-2.5 py-1 rounded-md border border-white/10">
                    Nepal 🇳🇵
                  </span>
                </div>
              </div>

              {/* ODNI CTIIC Spotlight Banner */}
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-obsidian-850 to-cyan-500/10 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative h-7 w-7 rounded-full overflow-hidden border border-amber-400/50 bg-obsidian-900 p-0.5">
                      <Image
                        src="/assets/dni_logo.png"
                        alt="ODNI CTIIC Emblem"
                        width={28}
                        height={28}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-amber-300 font-mono">
                      ODNI CYBER EXECUTIVE
                    </span>
                  </div>
                  <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-amber-400/40">
                    BADGE 118
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cyber Executive tenure of <strong>690 Days (Aug 2024 &ndash; Jul 2026)</strong> leading
                  software architecture, testing, and system security.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-white/5 p-2.5 border border-white/5">
                  <div className="text-lg font-bold text-cyan-400 font-mono">100%</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Code Integrity</div>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5 border border-white/5">
                  <div className="text-lg font-bold text-purple-400 font-mono">4,200 m</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Trek Elevation</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
