import { useEffect, useRef } from "react";
import { soundFx } from "../audio/soundEffects";

interface PdfViewerModalProps {
  pdfUrl: string | null;
  title: string;
  issuer?: string;
  onClose: () => void;
}

export function PdfViewerModal({ pdfUrl, title, issuer, onClose }: PdfViewerModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pdfUrl) {
      soundFx.playModalOpen();
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = origOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [pdfUrl]);

  if (!pdfUrl) return null;

  const handleClose = () => {
    soundFx.playModalClose();
    onClose();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99990] flex flex-col bg-[#05060b] animate-[fadeIn_0.25s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`PDF Viewer: ${title}`}
    >
      {/* Top Interactive Control Bar */}
      <header className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-cyan-500/25 bg-[#080c16]/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        {/* BIG PROMINENT RETURN BUTTON */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full border-2 border-cyan-400 bg-cyan-500/15 hover:bg-cyan-400 text-cyan-300 hover:text-black font-mono text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Return to portfolio website"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>RETURN TO WEBSITE</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-black/40 text-cyan-200 group-hover:bg-black/20 group-hover:text-black">
              ESC
            </kbd>
          </button>
        </div>

        {/* Center Document Title & Verification */}
        <div className="hidden md:flex flex-col items-center text-center max-w-lg truncate">
          <span className="text-sm font-bold text-white tracking-wide truncate">
            {title}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            OFFICIALLY VERIFIED CERTIFICATE {issuer ? `· ${issuer}` : ""}
          </span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            download
            className="px-3 sm:px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5"
            onClick={() => soundFx.playClick()}
            title="Download PDF file"
          >
            <span>Download</span>
            <span className="hidden sm:inline">↓</span>
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-colors items-center gap-1.5"
            onClick={() => soundFx.playClick()}
            title="Open in separate tab"
          >
            <span>Open in Tab ↗</span>
          </a>

          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-red-500/20 hover:border-red-400 text-zinc-300 hover:text-red-300 flex items-center justify-center transition-colors"
            aria-label="Close PDF Viewer and return to website"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Interactive PDF Frame */}
      <main className="relative flex-1 w-full h-full bg-[#10121a] overflow-hidden">
        <object
          data={`${pdfUrl}#toolbar=1&navpanes=1`}
          type="application/pdf"
          className="w-full h-full border-none"
          title={`Verified Certificate PDF: ${title}`}
        >
          {/* Fallback for browsers that block inline PDF objects */}
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#07090e]">
            <div className="w-16 h-16 mb-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-3xl">
              📄
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400 max-w-md mb-6">
              Your browser does not support inline PDF embedding, or requires opening directly.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-semibold font-mono text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                View PDF in New Tab ↗
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-sm hover:bg-white/10"
              >
                ← Return to Website
              </button>
            </div>
          </div>
        </object>

        {/* Persistent Floating Return Pill at Bottom Left */}
        <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/50 bg-[#070a12]/90 backdrop-blur-md text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] font-mono text-xs shadow-2xl transition-all"
            aria-label="Return to portfolio website"
          >
            <span>←</span>
            <span className="font-semibold">Return to Website</span>
          </button>
        </div>
      </main>
    </div>
  );
}
