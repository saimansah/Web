import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFx } from "./audio/soundEffects";
import { KathmanduClock } from "./components/Clock";
import { CredentialCard } from "./components/CredentialCard";
import { CredentialModal } from "./components/CredentialModal";
import { CyberHologramCore3D } from "./components/CyberHologramCore3D";
import { CyberPreloader } from "./components/CyberPreloader";
import { CyberTypewriter } from "./components/CyberTypewriter";
import { CylindricalVault3D } from "./components/CylindricalVault3D";
import { ExternalLaunchLoader } from "./components/ExternalLaunchLoader";
import { HackerSequence } from "./components/HackerSequence";
import { MagneticCursor } from "./components/MagneticCursor";
import { MilestoneShowcase } from "./components/MilestoneShowcase";
import { PdfViewerModal } from "./components/PdfViewerModal";
import {
  credentialFilters,
  credentials,
  skills,
  socialLinks,
  type Credential,
  type CredentialCategory,
} from "./data";

gsap.registerPlugin(ScrollTrigger);

const email = "me@saimansah.com.np";
const roles = ["Software developer", "Founder at Saiman Innovations", "Chairperson at AI Alliance"];

type Language = "en" | "ne" | "hi";

function OrbitMark() {
  return (
    <img
      src="/assets/logo.png"
      alt="Saiman Sah Logo"
      className="orbit-mark"
      width={34}
      height={34}
      loading="eager"
    />
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

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    // GSAP ScrollTrigger Magnetic Spring Reveals for About cards
    const ctx = gsap.context(() => {
      const aboutCards = document.querySelectorAll<HTMLElement>(".about-grid .info-card");
      if (aboutCards.length > 0) {
        gsap.fromTo(
          aboutCards,
          { y: 80, skewY: 5, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".about-grid",
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // GSAP Diagonal Modular Server Blade Sliders for Workbench skills
      const skillCards = document.querySelectorAll<HTMLElement>(".skills-grid .skill-card");
      if (skillCards.length >= 3) {
        gsap.fromTo(
          skillCards[0],
          { x: -50, y: -30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: ".skills-grid", start: "top 82%", once: true },
          }
        );
        gsap.fromTo(
          skillCards[1],
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: { trigger: ".skills-grid", start: "top 82%", once: true },
          }
        );
        gsap.fromTo(
          skillCards[2],
          { x: 50, y: -30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: { trigger: ".skills-grid", start: "top 82%", once: true },
          }
        );
      }
    });

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
    return () => {
      ctx.revert();
      observer.disconnect();
    };
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
      // storage unavailable
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
      soundFx.playClick();
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


function Hero({ activeLanguage }: { activeLanguage: Language }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <HackerSequence activeLanguage={activeLanguage}>
      <div className="hero-intro">
        <p className="eyebrow">
          <span className="eyebrow-number">01</span> / <CyberTypewriter text="INTRODUCING SAIMAN SAH" speed={16} agentBadge="[STATUS: VERIFIED_RECORD]" />
        </p>
        <h1>
          SAIMAN<br className="hero-title-break" /> <span>SAH</span>
        </h1>
        <p className="hero-description">
          {activeLanguage === "ne" ? (
            <CyberTypewriter text="म सफ्टवेयर विकास गर्छु, एआई अन्वेषण गर्छु र काम गर्दै सिक्छु।" speed={22} />
          ) : activeLanguage === "hi" ? (
            <CyberTypewriter text="मैं सॉफ्टवेयर बनाता हूँ, एआई सीखता हूँ और काम करते हुए आगे बढ़ता हूँ।" speed={22} />
          ) : (
            <CyberTypewriter text="I build software, explore AI, and learn by making." speed={22} />
          )}
        </p>
        <p className="hero-role">
          <span className="live-dot" />
          {roles[roleIndex]}
        </p>
      </div>

      <div className="hero-bottom">
        <div className="hero-scroll">
          <span className="scroll-line" />
          <span className="eyebrow">Scroll Down </span>
        </div>
        <KathmanduClock />
      </div>
    </HackerSequence>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {children}
    </p>
  );
}

function AboutSection({
  activeLanguage,
  onLanguageChange,
}: {
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}) {
  const [activeGreeting, setActiveGreeting] = useState<string>("Hello, welcome to my digital space.");

  const handleLanguageHover = (lang: Language) => {
    soundFx.playHover();
    if (lang === "ne") setActiveGreeting("नमस्ते, मेरो डिजिटल संसारमा स्वागत छ।");
    else if (lang === "hi") setActiveGreeting("नमस्ते, मेरी डिजिटल दुनिया में आपका स्वागत है।");
    else setActiveGreeting("Hello, welcome to my digital space.");
  };

  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-title">
      <div className="section-shell">
        <div className="section-heading reveal">
          <SectionLabel number="02">ABOUT MATRIX</SectionLabel>
          <h2 id="about-title">
            <CyberTypewriter text="Curious by nature." speed={20} /><br />
            <span><CyberTypewriter text="Builder by choice." delay={400} speed={20} /></span>
          </h2>
          <p>
            I’m Saiman, a software developer from Kathmandu. I like making useful things, architecting high-performance systems, and exploring what comes next.
          </p>
        </div>

        <div className="about-grid">
          <article className="info-card education-card reveal">
            <div className="card-kicker">
              <span className="card-symbol">01</span>
              <span>ACADEMIC TELEMETRY</span>
            </div>
            <h3>
              <CyberTypewriter text="Science & Computer Science." speed={20} />
            </h3>

            <div className="education-row">
              <div>
                <strong>Higher Secondary (+2)</strong>
                <span>Science · Computer Science</span>
                <div className="gpa-progress-track">
                  <div className="gpa-progress-fill" style={{ width: "85.5%" }} />
                </div>
              </div>
              <b>
                3.42<span> / 4.00</span>
              </b>
            </div>

            <div className="education-row">
              <div>
                <strong>Secondary Education (SEE)</strong>
                <span>Nepal</span>
                <div className="gpa-progress-track">
                  <div className="gpa-progress-fill" style={{ width: "96.5%" }} />
                </div>
              </div>
              <b>
                3.86<span> / 4.00</span>
              </b>
            </div>
          </article>

          <article className="info-card leadership-card reveal">
            <div className="card-kicker">
              <span className="card-symbol">02</span>
              <span>LEADERSHIP INITIATIVES</span>
            </div>
            <h3>
              <CyberTypewriter text="Build. Connect. Keep learning." speed={20} />
            </h3>
            <div className="role-row">
              <span className="role-icon">↗</span>
              <div>
                <strong>Founder</strong>
                <span>Saiman Innovations</span>
              </div>
            </div>
            <div className="role-row">
              <span className="role-icon">✳</span>
              <div>
                <strong>Chairperson</strong>
                <span>AI Alliance</span>
              </div>
            </div>
          </article>

          <article className="info-card language-card reveal">
            <div className="card-kicker">
              <span className="card-symbol">03</span>
              <span>NATURAL LANGUAGES</span>
            </div>
            <h3>
              <CyberTypewriter text="People first." speed={20} />
            </h3>
            <p className="language-greeting-preview">
              <CyberTypewriter text={activeGreeting} speed={18} replayOnView />
            </p>
            <div className="language-list">
              <button
                type="button"
                className={`lang-pill${activeLanguage === "en" ? " is-active" : ""}`}
                onMouseEnter={() => handleLanguageHover("en")}
                onClick={() => {
                  soundFx.playClick();
                  onLanguageChange("en");
                }}
              >
                <span>English</span>
                <span className="pill-wave" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`lang-pill${activeLanguage === "ne" ? " is-active" : ""}`}
                onMouseEnter={() => handleLanguageHover("ne")}
                onClick={() => {
                  soundFx.playClick();
                  onLanguageChange("ne");
                }}
              >
                <span>नेपाली</span>
                <span className="pill-wave" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`lang-pill${activeLanguage === "hi" ? " is-active" : ""}`}
                onMouseEnter={() => handleLanguageHover("hi")}
                onClick={() => {
                  soundFx.playClick();
                  onLanguageChange("hi");
                }}
              >
                <span>हिंदी</span>
                <span className="pill-wave" aria-hidden="true" />
              </button>
            </div>
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
            <SectionLabel number="03">ENGINEERING WORKBENCH</SectionLabel>
            <h2 id="skills-title">
              <CyberTypewriter text="My workbench." speed={20} />
            </h2>
          </div>
          <p>
            Good tools help turn a clear idea into something people can use. Always learning, always building.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group, index) => (
            <article key={group.label} className="skill-card reveal">
              <div className="skill-card-top">
                <span>0{index + 1}</span>
                <span className="skill-orbit" aria-hidden="true">◌</span>
              </div>
              <h3>
                <CyberTypewriter text={group.label} speed={20} />
              </h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 3D Holographic Interactive Artifact (Trionn + BunqLabs inspired) */}
        <div className="hologram-workbench-card reveal mt-10 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0c1322]/95 via-[#070b14]/98 to-[#04060a] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(0,240,255,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
              <span>3D HOLOGRAPHIC QUANTUM MATRIX</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Interactive 3D Geometric Engine
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Synthesizing real-time 3D physics, refractive shaders, and spatial micro-interactions. Drag with your cursor to spin the crystalline core in full 3D space.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">Three.js WebGL</span>
              <span className="px-2.5 py-1 rounded-md border border-violet-400/30 bg-violet-500/10 text-violet-300">Kinetic Physics</span>
              <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-zinc-300">Shader Materials</span>
              <span className="text-zinc-500 text-[10px]">· DRAG OR HOVER TO INTERACT</span>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-[360px] h-[280px] sm:h-[320px] flex items-center justify-center">
            <CyberHologramCore3D />
          </div>
        </div>

        <div className="skills-footer reveal">
          <span className="skill-line" />
          <span><CyberTypewriter text="Always learning, always building." speed={24} /></span>
          <span className="skill-line" />
        </div>
      </div>
    </section>
  );
}

function CredentialsSection({
  onInspectCredential,
  onOpenPdf,
}: {
  onInspectCredential: (c: Credential) => void;
  onOpenPdf: (pdfUrl: string, title: string, issuer: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | CredentialCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cylinder" | "grid">("cylinder");

  const visibleCredentials = useMemo(() => {
    let list = activeFilter === "all" ? credentials : credentials.filter((item) => item.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.note.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, searchQuery]);

  const fileCount = credentials.reduce((total, credential) => total + credential.files.length, 0);

  useReveal(`${activeFilter}-${searchQuery}`);

  return (
    <section id="credentials" className="page-section credential-section" aria-labelledby="credential-title">
      <div className="section-shell">
        <div className="section-heading credential-heading reveal">
          <div>
            <SectionLabel number="04">AUTHENTICATED CREDENTIAL VAULT</SectionLabel>
            <h2 id="credential-title">
              <CyberTypewriter text="Things I’ve achieved." speed={20} />
            </h2>
            <p>{credentials.length} verified credentials and records across cloud engineering, AI governance, and digital systems.</p>
          </div>
          <div className="credential-total">
            <strong>{fileCount}</strong>
            <span>
              PDF FILES
              <br />
              IN {credentials.length} CARDS
            </span>
          </div>
        </div>

        <div className="credential-toolbar reveal">
          {/* Dual-Mode 3D Revolver / Searchable Grid Toggle */}
          <div className="vault-mode-switch" role="group" aria-label="Credential display mode">
            <button
              type="button"
              className={`vault-mode-btn${viewMode === "cylinder" ? " is-active" : ""}`}
              onClick={() => {
                soundFx.playClick();
                setViewMode("cylinder");
                setTimeout(() => ScrollTrigger.refresh(), 50);
              }}
            >
              <span className="vault-mode-dot" />
              <span>3D Cylindrical Vault</span>
            </button>
            <button
              type="button"
              className={`vault-mode-btn${viewMode === "grid" ? " is-active" : ""}`}
              onClick={() => {
                soundFx.playClick();
                setViewMode("grid");
                setTimeout(() => ScrollTrigger.refresh(), 50);
              }}
            >
              <span>Searchable Grid</span>
            </button>
          </div>

          <div className="credential-filters" role="group" aria-label="Filter certificates">
            {credentialFilters.map((filter) => {
              const count =
                filter.id === "all"
                  ? credentials.length
                  : credentials.filter((item) => item.category === filter.id).length;
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-button${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveFilter(filter.id);
                  }}
                >
                  {filter.label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="credential-search-wrap">
            <input
              type="search"
              className="credential-search-input"
              placeholder={`Search ${credentials.length} credentials...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search certificates by title or issuer"
            />
            <span className="visible-count" aria-live="polite">
              {visibleCredentials.length} SHOWN
            </span>
          </div>
        </div>

        {viewMode === "cylinder" ? (
          <CylindricalVault3D
            credentials={visibleCredentials}
            onInspect={onInspectCredential}
            onOpenPdf={onOpenPdf}
          />
        ) : (
          <div className="credential-grid">
            {visibleCredentials.map((credential, index) => (
              <CredentialCard
                key={credential.number}
                credential={credential}
                index={index}
                onInspect={onInspectCredential}
                onOpenPdf={onOpenPdf}
              />
            ))}
          </div>
        )}

        <div className="credential-footer reveal">
          <span>{credentials.length} CREDENTIALS AND RECORDS</span>
          <span className="footer-rule" />
          <span>{fileCount} VERIFIED PDFS</span>
        </div>
      </div>
    </section>
  );
}

function OutsideSection() {
  return (
    <section id="outside" className="page-section outside-section" aria-labelledby="outside-title">
      <div className="section-shell">
        <div className="section-heading section-heading-row reveal">
          <div>
            <SectionLabel number="05">OUTSIDE WORK</SectionLabel>
            <h2 id="outside-title">
              <CyberTypewriter text="Life beyond a screen." speed={20} />
            </h2>
          </div>
          <p>My 3D electric SUV garage, 140 km/h cockpit simulator, 5,116m Himalayan climb, and story-driven games.</p>
        </div>

        <MilestoneShowcase />
      </div>
    </section>
  );
}

function Footer({
  isMuted,
  onToggleSound,
}: {
  isMuted: boolean;
  onToggleSound: () => void;
}) {
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      soundFx.playSuccess();
      setToast("Email copied to clipboard");
    } catch {
      setToast("Use the email link to reach me");
    }
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2500);
  };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-intro">
          <a className="brand" href="/" data-scroll-target="home" aria-label="Saiman Sah, back to top">
            <OrbitMark />
            <span className="brand-copy">
              <strong>SAIMAN SAH</strong>
              <small>KATHMANDU · NEPAL</small>
            </span>
          </a>
          <p>Software, AI, and ideas from Kathmandu.</p>
        </div>

        <div className="footer-socials">
          <p className="section-label">
            <span>LET’S CONNECT</span>
          </p>
          <div className="social-list">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Saiman Sah on ${link.label}`}
                onClick={() => soundFx.playClick()}
              >
                <img src={link.icon} alt="" loading="lazy" />
                <span>{link.label}</span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-email">
          <p className="section-label">
            <span>EMAIL</span>
          </p>
          <a
            className="email-link"
            href={`mailto:${email}`}
            onClick={() => soundFx.playClick()}
          >
            {email}
            <ArrowUpRight />
          </a>
          <button className="copy-email" type="button" onClick={copyEmail}>
            Copy email
          </button>
        </div>
      </div>

      <div className="section-shell footer-bottom">
        <div className="footer-bottom-copy">
          <span>© {new Date().getFullYear()} Saiman Sah</span>
          <span>27.7172° N · 85.3240° E</span>
        </div>
        <button
          type="button"
          onClick={onToggleSound}
          className={`topbar-audio-btn${!isMuted ? " is-active" : ""}`}
          aria-label={isMuted ? "Unmute procedural audio" : "Mute audio"}
          title={isMuted ? "Unmute procedural audio" : "Audio synthesizer active"}
        >
          <span className="topbar-audio-dot" />
          <span className="audio-btn-label">{isMuted ? "Audio Off" : "Audio On"}</span>
        </button>
        <a className="footer-domain" href="/" aria-label="saimansah.com.np home">
          saimansah.com.np
        </a>
        <a href="/" data-scroll-target="home" onClick={() => soundFx.playClick()}>
          Back to top ↑
        </a>
      </div>
      <div className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </footer>
  );
}

export function App() {
  useHashlessNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [fullscreenPdf, setFullscreenPdf] = useState<{ url: string; title: string; issuer?: string } | null>(null);
  const [externalLaunch, setExternalLaunch] = useState<{ url: string; label?: string } | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundFx.isMuted);

  // Check URL query parameter ?pdf= on mount so shared or direct links open with return button
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pdf = params.get("pdf");
      if (pdf) {
        setFullscreenPdf({
          url: pdf,
          title: "Verified Document",
          issuer: "Saiman Sah Portfolio Vault",
        });
      }
    } catch {
      // url search param unavailable
    }
  }, []);

  // Global interceptor for outbound links: show loading delay screen
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("a[href^='http']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          e.preventDefault();
          e.stopPropagation();
          setExternalLaunch({
            url: href,
            label: target.textContent?.trim() || url.hostname,
          });
        }
      } catch {
        // invalid URL
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => document.removeEventListener("click", handleAnchorClick, { capture: true });
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    soundFx.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) soundFx.playClick();
  };

  const handleLanguageChange = (lang: Language) => {
    soundFx.playClick();
    setActiveLanguage(lang);
  };

  return (
    <>
      {/* Best Cyberpunk Agency Loading Screen */}
      {isLoading && <CyberPreloader onComplete={() => setIsLoading(false)} />}

      {/* Interactive Magnetic 3D Cursor Follower */}
      <MagneticCursor />

      <a className="skip-link" href="/" data-scroll-target="main-content">
        Skip to content
      </a>
      <ScrollProgress />
      <main id="main-content" className="w-full" tabIndex={-1}>
        <Hero activeLanguage={activeLanguage} />
        <AboutSection activeLanguage={activeLanguage} onLanguageChange={handleLanguageChange} />
        <SkillsSection />
        <CredentialsSection
          onInspectCredential={(c) => setSelectedCredential(c)}
          onOpenPdf={(url, title, issuer) => setFullscreenPdf({ url, title, issuer })}
        />
        <OutsideSection />
      </main>
      <Footer isMuted={isMuted} onToggleSound={handleToggleSound} />

      {/* In-Page Credential Modal */}
      <CredentialModal
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
        onOpenFullscreenPdf={(url, title, issuer) => setFullscreenPdf({ url, title, issuer })}
      />

      {/* In-App Fullscreen PDF Viewer with Return to Website Button */}
      {fullscreenPdf && (
        <PdfViewerModal
          pdfUrl={fullscreenPdf.url}
          title={fullscreenPdf.title}
          issuer={fullscreenPdf.issuer}
          onClose={() => setFullscreenPdf(null)}
        />
      )}

      {/* Outbound Link Delay Loading Screen */}
      {externalLaunch && (
        <ExternalLaunchLoader
          url={externalLaunch.url}
          label={externalLaunch.label}
          onClose={() => setExternalLaunch(null)}
        />
      )}
    </>
  );
}
