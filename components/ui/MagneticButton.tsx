"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic({
    strength: 0.3,
    damping: 14,
    stiffness: 160,
  });

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 overflow-hidden group select-none cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 border border-cyan-400/30",
    secondary:
      "bg-obsidian-800 text-zinc-100 border border-white/10 hover:border-cyan-500/50 hover:bg-obsidian-700 shadow-glass-sm",
    outline:
      "bg-transparent text-zinc-300 border border-white/15 hover:border-cyan-400 hover:text-white hover:bg-white/5",
    ghost:
      "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const content = (
    <>
      {/* Dynamic light reflection effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (asAnchor && href) {
    return (
      <motion.div
        ref={ref}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <a
          href={href}
          target={target}
          rel={rel}
          data-interactive="true"
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <button
        onClick={onClick}
        data-interactive="true"
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {content}
      </button>
    </motion.div>
  );
}
