"use client";

import React from "react";
import Image from "next/image";
import {
  Mountain,
  Gauge,
  Gamepad2,
  Compass,
} from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export function BeyondCode() {
  return (
    <section id="beyond" className="relative py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-400 mb-3">
            <Compass className="h-3.5 w-3.5" />
            <span>PERSONAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Beyond The Code:{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Trekking, Cars &amp; Gaming
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Outside of coding and security, I spend time mountain trekking across Nepal, driving electric cars, and playing games.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: 4,200m Wilderness Trek */}
          <TiltCard
            maxTilt={8}
            glowColor="rgba(245, 158, 11, 0.15)"
            className="p-7 flex flex-col justify-between border-amber-500/20"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  <Mountain className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  PEAK ELEVATION
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                4,200m Mountain Trek
              </h3>
              <p className="text-xs font-mono text-amber-400/90 mb-4">
                ~13,780 Feet &bull; Himalayas, Nepal
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Passionate about hiking through high Himalayan mountain trails and wilderness passes.
                Reached a personal high altitude of 4,200 meters.
              </p>
            </div>

            <div className="rounded-xl bg-obsidian-950/60 p-3.5 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Highest Point Reached</span>
              <span className="text-base font-bold font-mono text-amber-300">4,200 M</span>
            </div>
          </TiltCard>

          {/* Card 2: Automotive Garage */}
          <TiltCard
            maxTilt={8}
            glowColor="rgba(16, 185, 129, 0.15)"
            className="p-7 flex flex-col justify-between border-emerald-500/20"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  <Gauge className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
                  2 EVS OWNED
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                Electric Cars &amp; Tech
              </h3>
              <p className="text-xs font-mono text-emerald-400/90 mb-4">
                BYD Atto 3 &amp; MG ZS EV
              </p>

              {/* Two Cars List */}
              <div className="space-y-3 mb-6">
                <div className="rounded-xl border border-emerald-500/20 bg-obsidian-950/70 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      BYD Atto 3
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      Blade Battery &bull; 130 km/h Top Speed
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Owned
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-obsidian-950/70 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      MG ZS EV
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      Electric Smart SUV &bull; Fast Charging
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Owned
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-obsidian-950/60">
              <Image
                src="/assets/byd_atto3.png"
                alt="BYD Atto 3"
                fill
                sizes="300px"
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </TiltCard>

          {/* Card 3: PC & PS5 Gaming Battlestation */}
          <TiltCard
            maxTilt={8}
            glowColor="rgba(139, 92, 246, 0.15)"
            className="p-7 flex flex-col justify-between border-purple-500/20"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-purple-400/10 text-purple-300 border border-purple-400/30">
                  GAMING
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                PC &amp; PS5 Gaming
              </h3>
              <p className="text-xs font-mono text-purple-400/90 mb-4">
                Story Campaigns &amp; Simulators
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                I enjoy playing story-driven campaigns, tactical team games, and driving simulators on my custom PC and PS5.
              </p>
            </div>

            <div className="rounded-xl bg-obsidian-950/60 p-3.5 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Platforms</span>
              <span className="text-xs font-bold font-mono text-purple-300">CUSTOM PC + PS5</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
