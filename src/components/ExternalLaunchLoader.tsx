import { useEffect, useState, useRef } from "react";
import { soundFx } from "../audio/soundEffects";

interface ExternalLaunchLoaderProps {
  url: string | null;
  label?: string;
  onClose: () => void;
}

export function ExternalLaunchLoader({ url, label, onClose }: ExternalLaunchLoaderProps) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!url) {
      setProgress(0);
      return;
    }

    soundFx.playWhoosh();
    const duration = 850; // ms transition delay
    const startTime = performance.now();

    const frame = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      setProgress(Math.floor(t * 100));

      if (t < 1) {
        timerRef.current = requestAnimationFrame(frame);
      } else {
        // Complete delay & launch target
        soundFx.playClick();
        window.open(url, "_blank", "noopener,noreferrer");
        onClose();
      }
    };

    timerRef.current = requestAnimationFrame(frame);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleAbort();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [url, onClose]);

  if (!url) return null;

  const handleAbort = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    soundFx.playModalClose();
    onClose();
  };

  const handleInstantProceed = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    soundFx.playClick();
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  let hostname = url;
  try {
    hostname = new URL(url).hostname;
  } catch {
    // fallback
  }

  return (
    <div
      className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-[#05060a]/90 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Opening external website"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0c1322]/98 via-[#070b14]/98 to-[#04060a] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,240,255,0.25),inset_0_0_30px_rgba(0,240,255,0.08)]">
        {/* Glowing top line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Header telemetry */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 tracking-wider">
          <span className="flex items-center gap-2 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            OUTBOUND PROTOCOL // LAUNCHING
          </span>
          <span className="text-zinc-500">DELAY BUFFER</span>
        </div>

        {/* Central Graphic radar / sweep */}
        <div className="my-6 flex flex-col items-center justify-center text-center">
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            {/* Spinning reticle */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed animate-[spin_5s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-violet-400 border-l-transparent animate-[spin_2s_linear_infinite]" />
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-mono text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              {progress}%
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Connecting to {label || hostname}
          </h3>
          <p className="mt-1 text-xs font-mono text-cyan-300/80 truncate max-w-sm">
            {url}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10 p-[1px] mb-6">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 rounded-full shadow-[0_0_12px_#00f0ff] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleAbort}
            className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5"
          >
            <span>✕ Cancel</span>
            <kbd className="hidden sm:inline text-[10px] text-zinc-500">[Esc]</kbd>
          </button>

          <button
            type="button"
            onClick={handleInstantProceed}
            className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold font-mono text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>Proceed Now ↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
