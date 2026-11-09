import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { soundFx } from "../audio/soundEffects";

interface CyberPreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING SAIMAN_SYSTEMS KERNEL...",
  "COMPILING 3D SHADER PIPELINE & STARFIELD...",
  "MOUNTING 3D CYLINDRICAL VAULT [21/21]...",
  "CALIBRATING SPATIAL AUDIO & KINETIC SENSORS...",
  "HANDSHAKE COMPLETE · ACCESS GRANTED",
];

export function CyberPreloader({ onComplete }: CyberPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Realistic easing counter from 0 to 100
    const startTime = performance.now();
    const duration = 1450; // ms

    let animFrame = 0;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Custom cubic out curve for snappiness
      const ease = 1 - Math.pow(1 - t, 3);
      const current = Math.floor(ease * 100);
      setProgress(current);

      const nextLog = Math.min(BOOT_LOGS.length - 1, Math.floor(t * BOOT_LOGS.length));
      setLogIndex(nextLog);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        triggerFinish();
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    const handleSkip = () => {
      triggerFinish();
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, []);

  const triggerFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    soundFx.playBoot();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Fade out center content first
    if (centerContentRef.current) {
      tl.to(centerContentRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }

    // Split shutter wipe (top up, bottom down)
    if (shutterTopRef.current && shutterBottomRef.current) {
      tl.to(
        shutterTopRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
      tl.to(
        shutterBottomRef.current,
        {
          yPercent: 100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "<"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col justify-between overflow-hidden select-none pointer-events-auto"
      aria-label="System Loading"
    >
      {/* Top Shutter Panel */}
      <div
        ref={shutterTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#06070c] border-b border-cyan-500/20 z-10"
        style={{ willChange: "transform" }}
      />
      {/* Bottom Shutter Panel */}
      <div
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#06070c] border-t border-cyan-500/20 z-10"
        style={{ willChange: "transform" }}
      />

      {/* Cyber Grid Overlay behind shutters */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Central Interactive Content */}
      <div
        ref={centerContentRef}
        className="relative z-30 flex flex-col justify-between w-full h-full p-6 sm:p-10 max-w-7xl mx-auto"
      >
        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
            <span className="text-white font-semibold">SAIMAN SAH // PORTFOLIO</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-zinc-500">
            <span>27.7172° N · 85.3240° E</span>
            <span>·</span>
            <span className="text-cyan-400/80">KATHMANDU</span>
          </div>
        </div>

        {/* Center 3D Gyroscope & Percentage Display */}
        <div className="my-auto flex flex-col items-center justify-center text-center py-8">
          {/* 3D Holographic Gyroscope Ring */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-6">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed animate-[spin_8s_linear_infinite]" />
            {/* Middle counter-rotating ring with glowing notches */}
            <div className="absolute inset-3 rounded-full border-2 border-violet-500/40 border-t-cyan-400 animate-[spin_4s_linear_infinite_reverse] shadow-[0_0_20px_rgba(0,240,255,0.18)]" />
            {/* Inner pulsing core */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-cyan-400/30 backdrop-blur-sm border border-cyan-400/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] animate-pulse">
              <span className="text-xs font-mono font-bold text-cyan-300">
                {progress}%
              </span>
            </div>

            {/* Orbiting particle dots */}
            <div className="absolute w-full h-full animate-[spin_6s_linear_infinite]">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            </div>
            <div className="absolute w-full h-full animate-[spin_4.5s_linear_infinite_reverse]">
              <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
            </div>
          </div>

          {/* Big Monospace Digits */}
          <div className="flex items-baseline justify-center gap-1 font-mono tracking-tighter">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_30px_rgba(0,240,255,0.2)]">
              {progress.toString().padStart(2, "0")}
            </span>
            <span className="text-2xl sm:text-3xl font-mono text-cyan-400 font-bold">
              %
            </span>
          </div>

          {/* Real-time Telemetry Boot Message */}
          <div className="mt-4 flex items-center gap-2 h-6 px-4 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <p className="text-xs font-mono text-cyan-300 tracking-wider uppercase truncate max-w-[280px] sm:max-w-md">
              {BOOT_LOGS[logIndex]}
            </p>
          </div>

          {/* Segmented Progress Bar */}
          <div className="mt-8 w-64 sm:w-80 h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-400 rounded-full shadow-[0_0_12px_#00f0ff] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Bar Hints */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800/80 text-zinc-300">
              SPACE
            </span>
            <span>OR CLICK TO SKIP INTRO</span>
          </div>
          <span className="text-zinc-600">
            3D VAULT // WEBGL 2.0 // HIGH PERFORMANCE
          </span>
        </div>
      </div>
    </div>
  );
}
