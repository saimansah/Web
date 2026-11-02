import { useEffect, useMemo, useRef, useState } from "react";
import { KathmanduClock } from "./components/Clock";
import { CredentialCard } from "./components/CredentialCard";
import { HackerSequence } from "./components/HackerSequence";
import { MilestoneShowcase } from "./components/MilestoneShowcase";
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
        <div className="credential-footer reveal"><span>{credentials.length} CREDENTIALS AND RECORDS</span><span className="footer-rule" /><span>{fileCount} VERIFIED PDFS</span></div>
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
            <h2 id="outside-title">Life beyond a screen.</h2>
          </div>
          <p>My 3D electric SUV garage, 140 km/h cockpit, 5,116m Himalayan climb, and story-driven games.</p>
        </div>

        <MilestoneShowcase />
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
