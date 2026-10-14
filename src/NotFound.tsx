import { useEffect, useState } from "react";
import { Starfield } from "./components/Starfield";

function OrbitMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="orbit-mark">
      <circle cx="20" cy="20" r="12" />
      <ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(-32 20 20)" />
      <circle className="orbit-mark-core" cx="20" cy="20" r="3.2" />
    </svg>
  );
}

function SignalWindow() {
  return (
    <div className="not-found-window" aria-hidden="true">
      <div className="not-found-window-bar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>LOCAL ROUTE</span>
        <span className="window-status"><i /> OFFLINE</span>
      </div>
      <div className="not-found-window-screen">
        <div className="window-coordinate">27°42′ N&nbsp; / &nbsp;85°19′ E</div>
        <div className="window-route-art">
          <svg viewBox="0 0 360 220" role="presentation">
            <path className="route-grid" d="M28 38H332M28 82H332M28 126H332M28 170H332M62 18V198M122 18V198M182 18V198M242 18V198M302 18V198" />
            <path className="route-line" d="M37 159C80 159 82 72 129 72S177 143 213 143 253 58 322 58" />
            <circle className="route-node route-node-start" cx="37" cy="159" r="5" />
            <circle className="route-node route-node-mid" cx="213" cy="143" r="5" />
            <g className="route-end" transform="translate(322 58)">
              <circle r="14" />
              <path d="M-4-4L4 4M4-4L-4 4" />
            </g>
          </svg>
          <span className="window-number">404</span>
        </div>
        <div className="window-caption"><span>DESTINATION</span><strong>NOT FOUND</strong></div>
      </div>
      <div className="not-found-window-foot"><span>CONNECTION ENDED</span><span>—</span><span>TRY A KNOWN PATH</span></div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M4 3h9v9" />
    </svg>
  );
}

export function NotFound() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.title = "Page not found | Saiman Sah";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.append(robots);
    }
    robots.content = "noindex, follow";
  }, []);

  return (
    <main className="not-found">
      <Starfield paused={paused} />
      <header className="topbar">
        <a className="brand" href="/" aria-label="Saiman Sah, home">
          <OrbitMark />
          <span className="brand-copy"><strong>SAIMAN SAH</strong><small>KATHMANDU · NEPAL</small></span>
        </a>
        <button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          <span className="motion-toggle-dot" />{paused ? "Play stars" : "Pause stars"}
        </button>
      </header>

      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-copy">
          <p className="not-found-code"><span /> ROUTE NOT FOUND&nbsp; / &nbsp;404</p>
          <h1 id="not-found-title">This page<br />isn’t here.</h1>
          <p className="not-found-description">The address may be wrong. Head home or browse the certificates.</p>
          <nav className="not-found-links" aria-label="Helpful pages">
            <a className="not-found-home" href="/">Back to home <ArrowIcon /></a>
            <a
              className="not-found-certificates"
              href="/"
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                try {
                  window.sessionStorage.setItem("portfolio-scroll-target", "credentials");
                } catch {
                  // The home link remains useful if browser storage is unavailable.
                }
              }}
            >
              View certificates <ArrowIcon />
            </a>
          </nav>
          <p className="not-found-location">KATHMANDU, NEPAL <span>27.7172° N&nbsp; 85.3240° E</span></p>
        </div>
        <div className="not-found-art"><SignalWindow /></div>
      </section>

      <footer className="not-found-footer"><span>SAIMAN SAH</span><span>SOFTWARE · AI · KATHMANDU</span></footer>
    </main>
  );
}
