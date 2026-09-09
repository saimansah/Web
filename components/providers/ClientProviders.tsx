"use client";

import React from "react";
import { useLenis } from "@/hooks/useLenis";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleField } from "@/components/canvas/ParticleField";
import { AmbientMesh } from "@/components/canvas/AmbientMesh";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Initialize Lenis Momentum Smooth Scroll synced with GSAP
  useLenis();

  return (
    <>
      {/* Dynamic Interactive Backgrounds */}
      <AmbientMesh />
      <ParticleField />
      
      {/* Magnetic Follower Cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      {children}
    </>
  );
}
