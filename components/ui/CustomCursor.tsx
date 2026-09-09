"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable custom cursor on mobile/touch or if reduced motion is requested
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || window.innerWidth < 1024 || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, [role='button'], input, textarea, [data-interactive='true']")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Primary Dot - Snappy */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 mix-blend-difference"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Follower Ring - Physics Spring Damping */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/80 mix-blend-difference"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered ? "rgba(0, 243, 255, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(0, 243, 255, 1)" : "rgba(0, 243, 255, 0.6)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 220, mass: 0.2 }}
      />
    </>
  );
}
