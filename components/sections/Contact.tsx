"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { copyToClipboard } from "@/lib/utils";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(PERSONAL_INFO.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-400 mb-3">
            <Mail className="h-3.5 w-3.5" />
            <span>CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Get in{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, need software consulting, or want to collaborate? Feel free to email me directly or connect on LinkedIn.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
          {/* Card 1: Direct Email One-Click Copy */}
          <TiltCard
            maxTilt={6}
            glowColor="rgba(0, 243, 255, 0.18)"
            className="p-8 sm:p-10 border-cyan-500/30 bg-gradient-to-b from-obsidian-850 to-obsidian-950 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-glow-cyan">
                  <Mail className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-medium">
                  DIRECT EMAIL
                </span>
              </div>

              <div className="text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Email Address
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-2 break-all">
                {PERSONAL_INFO.email}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                Send me an email for project inquiries, consulting, or general questions.
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              data-interactive="true"
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 px-5 py-3.5 text-sm font-mono font-medium text-cyan-200 transition-all shadow-glow-cyan cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </TiltCard>

          {/* Card 2: LinkedIn Profile Spotlight */}
          <TiltCard
            maxTilt={6}
            glowColor="rgba(14, 165, 233, 0.18)"
            className="p-8 sm:p-10 border-sky-500/30 bg-gradient-to-b from-obsidian-850 to-obsidian-950 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
                  <Linkedin className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 font-medium">
                  LINKEDIN
                </span>
              </div>

              <div className="text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                Professional Network
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Connect on LinkedIn
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                Connect with me on LinkedIn to view my work history, recommendations, and professional background.
              </p>
            </div>

            <MagneticButton
              asAnchor
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full justify-center border-sky-500/40 text-sky-200 hover:bg-sky-500/10 font-mono text-xs"
            >
              <span>Open LinkedIn Profile</span>
              <ExternalLink className="h-4 w-4" />
            </MagneticButton>
          </TiltCard>
        </div>

        {/* Secondary Info & Socials Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Item 1: Base Location */}
          <div className="rounded-2xl border border-white/10 bg-obsidian-900/60 p-6 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span className="text-xs font-mono uppercase tracking-wider">Location</span>
            </div>
            <div className="text-base font-bold text-white">
              {PERSONAL_INFO.location}
            </div>
            <span className="text-xs text-zinc-500 mt-1 font-mono">Timezone: UTC+5:45</span>
          </div>

          {/* Item 2: Security / Privacy */}
          <div className="rounded-2xl border border-white/10 bg-obsidian-900/60 p-6 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider">Privacy</span>
            </div>
            <div className="text-base font-bold text-emerald-300">
              Verified &amp; Secure
            </div>
            <span className="text-xs text-zinc-500 mt-1 font-mono">No spam, direct contact only</span>
          </div>

          {/* Item 3: Social Profiles */}
          <div className="rounded-2xl border border-white/10 bg-obsidian-900/60 p-6 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2 text-zinc-400">
              <span className="text-xs font-mono uppercase tracking-wider">Social Profiles</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Twitter className="h-3 w-3" /> X
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Instagram className="h-3 w-3" /> Instagram
              </a>
              <a
                href={PERSONAL_INFO.socials.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
              >
                <span>@</span> Threads
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
