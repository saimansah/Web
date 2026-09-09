"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Tablet,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { useDevice } from "@/hooks/useDevice";
import { copyToClipboard } from "@/lib/utils";

export function MobileDock() {
  const device = useDevice();
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const success = await copyToClipboard(PERSONAL_INFO.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Only show on client when mobile/tablet is detected or viewport is small
  if (!device.isMounted || (!device.isMobile && !device.isTablet && device.screenWidth >= 1024)) {
    return null;
  }

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 mx-auto max-w-md pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-cyan-500/30 bg-obsidian-950/90 p-2.5 backdrop-blur-2xl shadow-glass-lg shadow-cyan-950/40"
            >
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  {device.isMobile ? (
                    <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
                  ) : (
                    <Tablet className="h-3.5 w-3.5 text-cyan-400" />
                  )}
                  <span className="font-semibold">{device.label}</span>
                  <span className="text-zinc-600">&bull;</span>
                  <span className="text-emerald-400">Adaptive UI</span>
                </div>

                <button
                  onClick={() => setCollapsed(true)}
                  className="p-1 rounded text-zinc-400 hover:text-white"
                  aria-label="Collapse mobile bar"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {/* One-Tap Copy Email */}
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 py-2.5 px-3 text-cyan-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs font-mono font-medium">Email Me</span>
                    </>
                  )}
                </button>

                {/* Direct LinkedIn */}
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 px-3 text-zinc-200 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-mono font-medium">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          ) : (
            /* Collapsed Floating Pill */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex justify-end"
            >
              <button
                onClick={() => setCollapsed(false)}
                className="flex items-center gap-2 rounded-full border border-cyan-500/40 bg-obsidian-950/90 px-3.5 py-2 text-xs font-mono text-cyan-300 backdrop-blur-xl shadow-glass-md"
              >
                <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
                <span>Mobile Dock</span>
                <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
