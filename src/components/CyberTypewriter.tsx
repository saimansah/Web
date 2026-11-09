import { useEffect, useRef, useState, type CSSProperties } from "react";
import { soundFx } from "../audio/soundEffects";

interface CyberTypewriterProps {
  text: string;
  className?: string;
  speed?: number; // base ms per char
  delay?: number; // ms delay before starting
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  cursorColor?: string;
  cursorType?: "block" | "underscore";
  agentBadge?: string;
  enableSound?: boolean;
  replayOnView?: boolean;
}

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF!@#$<>//";

export function CyberTypewriter({
  text,
  className = "",
  speed = 22,
  delay = 0,
  tag = "span",
  cursorColor = "#00f0ff",
  cursorType = "underscore",
  agentBadge,
  enableSound = true,
  replayOnView = false,
}: CyberTypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeoutId: number | null = null;
    let cancelled = false;

    const startTyping = () => {
      setIsTyping(true);
      setIsComplete(false);
      setDisplayText("");

      let currentIndex = 0;
      let frame = 0;

      const step = () => {
        if (cancelled) return;

        if (currentIndex < text.length) {
          frame++;
          if (frame % 2 === 0) {
            currentIndex++;
            setDisplayText(text.slice(0, currentIndex));
            if (enableSound && currentIndex % 2 === 0) {
              soundFx.playTypewriterChirp();
            }
          } else {
            const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            setDisplayText(text.slice(0, currentIndex) + randomGlyph);
          }

          // Neural agent jitter: 14ms - 38ms variable latency
          const jitter = speed + (Math.random() * 24 - 8);
          timeoutId = window.setTimeout(step, Math.max(10, jitter));
        } else {
          setDisplayText(text);
          setIsTyping(false);
          setIsComplete(true);
        }
      };

      step();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current || replayOnView) {
            hasTriggeredRef.current = true;
            if (delay > 0) {
              timeoutId = window.setTimeout(startTyping, delay);
            } else {
              startTyping();
            }
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [text, speed, delay, enableSound, replayOnView]);

  const cursorSymbol = cursorType === "block" ? "█" : "_";

  const content = (
    <>
      {agentBadge && (
        <span className="agent-badge-prefix font-mono text-[9px] tracking-wider text-cyan-400/90 mr-2 uppercase">
          {agentBadge}
        </span>
      )}
      <span>{displayText || (hasTriggeredRef.current ? "" : text.slice(0, 1))}</span>
      <span
        className={`terminal-cursor${isTyping ? " is-typing" : ""}${isComplete ? " is-blinking" : ""}`}
        style={
          {
            color: cursorColor,
            textShadow: `0 0 10px ${cursorColor}`,
            display: "inline-block",
            transform: cursorType === "block" ? "scale(0.85)" : "none",
          } as CSSProperties
        }
        aria-hidden="true"
      >
        {cursorSymbol}
      </span>
    </>
  );

  const sharedProps = {
    ref: containerRef as any,
    className: `cyber-typewriter ${className}`,
    "aria-label": text,
  };

  switch (tag) {
    case "h1":
      return <h1 {...sharedProps}>{content}</h1>;
    case "h2":
      return <h2 {...sharedProps}>{content}</h2>;
    case "h3":
      return <h3 {...sharedProps}>{content}</h3>;
    case "p":
      return <p {...sharedProps}>{content}</p>;
    case "div":
      return <div {...sharedProps}>{content}</div>;
    default:
      return <span {...sharedProps}>{content}</span>;
  }
}
