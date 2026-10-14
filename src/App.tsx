import { useEffect, useMemo, useRef, useState } from "react";
import { KathmanduClock } from "./components/Clock";
import { CredentialCard } from "./components/CredentialCard";
import { HackerSequence } from "./components/HackerSequence";
import { credentialFilters, credentials, skills, socialLinks, type CredentialCategory } from "./data";

const email = "me@saimansah.com.np";
const roles = ["Software developer", "Founder at Saiman Innovations", "Chairperson at AI Alliance"];

function OrbitMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="orbit-mark">
      <circle cx="20" cy="20" r="12" />
      <ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(-32 20 20)" />
      <circle className="orbit-mark-core" cx="20" cy="20" r="3.2" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="arrow-icon">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

function useReveal(revision: string) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [revision]);
}

function useHashlessNavigation() {
  useEffect(() => {
    const scrollToSection = (id: string, behavior: ScrollBehavior) => {
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior, block: "start" });
      if (id === "main-content") target.focus({ preventScroll: true });
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    };

    let pendingTarget = "";
    try {
      pendingTarget = window.sessionStorage.getItem("portfolio-scroll-target") ?? "";
      if (pendingTarget) window.sessionStorage.removeItem("portfolio-scroll-target");
    } catch {
      // The homepage still works if browser storage is unavailable.
    }
    const initialHash = window.location.hash;
    const initialFrame = pendingTarget
      ? window.requestAnimationFrame(() => scrollToSection(pendingTarget, "instant"))
      : initialHash
        ? window.requestAnimationFrame(() => scrollToSection(decodeURIComponent(initialHash.slice(1)), "instant"))
        : 0;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const source = event.target;
      if (!(source instanceof Element)) return;
      const link = source.closest<HTMLAnchorElement>('a[data-scroll-target], a[href^="#"]');
      if (!link) return;
      const id = link.dataset.scrollTarget ?? decodeURIComponent(link.hash.slice(1));
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      scrollToSection(id, behavior);
    };

    document.addEventListener("click", onClick);
    return () => {
      if (initialFrame) window.cancelAnimationFrame(initialFrame);
      document.removeEventListener("click", onClick);
    };
  }, []);
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <HackerSequence>
     
      <div className="hero-intro">
        <p className="eyebrow"><span className="eyebrow-number">01</span> / INTRODUCING</p>
        <h1>SAIMAN<br className="hero-title-break" /> <span>SAH</span></h1>
        <p className="hero-description">I build software, explore AI, and learn by making.</p>
        <p className="hero-role"><span className="live-dot" />{roles[roleIndex]}</p>
      </div>

      <div className="hero-bottom">
        <div className="hero-scroll">
          <span className="scroll-line" />
          <span className="eyebrow">Scroll Down</span>
        </div>
        <KathmanduClock />
      </div>


    </HackerSequence>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label"><span>{number}</span> / {children}</p>;
}

function AboutSection() {
  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-title">
      <div className="section-shell">
        <div className="section-heading reveal">
          <SectionLabel number="02">ABOUT</SectionLabel>
          <h2 id="about-title">Curious by nature.<br /><span>Builder by choice.</span></h2>
          <p>I’m Saiman, a software developer from Kathmandu. I like making useful things and learning what comes next.</p>
        </div>

        <div className="about-grid">
          <article className="info-card education-card reveal">
            <div className="card-kicker"><span className="card-symbol">01</span><span>EDUCATION</span></div>
            <h3>Science and computer science.</h3>
            <div className="education-row"><div><strong>Higher Secondary (+2)</strong><span>Science · Computer Science</span></div><b>3.42<span> / 4</span></b></div>
            <div className="education-row"><div><strong>Secondary Education (SEE)</strong><span>Nepal</span></div><b>3.86<span> / 4</span></b></div>
          </article>

          <article className="info-card leadership-card reveal">
            <div className="card-kicker"><span className="card-symbol">02</span><span>WHAT I DO</span></div>
            <h3>Build. Connect. Keep learning.</h3>
            <div className="role-row"><span className="role-icon">↗</span><div><strong>Founder</strong><span>Saiman Innovations</span></div></div>
            <div className="role-row"><span className="role-icon">✳</span><div><strong>Chairperson</strong><span>AI Alliance</span></div></div>
          </article>

          <article className="info-card language-card reveal">
            <div className="card-kicker"><span className="card-symbol">03</span><span>LANGUAGES</span></div>
            <h3>People first.</h3>
            <p>I can speak in English, Nepali, and Hindi.</p>
            <div className="language-list"><span>English</span><span>नेपाली</span><span>हिंदी</span></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="page-section skills-section" aria-labelledby="skills-title">
      <div className="section-shell">
        <div className="section-heading section-heading-row reveal">
          <div>
            <SectionLabel number="03">TOOLS I USE</SectionLabel>
            <h2 id="skills-title">My workbench.</h2>
          </div>
          <p>Good tools help turn a clear idea into something people can use.</p>
        </div>

        <div className="skills-grid">
          {skills.map((group, index) => (
            <article key={group.label} className="skill-card reveal">
              <div className="skill-card-top"><span>0{index + 1}</span><span className="skill-orbit" aria-hidden="true">◌</span></div>
              <h3>{group.label}</h3>
              <div className="skill-tags">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div className="skills-footer reveal"><span className="skill-line" /><span>Always learning, always building.</span><span className="skill-line" /></div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | CredentialCategory>("all");
  const visibleCredentials = useMemo(
    () => activeFilter === "all" ? credentials : credentials.filter((item) => item.category === activeFilter),
    [activeFilter],
  );
  const fileCount = credentials.reduce((total, credential) => total + credential.files.length, 0);

  useReveal(activeFilter);

  return (
    <section id="credentials" className="page-section credential-section" aria-labelledby="credential-title">
      <div className="section-shell">
        <div className="section-heading credential-heading reveal">
          <div>
            <SectionLabel number="04">CERTIFICATES</SectionLabel>
            <h2 id="credential-title">Things I’ve achieved.</h2>
            <p>Courses and credentials in software, AI, security, and digital tools.</p>
          </div>
          <div className="credential-total"><strong>{fileCount}</strong><span>PDF FILES<br />IN {credentials.length} CARDS</span></div>
        </div>

        <div className="credential-toolbar reveal">
          <div className="credential-filters" role="group" aria-label="Filter certificates">
            {credentialFilters.map((filter) => {
              const count = filter.id === "all" ? credentials.length : credentials.filter((item) => item.category === filter.id).length;
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-button${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}<span>{count}</span>
                </button>
              );
            })}
          </div>
          <span className="visible-count" aria-live="polite">{visibleCredentials.length} SHOWN</span>
        </div>

        <div className="credential-grid">
          {visibleCredentials.map((credential) => <CredentialCard key={credential.number} credential={credential} />)}
        </div>
        <div className="credential-footer reveal"><span>14 CREDENTIALS AND RECORDS</span><span className="footer-rule" /><span>17 OPENABLE PDFS</span></div>
      </div>
    </section>
  );
}

function MountainArt() {
  return (
    <svg className="mountain-art" viewBox="0 0 760 360" role="img" aria-label="Topographic lines marking Tilicho Lake at 5,116 meters">
      <defs>
        <linearGradient id="mountain-line" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f1a5ff" stopOpacity="0.78" />
          <stop offset="1" stopColor="#9b70ff" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="mountain-glow"><stop stopColor="#f4b3ff" stopOpacity="0.82" /><stop offset="1" stopColor="#b36bff" stopOpacity="0" /></radialGradient>
      </defs>
      <g className="topo-grid">
        <path d="M0 60H760M0 120H760M0 180H760M0 240H760M0 300H760M80 0V360M180 0V360M280 0V360M380 0V360M480 0V360M580 0V360M680 0V360" />
      </g>
      <g className="topo-lines">
        <path d="M-20 310C80 285 106 232 177 236S273 301 342 249 440 112 529 123s133 60 251-14" />
        <path d="M-18 332C82 307 112 254 183 258s93 51 160 10 104-128 188-127 137 45 250-26" />
        <path d="M-25 287C70 264 102 213 170 214s101 72 171 22 103-126 190-117 137 63 246-3" />
        <path d="M-19 263C78 241 107 188 174 190s105 69 174 15 104-111 186-100 138 70 250 11" />
        <path d="M-12 232C84 207 115 157 179 165s105 56 174 6S455 62 532 77s137 84 248 33" />
        <path d="M-17 201C82 177 119 127 184 136s102 46 169-3S450 34 526 48s145 89 257 49" />
      </g>
      <path className="mountain-route" d="M120 277 205 255 265 270 322 214 376 224 434 167 489 178 545 115 608 125 682 70" />
      <circle className="mountain-halo" cx="545" cy="115" r="44" fill="url(#mountain-glow)" />
      <circle className="mountain-point" cx="545" cy="115" r="4" />
      <path className="mountain-guide" d="M545 115V303H116" />
      <text x="557" y="105">5,116 M</text>
      <text x="558" y="127">TILICHO LAKE</text>
    </svg>
  );
}

function OutsideSection() {
  return (
    <section id="outside" className="page-section outside-section" aria-labelledby="outside-title">
      <div className="section-shell">
        <div className="section-heading section-heading-row reveal">
          <div>
            <SectionLabel number="05">OUTSIDE WORK</SectionLabel>
            <h2 id="outside-title">Life beyond a screen.</h2>
          </div>
          <p>Mountains, electric cars, and stories worth playing.</p>
        </div>

        <div className="outside-grid">
          <article className="outside-card mountain-card reveal">
            <div className="outside-card-heading"><span>NEPAL / ANNAPURNA REGION</span><span>01 — TREKKING</span></div>
            <MountainArt />
            <div className="mountain-copy"><div><p className="eyebrow">A HIGH POINT</p><h3>Tilicho Lake</h3><p>I reached 5,116 meters on foot in the Himalayas.</p></div><strong>5,116<span>METERS</span></strong></div>
          </article>

          <article className="outside-card vehicle-card reveal">
            <div className="outside-card-heading"><span>MY GARAGE</span><span>02 — ELECTRIC</span></div>
            <h3>Electric cars.</h3>
            <p>I own and drive two electric SUVs.</p>
            <div className="vehicle-list">
              <div><span className="vehicle-brand">BYD</span><strong>Atto 3</strong><span>Electric SUV</span><ArrowUpRight /></div>
              <div><span className="vehicle-brand">MG</span><strong>ZS EV</strong><span>Electric SUV</span><ArrowUpRight /></div>
            </div>
          </article>

          <article className="outside-card gaming-card reveal">
            <div className="outside-card-heading"><span>PC + PLAYSTATION 5</span><span>03 — GAMES</span></div>
            <div className="game-orbit" aria-hidden="true"><span className="game-orbit-ring" /><span className="game-core">PLAY<br />MODE</span><span className="game-orbit-dot" /></div>
            <h3>Good stories.<br />Good games.</h3>
            <p>Story-driven games, team play, and driving simulators.</p>
            <div className="game-tags"><span>PC</span><span>PS5</span><span>SIM RACING</span></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToast("Email copied");
    } catch {
      setToast("Use the email link to reach me");
    }
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-intro">
          <a className="brand" href="/" data-scroll-target="home" aria-label="Saiman Sah, back to top"><OrbitMark /><span className="brand-copy"><strong>SAIMAN SAH</strong><small>KATHMANDU · NEPAL</small></span></a>
          <p>Software, AI, and ideas from Kathmandu.</p>
        </div>

        <div className="footer-socials">
          <p className="section-label"><span>LET’S CONNECT</span></p>
          <div className="social-list">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Saiman Sah on ${link.label}`}>
                <img src={link.icon} alt="" loading="lazy" /><span>{link.label}</span><ArrowUpRight />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-email">
          <p className="section-label"><span>EMAIL</span></p>
          <a className="email-link" href={`mailto:${email}`}>{email}<ArrowUpRight /></a>
          <button className="copy-email" type="button" onClick={copyEmail}>Copy email</button>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <div className="footer-bottom-copy"><span>© {new Date().getFullYear()} Saiman Sah</span><span>27.7172° N · 85.3240° E</span></div>
        <a className="footer-domain" href="/" aria-label="saimansah.com.np home">saimansah.com.np</a>
        <a href="/" data-scroll-target="home">Back to top ↑</a>
      </div>
      <div className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">{toast}</div>
    </footer>
  );
}

export function App() {
  useHashlessNavigation();

  return (
    <>
      <a className="skip-link" href="/" data-scroll-target="main-content">Skip to content</a>
      <ScrollProgress />
      <main id="main-content" className="w-full" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <CredentialsSection />
        <OutsideSection />
      </main>
      <Footer />
    </>
  );
}
