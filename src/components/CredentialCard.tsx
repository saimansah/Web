import { useEffect, useRef, useState } from "react";
import { soundFx } from "../audio/soundEffects";
import { credentials, type Credential } from "../data";

interface CredentialCardProps {
  credential: Credential;
  index?: number;
  onInspect?: (credential: Credential) => void;
  onOpenPdf?: (url: string, title: string, issuer: string) => void;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="arrow-icon">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

export function CredentialCard({ credential, index = 0, onInspect, onOpenPdf }: CredentialCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const openLabel = `Inspect ${credential.title} credential`;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [credential]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    card.style.setProperty("--tilt-rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const onPointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  // Trionn turn-by-turn stagger calculation
  const staggerDelay = `${(index % 4) * 85 + Math.min(3, Math.floor(index / 4)) * 45}ms`;

  return (
    <article
      ref={cardRef}
      className={`credential-card trionn-pop${isRevealed ? " is-popped" : ""}${
        credential.featured ? " credential-featured" : ""
      }`}
      style={{
        "--stagger-delay": staggerDelay,
      } as React.CSSProperties}
      data-category={credential.category}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerEnter={() => soundFx.playHover()}
      onClick={() => {
        soundFx.playClick();
        onInspect?.(credential);
      }}
    >
      <div className="credential-topline">
        <span className="credential-number">
          {credential.number} / {credentials.length}
        </span>
        <span className="credential-note">{credential.note}</span>
      </div>

      <div className="issuer-line">
        {credential.issuerLogo ? (
          <img
            className="issuer-logo"
            src={credential.issuerLogo}
            alt={`${credential.issuer} logo`}
            loading="lazy"
          />
        ) : (
          <span className="issuer-mark" aria-hidden="true">
            {credential.issuerMark}
          </span>
        )}
        <span className="issuer-name">{credential.issuer}</span>
      </div>

      <h3>{credential.title}</h3>

      <div className="credential-bottom">
        <span className="credential-count-label">
          {credential.files.length === 1 ? "1 VERIFIED PDF" : `${credential.files.length} VERIFIED PDFS`}
        </span>

        <div className="flex items-center gap-2">
          {credential.files[0] && onOpenPdf && (
            <button
              type="button"
              className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black transition-colors"
              title="View verified PDF with return button"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick();
                onOpenPdf(credential.files[0].href, credential.title, credential.issuer);
              }}
            >
              PDF ↗
            </button>
          )}

          <button
            type="button"
            className="credential-open"
            aria-label={openLabel}
            title={openLabel}
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              onInspect?.(credential);
            }}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
