import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFx } from "../audio/soundEffects";
import { type Credential } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface CylindricalVault3DProps {
  credentials: Credential[];
  onInspect: (credential: Credential) => void;
  onOpenPdf?: (pdfUrl: string, title: string, issuer: string) => void;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-2">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

export function CylindricalVault3D({ credentials, onInspect, onOpenPdf }: CylindricalVault3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  // Floating continuous index for smooth 60fps interpolation
  const [virtualIndex, setVirtualIndex] = useState(0);
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const total = credentials.length;

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const dragInitialIndexRef = useRef(0);

  // Center active card index (rounded)
  const activeIndex = Math.max(0, Math.min(total - 1, Math.round(virtualIndex)));
  const activeCred = credentials[activeIndex] || credentials[0];
  const lastPlayedIndexRef = useRef(0);

  // Play subtle tick when a new card docks into center
  useEffect(() => {
    if (activeIndex !== lastPlayedIndexRef.current) {
      lastPlayedIndexRef.current = activeIndex;
      soundFx.playHover();
    }
  }, [activeIndex]);

  // 1. SCROLL-DRIVEN CYLINDER ROTATION via GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container || total <= 1) return;

    // Pin through the credential vault section so scrolling naturally spins the cylinder
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 12%",
      end: "+=2200",
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!isDraggingRef.current) {
          // As user scrolls down, progress goes 0 -> 1
          // Target index progresses from 0 -> (total - 1)
          const target = self.progress * (total - 1);
          targetIndexRef.current = target;
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, [total]);

  // 2. Smooth Lerp Animation Loop for ultra-fluid movement
  useEffect(() => {
    let animId = 0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const diff = targetIndexRef.current - currentIndexRef.current;
      if (Math.abs(diff) > 0.001) {
        currentIndexRef.current += diff * 0.12;
        setVirtualIndex(currentIndexRef.current);
      }
    };

    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Jump to specific card index
  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      targetIndexRef.current = clamped;
      soundFx.playHover();
    },
    [total]
  );

  const next = useCallback(() => {
    goTo(Math.min(total - 1, Math.round(targetIndexRef.current) + 1));
  }, [goTo, total]);

  const prev = useCallback(() => {
    goTo(Math.max(0, Math.round(targetIndexRef.current) - 1));
  }, [goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Mouse tilt on the active center card
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = activeCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty("--tilt-rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const onPointerLeave = () => {
    const card = activeCardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  // Drag / swipe navigation on stage
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaXRef.current = 0;
    dragInitialIndexRef.current = targetIndexRef.current;
  };

  const onPointerDrag = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaXRef.current = delta;
    // Dragging right pulls cards from left (decrease index); dragging left pulls cards from right (increase index)
    const indexDelta = -delta / 180;
    targetIndexRef.current = Math.max(0, Math.min(total - 1, dragInitialIndexRef.current + indexDelta));
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Snap to nearest integer on release
    targetIndexRef.current = Math.round(targetIndexRef.current);
    if (Math.abs(dragDeltaXRef.current) > 30) {
      soundFx.playWhoosh();
    }
  };

  // Direct wheel scroll on stage
  const onWheel = (e: React.WheelEvent) => {
    // Only capture horizontal or vertical scroll if directly over the vault
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const step = (e.deltaY > 0 ? 1 : -1) * 0.45;
      targetIndexRef.current = Math.max(0, Math.min(total - 1, targetIndexRef.current + step));
    }
  };

  // TRUE 3D CYLINDRICAL GEOMETRY COMPUTATION
  // Cards enter from the RIGHT (+X), curve across center (X=0, Z=0), and curve away to the LEFT (-X)
  const renderedCards = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const spacingAngle = isMobile ? 0.38 : 0.44; // in radians (~25 deg)
    const cylinderRadius = isMobile ? 640 : 860; // in px

    return credentials.map((cred, idx) => {
      // Delta from current continuous virtual scroll position
      const delta = idx - virtualIndex;
      const absDelta = Math.abs(delta);

      // Render up to ~3.5 cards to the left and right
      const isVisible = absDelta <= 3.6;
      const isCenter = absDelta < 0.48;

      let tx = 0;
      let tz = -1200;
      let ry = 0;
      let scale = 0.6;
      let opacity = 0;
      let zIndex = 1;

      if (isVisible) {
        const theta = delta * spacingAngle;
        // Parametric cylinder coordinates:
        // X = R * sin(theta)  -> positive on right, negative on left
        // Z = R * (cos(theta) - 1) -> 0 at center, negative into screen on sides
        tx = Math.sin(theta) * cylinderRadius;
        tz = (Math.cos(theta) - 1) * cylinderRadius;
        // Rotation around Y axis aligns card tangentially along cylinder arc
        ry = -theta * (180 / Math.PI) * 0.86;

        scale = Math.max(0.65, 1.05 - absDelta * 0.11);
        opacity = Math.max(0.08, 1 - absDelta * 0.28);
        zIndex = Math.round(100 - absDelta * 22);
      }

      return {
        cred,
        idx,
        delta,
        absDelta,
        isVisible,
        isCenter,
        style: {
          transform: `translate3d(${tx.toFixed(1)}px, 0px, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
          opacity: opacity.toFixed(3),
          zIndex,
          pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
          visibility: isVisible ? ("visible" as const) : ("hidden" as const),
        },
      };
    });
  }, [credentials, virtualIndex]);

  return (
    <div
      ref={containerRef}
      className="revolver-vault relative w-full select-none py-8 overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerDrag}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
      aria-label="3D Cylindrical Certificate Revolver Vault"
    >
      {/* Dynamic Cylindrical Cyber Grid & Floor Horizon Reflections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.22)_0%,transparent_75%)] blur-2xl" />
        <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      {/* Real-time Scroll Guidance Banner */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-4 text-[11px] font-mono text-cyan-400 tracking-wider">
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
        <span className="uppercase font-semibold">
          SCROLL DOWN TO ADVANCE CARDS FROM RIGHT → LEFT IN 3D CYLINDER
        </span>
      </div>

      {/* 3D Scene Viewport */}
      <div
        ref={stageRef}
        className="revolver-stage relative mx-auto w-full max-w-5xl h-[470px] md:h-[510px] flex items-center justify-center [perspective:1900px] [transform-style:preserve-3d]"
      >
        {renderedCards.map(({ cred, idx, isCenter, isVisible, style }) => {
          if (!isVisible) return null;

          return (
            <div
              key={cred.number}
              ref={isCenter ? activeCardRef : undefined}
              className={`revolver-card absolute w-[300px] sm:w-[350px] md:w-[390px] min-h-[380px] md:min-h-[410px] rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-150 ease-out ${
                isCenter
                  ? "border border-cyan-400/80 bg-gradient-to-br from-[#121c2e]/98 via-[#0b121e]/98 to-[#060810] shadow-[0_25px_70px_rgba(0,240,255,0.25),inset_0_0_28px_rgba(0,240,255,0.14)] cursor-pointer ring-1 ring-cyan-400/60"
                  : "border border-white/10 bg-gradient-to-br from-[#12131d]/90 via-[#0a0b12]/95 to-[#06060a] shadow-2xl backdrop-blur-md cursor-pointer hover:border-cyan-400/50"
              }`}
              style={style}
              onPointerMove={isCenter ? onPointerMove : undefined}
              onPointerLeave={isCenter ? onPointerLeave : undefined}
              onClick={() => {
                if (isCenter) {
                  soundFx.playClick();
                  onInspect(cred);
                } else {
                  goTo(idx);
                }
              }}
            >
              {/* Top metadata line */}
              <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-zinc-400 tracking-wider">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  {cred.number} / {total}
                </span>
                <span className="text-zinc-500 truncate max-w-[170px] uppercase text-[9px]">{cred.note}</span>
              </div>

              {/* Issuer line */}
              <div className="mt-4 flex items-center gap-3">
                {cred.issuerLogo ? (
                  <img
                    src={cred.issuerLogo}
                    alt={`${cred.issuer} logo`}
                    className="h-7 max-w-[60px] object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-9 h-9 rounded-lg border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                    {cred.issuerMark}
                  </span>
                )}
                <span className="text-xs sm:text-sm font-semibold text-zinc-200 tracking-wide">{cred.issuer}</span>
              </div>

              {/* Certificate Title */}
              <div className="my-auto py-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug line-clamp-3">
                  {cred.title}
                </h3>
                <p className="mt-2 text-[11px] font-mono text-cyan-300/80 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-cyan-400">✓</span> [VERIFIED RECORD · {cred.category}]
                </p>
              </div>

              {/* Bottom action row */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  {cred.files.length === 1 ? "1 VERIFIED PDF" : `${cred.files.length} VERIFIED PDFS`}
                </span>

                <div className="flex items-center gap-2">
                  {/* Direct PDF Quick Open Button */}
                  {cred.files[0] && onOpenPdf && (
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-md border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-400/20 text-cyan-300 font-mono text-[10px] transition-colors"
                      title="View PDF with Return Button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        onOpenPdf(cred.files[0].href, cred.title, cred.issuer);
                      }}
                    >
                      View PDF ↗
                    </button>
                  )}

                  <button
                    type="button"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isCenter
                        ? "bg-cyan-400 text-black shadow-[0_0_18px_#00f0ff] hover:scale-110"
                        : "border border-white/20 bg-white/5 text-zinc-300 hover:border-cyan-400 hover:text-cyan-300"
                    }`}
                    aria-label={`Inspect ${cred.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      onInspect(cred);
                    }}
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Navigation Controls HUD */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 max-w-4xl mx-auto">
        {/* Previous / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="px-4 py-2 rounded-full border border-white/15 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
            aria-label="Previous certificate"
          >
            <span>←</span> PREV
          </button>
          <button
            type="button"
            onClick={next}
            className="px-4 py-2 rounded-full border border-white/15 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
            aria-label="Next certificate"
          >
            NEXT <span>→</span>
          </button>
        </div>

        {/* Center telemetry status indicator */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>CYLINDER DOCKED:</span>
          <strong className="text-white">
            {activeCred ? activeCred.number : "01"} / {total}
          </strong>
          <span className="text-zinc-600">·</span>
          <span className="text-cyan-400/90 truncate max-w-[180px]">{activeCred?.issuer}</span>
        </div>

        {/* Drag / Keyboard hint */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300">SCROLL</kbd>
          <span>OR</span>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300">→</kbd>
          <span>TO ROTATE</span>
        </div>
      </div>

      {/* Pagination Scrubber Dots */}
      <div className="mt-5 flex items-center justify-center flex-wrap gap-1.5 max-w-xl mx-auto px-4">
        {credentials.map((cred, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={cred.number}
              type="button"
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isCurrent
                  ? "w-7 h-2 bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
                  : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              title={`${cred.number}: ${cred.title}`}
              aria-label={`Jump to certificate ${cred.number}`}
              onClick={() => goTo(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
