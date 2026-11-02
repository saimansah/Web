import { useEffect, useRef } from "react";
import { credentials, type Credential } from "../data";

interface CredentialCardProps {
  credential: Credential;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="arrow-icon">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

export function CredentialCard({ credential }: CredentialCardProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const openLabel = `Open ${credential.title} ${credential.files.length === 1 ? "certificate" : "documents"}`;

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!details.open) return;
      const target = event.target;
      if (target instanceof Node && !details.contains(target)) {
        details.open = false;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <article
      className={`credential-card reveal${credential.featured ? " credential-featured" : ""}`}
      data-category={credential.category}
    >
      <div className="credential-topline">
        <span className="credential-number">{credential.number} / {credentials.length}</span>
        <span className="credential-note">{credential.note}</span>
      </div>

      <div className="issuer-line">
        {credential.issuerLogo ? (
          <img className="issuer-logo" src={credential.issuerLogo} alt={`${credential.issuer} logo`} loading="lazy" />
        ) : (
          <span className="issuer-mark" aria-hidden="true">{credential.issuerMark}</span>
        )}
        <span className="issuer-name">{credential.issuer}</span>
      </div>

      <h3>{credential.title}</h3>
      <div className="credential-bottom">
        <span className="credential-count-label">
          {credential.files.length === 1 ? "1 PDF" : `${credential.files.length} PDFs`}
        </span>
        {credential.files.length === 1 ? (
          <a
            className="credential-open"
            href={credential.files[0].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={openLabel}
            title={openLabel}
          >
            <ArrowIcon />
          </a>
        ) : (
          <details ref={detailsRef} className="credential-files">
            <summary aria-label={openLabel} title={openLabel}>
              <ArrowIcon />
            </summary>
            <div className="credential-file-menu" aria-label={`${credential.title} PDFs`}>
              {credential.files.map((file) => (
                <a
                  key={file.href}
                  href={file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (detailsRef.current) detailsRef.current.open = false;
                  }}
                >
                  <span>{file.label}</span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
