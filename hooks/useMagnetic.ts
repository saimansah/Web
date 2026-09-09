"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticOptions {
  threshold?: number;
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const {
    threshold = 0.4,
    strength = 0.35,
    damping = 15,
    stiffness = 150,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping, stiffness, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    rawX.set(distanceX * strength);
    rawY.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return {
    ref,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  };
}
