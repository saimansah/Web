/* ==========================================================================
   SAIMAN SAH PORTFOLIO — ULTRA-PREMIUM INTERACTIVE ANIMATION ENGINE
   Magnetic cursors, glitch reveals, parallax depth, scramble text,
   smooth section transitions, interactive hover FX, and more.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =====================================================================
  // 1. CUSTOM CYBER CURSOR TRAIL — glowing dot follows mouse with decay
  // =====================================================================
  const cursorTrail = (() => {
    const TRAIL_LENGTH = 12;
    const dots = [];

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = document.createElement('div');
      dot.className = 'cyber-cursor-dot';
      dot.style.cssText = `
        position: fixed; pointer-events: none; z-index: 99999;
        width: ${8 - i * 0.5}px; height: ${8 - i * 0.5}px;
        border-radius: 50%;
        background: rgba(0, 243, 255, ${0.7 - i * 0.05});
        box-shadow: 0 0 ${6 - i * 0.4}px rgba(0, 243, 255, ${0.5 - i * 0.04});
        transition: transform 0.05s ease;
        will-change: transform;
        opacity: 0;
      `;
      document.body.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = -100, mouseY = -100;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dots.forEach(d => d.el.style.opacity = '1');
      }
    });

    document.addEventListener('mouseleave', () => {
      visible = false;
      dots.forEach(d => d.el.style.opacity = '0');
    });

    function update() {
      let prevX = mouseX, prevY = mouseY;
      dots.forEach((dot, i) => {
        const speed = 0.35 - i * 0.02;
        dot.x += (prevX - dot.x) * speed;
        dot.y += (prevY - dot.y) * speed;
        dot.el.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;
        prevX = dot.x;
        prevY = dot.y;
      });
      requestAnimationFrame(update);
    }
    update();
  })();


  // =====================================================================
  // 2. TEXT SCRAMBLE EFFECT — cyber glitch text reveal on scroll
  // =====================================================================
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#@$%&01';
      this.queue = [];
      this.frame = 0;
      this.frameRequest = null;
      this.resolve = null;
    }

    setText(newText) {
      const oldText = this.el.textContent;
      const length = Math.max(oldText.length, newText.length);
      return new Promise(resolve => {
        this.resolve = resolve;
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 30);
          const end = start + Math.floor(Math.random() * 30);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
      });
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0; i < this.queue.length; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        if (this.resolve) this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(() => this.update());
        this.frame++;
      }
    }
  }

  // Apply scramble to section titles on scroll
  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.scrambled) {
        entry.target.dataset.scrambled = 'true';
        const scramble = new TextScramble(entry.target);
        scramble.setText(entry.target.textContent);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title h2, .hero-name').forEach(el => {
    scrambleObserver.observe(el);
  });


  // =====================================================================
  // 3. MAGNETIC BUTTON EFFECT — buttons attract towards cursor
  // =====================================================================
  document.querySelectorAll('.cyber-btn, .gateway-option-card, .spec-tab-btn, .filter-pill').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease-out';
    });
  });


  // =====================================================================
  // 4. PARALLAX DEPTH LAYERS — subtle mouse-driven parallax on hero
  // =====================================================================
  const heroSection = document.querySelector('.hero-card');
  if (heroSection) {
    const heroText = heroSection.querySelector('.hero-text');
    const heroAvatar = heroSection.querySelector('.hero-avatar-box');

    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      if (heroText) {
        heroText.style.transform = `translate(${x * 8}px, ${y * 4}px)`;
      }
      if (heroAvatar) {
        heroAvatar.style.transform = `translate(${-x * 12}px, ${-y * 6}px)`;
      }
    });
  }


  // =====================================================================
  // 5. STAGGERED CARD ENTRANCE ANIMATIONS — cascade reveal children
  // =====================================================================
  const cascadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(
          '.dni-feature-card, .skill-box, .edu-item, .c-item, .game-item, .travel-pill, .stat-counter-card'
        );
        children.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(30px) scale(0.95)';
          setTimeout(() => {
            child.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0) scale(1)';
          }, 100 + i * 80);
        });
        cascadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.dni-grid, .skills-grid, .edu-list, .contact-info, .game-achievements-list, .travel-tags-wrapper, .stat-counters-grid').forEach(el => {
    cascadeObserver.observe(el);
  });


  // =====================================================================
  // 6. GLOW-ON-HOVER SPOTLIGHT — radial glow follows mouse on cards
  // =====================================================================
  document.querySelectorAll('.section-card, .hero-card, .game-card, .garage-card, .travel-card, .c-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });


  // =====================================================================
  // 7. NAVBAR ACTIVE LINK HIGHLIGHT — tracks scroll position
  // =====================================================================
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });


  // =====================================================================
  // 8. SMOOTH PROGRESS BAR ON NAVBAR — scroll progress indicator
  // =====================================================================
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.appendChild(progressBar);
  }

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  // =====================================================================
  // 9. CLICK SHOCKWAVE — expanding ring on interactive element clicks
  // =====================================================================
  document.addEventListener('click', (e) => {
    const interactive = e.target.closest('.cyber-btn, .social-chip, .gateway-option-card, .spec-tab-btn, .filter-pill, .icon-btn');
    if (!interactive) return;

    const ring = document.createElement('div');
    ring.className = 'click-shockwave';
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 700);
  });


  // =====================================================================
  // 10. HOVER PARTICLE BURST — tiny particles fly out of hovered cards
  // =====================================================================
  function createParticleBurst(x, y, count = 6) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hover-particle';
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const distance = 40 + Math.random() * 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  }

  document.querySelectorAll('.dni-feature-card, .skill-box, .game-item, .stat-counter-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });


  // =====================================================================
  // 11. BADGE COUNTER TICK ANIMATION — numbers increment with sound
  // =====================================================================
  const tickObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.ticked) {
        entry.target.dataset.ticked = 'true';
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;

        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) {
            clearInterval(interval);
            el.textContent = target;
            el.classList.add('counter-done');
          }
        }, 30);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    tickObserver.observe(el);
  });


  // =====================================================================
  // 12. SMOOTH PAGE LOAD ENTRANCE — cinematic fade-in orchestration
  // =====================================================================
  document.body.classList.add('page-loaded');

  const heroElements = document.querySelectorAll('.hero-card .badge-pill, .hero-card .hero-name, .hero-card .hero-subtitle, .hero-card .cyber-hud-card, .hero-card .hero-btns, .hero-card .avatar-card');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    setTimeout(() => {
      el.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 120);
  });

});
