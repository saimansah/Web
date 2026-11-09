import { useEffect, useRef, useState } from "react";
import { soundFx } from "../audio/soundEffects";
import { credentials, type Credential } from "../data";

interface CredentialModalProps {
  credential: Credential | null;
  onClose: () => void;
  onOpenFullscreenPdf?: (url: string, title: string, issuer: string) => void;
}

export function CredentialModal({ credential, onClose, onOpenFullscreenPdf }: CredentialModalProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (credential) {
      setActiveFileIndex(0);
      soundFx.playModalOpen();
      // Lock background scroll while modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          soundFx.playModalClose();
          onClose();
        }
      };
      window.addEventListener("keydown", onKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [credential, onClose]);

  if (!credential) return null;

  const activeFile = credential.files[activeFileIndex] || credential.files[0];

  return (
    <div
      className="credential-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-credential-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playModalClose();
          onClose();
        }
      }}
    >
      <div ref={modalRef} className="credential-modal-card">
        {/* Modal Topbar */}
        <div className="credential-modal-header">
          <div className="credential-modal-meta">
            <span className="modal-telemetry-tag">VERIFIED CREDENTIAL // {credential.number} OF {credentials.length}</span>
            <span className="modal-category-badge">{credential.category.toUpperCase()}</span>
          </div>
          <button
            type="button"
            className="credential-modal-close-btn"
            onClick={() => {
              soundFx.playModalClose();
              onClose();
            }}
            aria-label="Close certificate modal"
          >
            <span>✕</span>
            <kbd>ESC</kbd>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="credential-modal-body">
          <div className="credential-modal-info">
            <div className="modal-issuer-lockup">
              {credential.issuerLogo ? (
                <img
                  className="modal-issuer-logo"
                  src={credential.issuerLogo}
                  alt={`${credential.issuer} logo`}
                  loading="lazy"
                />
              ) : (
                <span className="modal-issuer-mark" aria-hidden="true">
                  {credential.issuerMark}
                </span>
              )}
              <div>
                <strong className="modal-issuer-name">{credential.issuer}</strong>
                <span className="modal-issuer-sub">{credential.note}</span>
              </div>
            </div>

            <h2 id="modal-credential-title" className="modal-credential-heading">
              {credential.title}
            </h2>

            <div className="modal-verification-status">
              <span className="modal-verified-shield">✓</span>
              <div>
                <strong>Officially Verified Document</strong>
                <p>Authentic certificate issued to Saiman Sah, verified against official educational transcripts and issuer records.</p>
              </div>
            </div>

            {credential.files.length > 1 && (
              <div className="modal-file-selector">
                <span className="modal-file-selector-label">Available Documents:</span>
                <div className="modal-file-tabs">
                  {credential.files.map((file, idx) => (
                    <button
                      key={file.href}
                      type="button"
                      className={`modal-file-tab${activeFileIndex === idx ? " is-active" : ""}`}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveFileIndex(idx);
                      }}
                    >
                      {file.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-action-row">
              <button
                type="button"
                className="modal-primary-btn cursor-pointer"
                onClick={() => {
                  soundFx.playClick();
                  if (onOpenFullscreenPdf) {
                    onOpenFullscreenPdf(activeFile.href, `${credential.title} (${activeFile.label})`, credential.issuer);
                  } else {
                    window.open(activeFile.href, "_blank");
                  }
                }}
              >
                <span>Open PDF (With Return Button) ↗</span>
              </button>
              <a
                href={activeFile.href}
                download
                className="modal-secondary-btn"
                onClick={() => soundFx.playClick()}
              >
                <span>Download PDF ↓</span>
              </a>
            </div>
          </div>

          {/* Interactive PDF Preview Pane */}
          <div className="credential-modal-preview">
            <div className="modal-preview-bar">
              <span className="preview-file-name">{activeFile.label}.pdf</span>
              <span className="preview-indicator">PDF RENDERER ACTIVE</span>
            </div>
            <div className="modal-preview-frame-wrap">
              <object
                data={`${activeFile.href}#toolbar=0&navpanes=0`}
                type="application/pdf"
                className="modal-pdf-object"
                title={`${credential.title} PDF Document`}
              >
                <div className="modal-pdf-fallback">
                  <div className="pdf-fallback-icon">📄</div>
                  <h3>PDF Document Preview</h3>
                  <p>{activeFile.label}</p>
                  <a
                    href={activeFile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-primary-btn"
                  >
                    View Document in New Tab ↗
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
