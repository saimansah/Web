import { useEffect, useRef, useState } from "react";

export function MagneticCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant 1:1 pinpoint synchronization with zero lag and perfect center alignment
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const vault = target.closest(".revolver-vault");
        const credCard = target.closest(".credential-card, .revolver-card");
        const clickable = target.closest("a, button, [role='button'], input, [data-cursor]");

        if (vault) {
          setLabel("DRAG ↔");
          setIsHovered(true);
        } else if (credCard) {
          setLabel("INSPECT");
          setIsHovered(true);
        } else if (clickable) {
          setLabel(null);
          setIsHovered(true);
        } else {
          setLabel(null);
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);
      // Snappy, natural magnetic lerp
      currentX += (mouseX - currentX) * 0.28;
      currentY += (mouseY - currentY) * 0.28;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Pinpoint — centered exactly on the cursor tip */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[999999] shadow-[0_0_8px_#00f0ff] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      />

      {/* Trailing Magnetic Follower Aura — perfectly centered via translate(-50%, -50%) */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[999998] transition-[width,height,background-color,border-color,opacity] duration-180 ease-out flex items-center justify-center font-mono text-[9px] font-bold tracking-wider text-black will-change-transform ${
          label
            ? "w-20 h-20 bg-cyan-400 border border-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.6)] opacity-95"
            : isHovered
            ? "w-12 h-12 border-2 border-cyan-400 bg-cyan-500/20 shadow-[0_0_16px_rgba(0,240,255,0.35)] opacity-90"
            : "w-8 h-8 border border-cyan-400/40 bg-cyan-400/5 opacity-60"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        {label && <span className="drop-shadow-sm select-none">{label}</span>}
      </div>
    </>
  );
}
