/* --- CLEAN URL HANDLER: Removes index.html from URL address bar --- */
(function cleanIndexUrl() {
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html') {
      const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/') + window.location.search + window.location.hash;
      window.history.replaceState(null, '', cleanPath);
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // --- DICTIONARY FOR ENGLISH AND NEPALI TRANSLATION ---
  const i18n = {
    en: {
      nav_about: "About",
      nav_exp: "Experience",
      nav_skills: "Skills",
      nav_edu: "Education",
      nav_contact: "Contact",
      nav_personal_about: "Beyond Code",
      nav_personal_garage: "Garage & Cars",
      nav_personal_gaming: "Gaming",
      btn_switch_mode: "Switch Mode",

      // GATEWAY MODAL TRANSLATIONS
      gateway_title: "Select Mode to Enter",
      gateway_subtitle: "Choose your path to explore professional technical accomplishments or personal gaming & garage highlights.",
      badge_pro_path: "PROFESSIONAL",
      title_pro_path: "Professional Portfolio",
      desc_pro_path: "Cybersecurity operations, software development, technical projects, and academic credentials.",
      btn_enter_pro: "Enter Professional Bio",

      badge_personal_path: "CARS & GAMING",
      title_personal_path: "Personal Life & Hobbies",
      desc_personal_path: "High-Altitude Trekking (4,200m / 13,780 ft record), BYD Atto 3 EV (130 km/h record), Land Rover Defender 110 dream, PC & PS5 Gaming.",
      btn_enter_personal: "Enter Personal Bio",
      hint_lang: "Change Language:",

      badge_role: "Ethical Hacker & Developer",
      hero_hi: "Hi, I'm",
      hero_tagline: "Developer | Ethical Hacker | Tech Enthusiast | Cybersecurity Researcher | Debugger",
      spotlight_badge: "PHILOSOPHY",
      spotlight_quote: "अन्तः अस्ति प्रारम्भः",
      spotlight_meaning: "End is Beginning",
      hero_bio: "100% Self-Learned Developer and Ethical Hacker specializing in cybersecurity research, system vulnerability assessment, and full-stack software development. Based in Nepal, I build, debug, and secure high-stakes digital applications.",
      info_location: "Location: Nepal 🇳🇵",
      info_dob: "DOB: July 21, 2008",
      info_dob_bs: "(B.S.: Shrawan 6, 2065 BS)",
      btn_contact_me: "Get in Touch",
      btn_view_exp: "View Experience",
      tag_leadership: "EXPERIENCE & LEADERSHIP",
      exp_heading: "Technical & Security Operations",

      pillar1_title: "Technical Leadership",
      pillar1_desc: "Led technical operations, managing project workflows, development architecture, and strategic execution across software initiatives.",
      pillar2_title: "Software Development & Debugging",
      pillar2_desc: "Directed complex software architecture, automated testing, and deep-level debugging to guarantee system stability and reliability.",
      pillar3_title: "Team Mentorship & Strategy",
      pillar3_desc: "Supervised developer teams, delegated technical responsibilities, and aligned software goals with core security standards.",
      pillar4_title: "Cybersecurity & Ethical Hacking",
      pillar4_desc: "Performed vulnerability research, security audits, root-cause threat mitigation, and penetration testing for digital systems.",
      pillar5_title: "Operational Security & Threat Analysis",
      pillar5_desc: "Managed operational security (OPSEC) protocols, encrypted communication channels, digital footprint protection, and secure network infrastructure.",

      tag_skills: "TECHNICAL FOCUS & SKILLS",
      skills_heading: "Core Technical Skills",
      skill1_title: "Software Development & Debugging",
      skill1_desc: "Building clean, functional code, troubleshooting errors, and optimizing performance.",
      skill2_title: "Cybersecurity & Ethical Hacking",
      skill2_desc: "Network security principles, system vulnerability assessments, and defensive security testing.",
      skill3_title: "Core Competencies",
      skill3_desc: "Technical Problem Solving, Systems Analysis, Team Leadership, and Project Coordination.",

      tag_edu: "EDUCATION",
      edu_heading: "Academic Qualifications",
      edu1_title: "Higher Secondary Education (+2 Science / Computer Science)",
      edu2_title: "Secondary Education Examination (SEE)",
      status_completed: "Completed",

      tag_contact: "GET IN TOUCH",
      contact_heading: "Contact Saiman Sah",
      lbl_location: "Location:",
      lbl_email: "Email:",
      lbl_phone: "Phone:",
      lbl_social: "Social Media:",
      ph_name: "Your Name",
      ph_email: "Your Email",
      ph_msg: "Your Message",
      btn_send: "Send Message",
      btn_terminal: "Terminal",
      msg_sent: "Thank you! Your message has been dispatched to me@saimansah.com.np.",

      // PERSONAL & GAMING PAGE TRANSLATIONS
      tag_personal_title: "BEYOND THE CODE",
      personal_hero_title: "Personal Life, Automotive & Gaming Universe",
      personal_hero_subtitle: "Exploring high-speed automotive performance, mastering epic gaming campaigns on PC & PS5, and crafting custom tech setups.",
      tag_garage: "GARAGE & AUTOMOTIVE",
      garage_heading: "My Automotive Passion",
      badge_current_ride: "CURRENT RIDE",
      car_atto3_title: "BYD Atto 3 (Electric SUV)",
      car_atto3_desc: "Current Car",

      atto3_speed_record: "Highest Speed Recorded by Me: 130 km/h",

      badge_dream_car: "DREAM VEHICLE",
      car_defender_title: " Land Rover Defender 110",
      car_defender_desc: "1st Dream Car",
      defender_goal: "Ultimate Ownership Goal",

      tag_gaming: "GAMING PORTFOLIO",
      gaming_heading: "Gaming Accomplishments (PC & PlayStation 5)",
      pc_platform_tag: "All Completed on Custom PC ",
      gta5_stat: "Completed 3 Times",
      gta5_desc: "Full 100% story mode campaigns conquered across three separate playthroughs.",
      rdr2_stat: "Completed 2 Times",
      rdr2_desc: "Completed Arthur Morgan & John Marston's epic open-world saga twice.",
      hitman_stat: "Mastered & Completed",
      hitman_desc: "Stealth assassin operative campaigns fully cleared with Silent Assassin ratings.",
      cod_stat: "ALL Series Completed",
      cod_desc: "Conquered every Call of Duty campaign series from classic Modern Warfare to Black Ops on PC.",

      ps5_tag: "PS5 Console Gamer",
      ps5_status_title: "Active PlayStation 5 Gamer",
      ps5_status_desc: ""
    }
  };

  let currentLang = 'en';

  function setLanguage(lang) {
    currentLang = 'en';
    document.body.classList.add('lang-en');
    if (gatewayOverlay && gatewayOverlay.classList.contains('open')) {
      document.body.classList.add('modal-open');
    }

    // Translate DOM elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n.en && i18n.en[key]) {
        el.textContent = i18n.en[key];
      }
    });

    // Translate Input Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18n.en && i18n.en[key]) {
        el.placeholder = i18n.en[key];
      }
    });
  }


  // --- OPENING ENTRY GATEWAY MODAL LOGIC ---
  const gatewayOverlay = document.getElementById('entry-modal-gateway');
  const selectProBtn = document.getElementById('select-pro-mode');
  const selectPersonalBtn = document.getElementById('select-personal-mode');
  const btnReopenGateway = document.getElementById('btn-reopen-gateway');

  const pageProfessional = document.getElementById('page-professional');
  const pagePersonal = document.getElementById('page-personal');

  function openGateway() {
    if (gatewayOverlay) {
      gatewayOverlay.classList.add('open');
      document.body.classList.add('modal-open');
      if (window.CyberAudio) CyberAudio.playSwitch();
    }
  }

  function closeGatewayAndSelectMode(mode) {
    if (gatewayOverlay) {
      gatewayOverlay.classList.remove('open');
      document.body.classList.remove('modal-open');
      if (window.CyberAudio) CyberAudio.playChime();
    }

    if (mode === 'personal') {
      if (pageProfessional) pageProfessional.classList.remove('active');
      if (pagePersonal) pagePersonal.classList.add('active');
      updateNavForMode('personal');
    } else {
      if (pagePersonal) pagePersonal.classList.remove('active');
      if (pageProfessional) pageProfessional.classList.add('active');
      updateNavForMode('pro');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavForMode(mode) {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

    if (mode === 'personal') {
      navLinksContainer.innerHTML = `
        <a href="#personal-about" data-i18n="nav_personal_about">Beyond Code</a>
        <a href="#garage" data-i18n="nav_personal_garage">Garage & Cars</a>
        <a href="#gaming" data-i18n="nav_personal_gaming">Gaming</a>
        <a href="#contact" data-i18n="nav_contact">Contact</a>
      `;
    } else {
      navLinksContainer.innerHTML = `
        <a href="#about" data-i18n="nav_about">About</a>
        <a href="#experience" data-i18n="nav_exp">Experience</a>
        <a href="#skills" data-i18n="nav_skills">Skills</a>
        <a href="#education" data-i18n="nav_edu">Education</a>
        <a href="#contact" data-i18n="nav_contact">Contact</a>
      `;
    }
    setLanguage(currentLang);
    bindNavClickListeners();
  }

  function bindNavClickListeners() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.onclick = (e) => {
        const targetHref = link.getAttribute('href');
        if (!targetHref || targetHref === '#' || targetHref.includes('.html')) return;

        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      };
    });
  }

  if (selectProBtn) selectProBtn.addEventListener('click', () => closeGatewayAndSelectMode('pro'));
  if (selectPersonalBtn) selectPersonalBtn.addEventListener('click', () => closeGatewayAndSelectMode('personal'));
  if (btnReopenGateway) btnReopenGateway.addEventListener('click', openGateway);

  // Initialize Language
  setLanguage(currentLang);


  // --- MATRIX CANVAS BACKGROUND ---
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let matrixActive = true;

  if (canvas && ctx) {
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const characters = '01SAIMAN_SAH_CYBER_DEV_NEPAL_0123456789';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0);

    function drawMatrix() {
      if (!matrixActive) return;

      ctx.fillStyle = 'rgba(11, 15, 25, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character glowing white, body characters cyan
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f3ff';
        } else {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 35);
  }

  const btnMatrixToggle = document.getElementById('btn-matrix-toggle');
  if (btnMatrixToggle) {
    btnMatrixToggle.addEventListener('click', () => {
      matrixActive = !matrixActive;
      canvas.style.display = matrixActive ? 'block' : 'none';
    });
  }

  // --- GENERIC XOR DECRYPTION HELPER ---
  function decryptData(enc, key) {
    try {
      const raw = atob(enc);
      let str = '';
      for (let i = 0; i < raw.length; i++) {
        str += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return str;
    } catch (e) {
      return null;
    }
  }

  // --- PHONE & WHATSAPP PIN ENCRYPTION ENGINE (PIN: 9749933211) ---
  const PHONE_ENCRYPTED_DATA = "BVNdTxlQX1NCQgQVQVdVXFBZVFUUVVVdXlYeQF5GGwk+GRkPQEJQXxlUWFhKQA4QWURdGlZYXVRWElZDXFJaFElGX0FUEwcLXRlaX1JBQgwbUVUUSlxfW1URX1YZWlBBUF5UHFpfUVpSEQ0OHlgHF3d2d2dycWUReHR3fGpgE2d/fXZ0f3x9DxxBQVBXCT4FFldaRA87BVNdTxlQX1NCQgQVQVdVXFBZVFUUVFtXTVJQRhxYV1FbGwc5ExINQQcLR01LXF1VDw1QF1dVWEBADxNXWBpHVlVaVxJXUBRHXFZXVhNGVElNGlVaWlZdRhMPBRhdBxl3WkBUUk0XZFFWXVYIDR5KQ0ZWV1QNEg1QGV9GXF8OEUZUXQMcDQ4OCgQGCAgKBAYICBETUV1QSkQJG1xeUltdHFVeWlIZW1pVWV1QUFxNGw0YCwYGGQ4DDQAKAAEDAAgLG1gHDxxCDzsZFwhdUEUTQUVIVVIJG1RSQVVYXxRDW0kDEwICQUkCFQozGRMTEg1QGV9GXF8OEVpFRUlEDhYWRFIcXFQWWlFKSlJUVx52awECY2pjYnMCZW90BQZKQVAPQEMbF11dBBFGXF1eWlxRXRREUh9dWFdcFhlNUkFVVEUEFWtbVVJdWRMRS1JYBBtdXF1BVFdSRhlXXEFXV1RLRVFLGxNQXlBCSgoWWkBRVkAcU01ZFEpWUFpTXRxaX11JGURbU0VCWEdEGUpeEQwNWBlUWFhKQA4QV1AUVUZYV1dAEldQFEBcWE1AUkJBEwcLG1AHE3BaUEUZWFoZbltSRkJwSUcIFlgNORIRDRZTXU8HOQ8dVVhPCQ==";

  function attemptUnlockPhone(providedPin) {
    const inputEl = document.getElementById('phone-pin-input');
    const rawPin = providedPin || (inputEl ? inputEl.value.trim() : '');
    const cleanPin = rawPin.replace(/\D/g, '');
    const errorEl = document.getElementById('phone-pin-error');
    const formWrap = document.getElementById('phone-lock-form-wrap');
    const unlockedCard = document.getElementById('phone-unlocked-card');

    if (cleanPin === "9749933211" || cleanPin.endsWith("9749933211") || rawPin === "9749933211") {
      const targetPin = "9749933211";
      if (formWrap) formWrap.style.display = 'none';
      if (unlockedCard) {
        unlockedCard.style.display = 'block';
        const decrypted = decryptData(PHONE_ENCRYPTED_DATA, targetPin);
        unlockedCard.innerHTML = decrypted || '';

        const waUrl = "https://wa.me/message/GR66ZSPQA3TVC1?src=qr";

        // Update floating WhatsApp button
        const floatWaBtn = document.getElementById('float-whatsapp-btn');
        if (floatWaBtn) {
          floatWaBtn.href = waUrl;
          floatWaBtn.target = "_blank";
          floatWaBtn.title = "Chat on WhatsApp";
        }

        // Update social whatsapp chip
        const socialWaChip = document.getElementById('social-whatsapp-chip');
        if (socialWaChip) {
          socialWaChip.href = waUrl;
          socialWaChip.target = "_blank";
          socialWaChip.innerHTML = `<i class="fa-brands fa-whatsapp"></i> WhatsApp`;
        }
      }

      // Update hero phone pill if present
      const heroPhoneVal = document.getElementById('hero-phone-val');
      if (heroPhoneVal) {
        heroPhoneVal.innerHTML = `<a href="tel:+9779749933211" class="email-link">+977 9749933211</a>`;
      }

      if (errorEl) errorEl.textContent = '';
      if (window.CyberAudio) CyberAudio.playUnlockSuccess();
      return true;
    } else {
      if (errorEl) {
        errorEl.textContent = 'ACCESS DENIED — INVALID PIN';
        errorEl.classList.add('shake');
        setTimeout(() => errorEl.classList.remove('shake'), 500);
      }
      return false;
    }
  }

  const btnPhoneUnlock = document.getElementById('btn-phone-unlock');
  const phonePinInput = document.getElementById('phone-pin-input');
  if (btnPhoneUnlock) btnPhoneUnlock.addEventListener('click', () => attemptUnlockPhone());
  if (phonePinInput) {
    phonePinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlockPhone();
    });
  }


  // --- TERMINAL MODAL ---
  const terminalModal = document.getElementById('terminal-modal');
  const btnTerminalOpen = document.getElementById('btn-terminal-open');
  const btnTerminalClose = document.getElementById('btn-terminal-close');
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');

  function openTerminal() {
    if (terminalModal) {
      terminalModal.classList.add('open');
      if (termInput) termInput.focus();
    }
  }

  function closeTerminal() {
    if (terminalModal) terminalModal.classList.remove('open');
  }

  if (btnTerminalOpen) btnTerminalOpen.addEventListener('click', openTerminal);
  if (btnTerminalClose) btnTerminalClose.addEventListener('click', closeTerminal);

  const COMMANDS = {
    'help': 'Commands: pro, personal, travel, about, exp, opsec, odni, ctiic, phone, whatsapp, proverb, social, cars, gaming, skills, education, contact, clear',
    'pro': 'Navigating to Professional Portfolio (professional.html)...',
    'personal': 'Navigating to Personal Life & Gaming (personal.html)...',
    'travel': 'Fond of traveling & high-altitude trekking | Highest point reached: 4,200 meters (~13,780 feet) above sea level in Nepal 🏔️',
    'about': 'Saiman Sah — Developer | Ethical Hacker | Cybersecurity Researcher based in Nepal.',
    'exp': 'Technical & Security Operations: Software architecture, vulnerability research & full-stack development.',
    'opsec': '[OPERATIONAL SECURITY] Anonymized digital footprint, encrypted communication channels & secure infrastructure.',
    'phone': 'Type "phone <PIN>" to unlock & reveal direct phone number and WhatsApp.',
    'whatsapp': 'Type "whatsapp <PIN>" to unlock & reveal direct WhatsApp link.',
    'dni': 'ODNI CTIIC Cyber Executive (Badge No. 118) — Official Operational Record published on Professional page.',
    'odni': 'ODNI CTIIC Cyber Executive (Badge No. 118) — Official Operational Record published on Professional page.',
    'ctiic': 'ODNI CTIIC Cyber Executive (Badge No. 118) — Official Operational Record published on Professional page.',
    'proverb': '“अंतः अस्ति प्रारंभः” — End is Beginning (Guiding Philosophy)',
    'social': 'FB: https://www.facebook.com/shahsaiman | IG: https://www.instagram.com/shah_saiman | X: https://x.com/sah_saiman | Threads: https://www.threads.net/@shah_saiman',
    'cars': 'BYD Atto 3 Owner (Max Speed 130 km/h) | Dream Car: New Land Rover Defender 110',
    'gaming': 'PC: GTA V (3x), RDR 2 (2x), Hitman 3, COD Series. Console: PS5 Gamer',
    'skills': 'Software Dev & Debugging, Cybersecurity & Ethical Hacking, Core Leadership.',
    'education': '+2 Science / Computer Science (Completed), SEE (Completed)',
    'contact': 'Location: Nepal | Email: me@saimansah.com.np | Phone & WhatsApp: [RESTRICTED PIN ACCESS — Type "phone <PIN>" in terminal]'
  };

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (window.CyberAudio) CyberAudio.playTerminalKey();
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        termInput.value = '';

        if (!rawCmd) return;

        const line = document.createElement('div');
        line.className = 'term-line';
        const parts = rawCmd.split(' ');
        const mainCmd = parts[0].toLowerCase();
        const passArg = parts[1] || '';

        if (mainCmd === 'pro') {
          window.location.href = 'professional.html';
          return;
        } else if (mainCmd === 'personal') {
          window.location.href = 'personal.html';
          return;
        }

        if (mainCmd === 'phone' || mainCmd === 'whatsapp' || mainCmd === 'call' || mainCmd === '9749933211') {
          const testPin = passArg || (mainCmd === '9749933211' ? '9749933211' : '');
          if (testPin === '9749933211' || attemptUnlockPhone(testPin)) {
            attemptUnlockPhone('9749933211');
            line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br><span style="color:#00ff66;font-weight:bold;">[CONTACT UNLOCKED — PIN VERIFIED]</span><br>Phone & WhatsApp Unlocked! View details in the Contact section.`;
          } else {
            if (window.CyberAudio && window.CyberAudio.playGlitchError) CyberAudio.playGlitchError();
            line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br><span style="color:#ff0055">[CONTACT RESTRICTED] Enter PIN e.g.: '${mainCmd} <PIN>' or enter authorization PIN in the contact section.</span>`;
          }
          termOutput.appendChild(line);
          termOutput.scrollTop = termOutput.scrollHeight;
          return;
        }

        if (COMMANDS[mainCmd]) {
          line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br>${COMMANDS[mainCmd]}`;
        } else {
          if (window.CyberAudio && window.CyberAudio.playGlitchError) CyberAudio.playGlitchError();
          line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br><span style="color:#ff0055">Command not found: '${mainCmd}'. Type 'help'.</span>`;
        }

        termOutput.appendChild(line);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }


  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('simple-contact-form');
  const formResponse = document.getElementById('form-response');

  if (contactForm && formResponse) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = i18n[currentLang].msg_sent;
      formResponse.textContent = msg;
      contactForm.reset();
    });
  }

  // ==========================================================================
  // ULTRA-PREMIUM CYBER INTERACTIVE ENGINE
  // ==========================================================================

  // --- 1. DYNAMIC HERO TAGLINE TYPING ENGINE ---
  const typingTarget = document.getElementById('hero-typing-target');
  if (typingTarget) {
    const roles = [
      "Developer",
      "Ethical Hacker",
      "Cybersecurity Specialist",
      "Cybersecurity Researcher",
      "Tech Enthusiast",
      "Software Debugger"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // --- 2. INTERSECTION OBSERVER SCROLL REVEAL & STAT COUNTER ENGINE ---
  function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number:not(.counted)');
    counters.forEach(counter => {
      counter.classList.add('counted');
      const target = +counter.getAttribute('data-target');
      const duration = 1600;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  function animateSkillBars(container) {
    const progressFills = container.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-progress');
      fill.style.width = targetWidth;
    });
  }

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          animateCounters(entry.target);
          animateSkillBars(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }
  initScrollReveal();

  // --- 3. CYBER HUD PING SIMULATOR ---
  const pingValEl = document.getElementById('hud-ping-val');
  if (pingValEl) {
    setInterval(() => {
      const ping = Math.floor(Math.random() * 8) + 9;
      pingValEl.textContent = `${ping} ms`;
    }, 2500);
  }

  // --- 4. CAR SPEC SWITCHER GUI (personal.html) ---
  const specTabs = document.querySelectorAll('.spec-tab-btn');
  if (specTabs.length > 0) {
    const carData = {
      atto3: {
        name: "BYD Atto 3 (Electric SUV)",
        badge: "CURRENT RIDE",
        desc: "Proud owner of the sleek and high-performance BYD Atto 3 electric vehicle, blending futuristic EV technology with rapid acceleration.",
        speed: "130 km/h",
        lblSpeed: "Personal Speed Record",
        power: "201 HP / 310 Nm",
        lblPower: "Electric Motor Output",
        range: "420 km",
        lblRange: "EV Battery Range",
        accel: "7.3 Seconds",
        lblAccel: "0–100 km/h Acceleration"
      },
      defender: {
        name: "New Land Rover Defender 110",
        badge: "DREAM VEHICLE",
        desc: "1st Dream Car — Ultimate luxury 4x4 off-road terrain capability, robust aluminum architecture, and iconic adventure design.",
        speed: "191 km/h",
        lblSpeed: "Top Vehicle Capability",
        power: "395 HP / 550 Nm",
        lblPower: "Turbocharged i6 MHEV",
        range: "900 km",
        lblRange: "Full Tank Range",
        accel: "6.0 Seconds",
        lblAccel: "0–100 km/h Acceleration"
      }
    };

    specTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        specTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const carKey = tab.getAttribute('data-car');
        const data = carData[carKey];
        if (!data) return;

        if (window.CyberAudio) CyberAudio.playClick();

        const panel = document.getElementById('car-spec-panel');
        if (panel) {
          panel.style.opacity = '0.3';
          setTimeout(() => {
            document.getElementById('spec-car-name').textContent = data.name;
            document.getElementById('spec-car-badge').textContent = data.badge;
            document.getElementById('spec-car-desc').textContent = data.desc;
            document.getElementById('spec-val-speed').textContent = data.speed;
            document.getElementById('spec-lbl-speed').textContent = data.lblSpeed;
            document.getElementById('spec-val-power').textContent = data.power;
            document.getElementById('spec-lbl-power').textContent = data.lblPower;
            document.getElementById('spec-val-range').textContent = data.range;
            document.getElementById('spec-lbl-range').textContent = data.lblRange;
            document.getElementById('spec-val-accel').textContent = data.accel;
            document.getElementById('spec-lbl-accel').textContent = data.lblAccel;
            panel.style.opacity = '1';

            // Sync Accelerator Simulator vehicle target
            if (window.setSimulatorVehicle) {
              window.setSimulatorVehicle(carKey);
            }
          }, 150);
        }
      });
    });
  }

  // --- 4.1 INTERACTIVE ACCELERATOR & SPEEDOMETER SIMULATOR LOGIC ---
  const pedalBtn = document.getElementById('accelerator-pedal');
  if (pedalBtn) {
    let currentSpeed = 0;
    let targetTopSpeed = 130; // BYD Atto 3 default record
    let currentVehicle = 'atto3';
    let driveMode = 'sport';
    let isAccelerating = false;
    let topSpeedTriggered = false;
    let animFrameId = null;

    const speedValEl = document.getElementById('sim-speed-val');
    const carTagEl = document.getElementById('sim-car-tag');
    const gaugeFillPath = document.getElementById('gauge-fill-path');
    const rpmValEl = document.getElementById('sim-rpm-val');
    const gearValEl = document.getElementById('sim-gear-val');
    const pedalStatusEl = document.getElementById('pedal-status-text');
    const topSpeedAlert = document.getElementById('top-speed-record-alert');
    const tsRecordVal = document.getElementById('ts-record-val');
    const tsRecordDesc = document.getElementById('ts-record-desc');
    const modeBtns = document.querySelectorAll('.sim-mode-btn');
    const hudTopSpeedBtn = document.getElementById('hud-top-speed-btn');

    // Drive Mode selection
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        driveMode = btn.getAttribute('data-mode') || 'sport';
        if (window.CyberAudio) CyberAudio.playClick();
      });
    });

    // Expose vehicle switcher sync
    window.setSimulatorVehicle = (carKey) => {
      currentVehicle = carKey;
      const tachoLabelEl = document.getElementById('sim-tacho-label');
      if (carKey === 'defender') {
        targetTopSpeed = 191;
        if (carTagEl) carTagEl.textContent = 'DEFENDER 110';
        if (tsRecordVal) tsRecordVal.textContent = '191';
        if (tsRecordDesc) tsRecordDesc.textContent = 'Maximum Vehicle Top Speed Capability on Land Rover Defender 110!';
        if (tachoLabelEl) tachoLabelEl.innerHTML = '<i class="fa-solid fa-fire"></i> ENGINE REV / TACHOMETER (RPM)';
      } else {
        targetTopSpeed = 130;
        if (carTagEl) carTagEl.textContent = 'BYD ATTO 3';
        if (tsRecordVal) tsRecordVal.textContent = '130';
        if (tsRecordDesc) tsRecordDesc.textContent = 'Personal Maximum Top Speed Record Hit on BYD Atto 3 Highway Run!';
        if (tachoLabelEl) tachoLabelEl.innerHTML = '<i class="fa-solid fa-bolt"></i> EV MOTOR POWER / (RPM)';
      }
      resetSpeedometer();
    };

    function resetSpeedometer() {
      currentSpeed = 0;
      topSpeedTriggered = false;
      if (speedValEl) {
        speedValEl.textContent = '0';
        speedValEl.classList.remove('top-speed-flash');
      }
      if (topSpeedAlert) topSpeedAlert.classList.remove('active');
      if (gaugeFillPath) gaugeFillPath.style.strokeDashoffset = '420';
      if (rpmValEl) rpmValEl.textContent = '800 RPM';
      if (gearValEl) gearValEl.textContent = 'IDLE (P)';
      updateLEDs(0);
      if (window.CyberAudio && window.CyberAudio.stopEngineRev) {
        window.CyberAudio.stopEngineRev();
      }
    }

    function getAccelStep() {
      switch (driveMode) {
        case 'eco': return 0.7;
        case 'launch': return 2.6;
        case 'sport':
        default: return 1.4;
      }
    }

    function updateLEDs(ratio) {
      const activeCount = Math.floor(ratio * 8);
      for (let i = 1; i <= 8; i++) {
        const led = document.getElementById(`led-${i}`);
        if (led) {
          if (i <= activeCount) {
            led.classList.add('active');
          } else {
            led.classList.remove('active');
          }
        }
      }
    }

    function speedLoop() {
      const step = getAccelStep();

      if (isAccelerating) {
        currentSpeed += step;
        if (currentSpeed >= targetTopSpeed) {
          currentSpeed = targetTopSpeed;
          if (!topSpeedTriggered) {
            topSpeedTriggered = true;
            if (speedValEl) speedValEl.classList.add('top-speed-flash');
            if (topSpeedAlert) topSpeedAlert.classList.add('active');
            if (window.CyberAudio && window.CyberAudio.playTopSpeedChime) {
              window.CyberAudio.playTopSpeedChime();
            }
          }
        }
      } else {
        currentSpeed -= step * 1.3; // Regenerative braking deceleration
        if (currentSpeed <= 0) {
          currentSpeed = 0;
          topSpeedTriggered = false;
          if (speedValEl) speedValEl.classList.remove('top-speed-flash');
          if (topSpeedAlert) topSpeedAlert.classList.remove('active');
        }
      }

      // Update UI elements
      const speedRatio = currentSpeed / targetTopSpeed;

      if (speedValEl) speedValEl.textContent = Math.floor(currentSpeed);

      // SVG Arc Fill (Max offset: 420, active arc length ~315)
      if (gaugeFillPath) {
        const offset = 420 - (315 * speedRatio);
        gaugeFillPath.style.strokeDashoffset = offset.toString();
      }

      // Tachometer RPM
      const rpm = 800 + Math.floor(speedRatio * 7200);
      if (rpmValEl) rpmValEl.textContent = `${rpm} RPM`;

      // Gear readout
      if (gearValEl) {
        if (currentSpeed === 0) gearValEl.textContent = 'IDLE (P)';
        else if (currentSpeed < 35) gearValEl.textContent = 'Accelerating';
        else if (currentSpeed < 70) gearValEl.textContent = 'Accelerating';
        else if (currentSpeed < 105) gearValEl.textContent = 'Accelerating';
        else if (currentSpeed < targetTopSpeed) gearValEl.textContent = 'Accelerating';
        else gearValEl.textContent = 'Accelerated(MAX)';
      }

      // Shift LEDs
      updateLEDs(speedRatio);

      // Engine / EV Motor Sound
      if (window.CyberAudio && window.CyberAudio.playEngineRev) {
        if (currentSpeed > 0) {
          window.CyberAudio.playEngineRev(speedRatio, currentSpeed >= targetTopSpeed, currentVehicle);
        } else {
          window.CyberAudio.stopEngineRev();
        }
      }

      // Continue animation loop if speed > 0 or user pressing pedal
      if (isAccelerating || currentSpeed > 0) {
        animFrameId = requestAnimationFrame(speedLoop);
      } else {
        animFrameId = null;
        if (pedalStatusEl) pedalStatusEl.textContent = 'STATUS: IDLE (STATIONARY)';
      }
    }

    function startAccelerating(e) {
      if (e) e.preventDefault();
      if (isAccelerating) return;
      isAccelerating = true;
      pedalBtn.classList.add('pressed');
      if (pedalStatusEl) pedalStatusEl.textContent = 'STATUS: ACCELERATING (FULL THROTTLE 🚀)';
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(speedLoop);
      }
    }

    function stopAccelerating(e) {
      if (e) e.preventDefault();
      if (!isAccelerating) return;
      isAccelerating = false;
      pedalBtn.classList.remove('pressed');
      if (pedalStatusEl) {
        pedalStatusEl.textContent = currentSpeed > 0 ? 'STATUS: REGEN BRAKING ⚡' : 'STATUS: IDLE (STATIONARY)';
      }
    }

    // Pedal mouse & touch handlers
    pedalBtn.addEventListener('mousedown', startAccelerating);
    pedalBtn.addEventListener('mouseup', stopAccelerating);
    pedalBtn.addEventListener('mouseleave', stopAccelerating);

    pedalBtn.addEventListener('touchstart', startAccelerating, { passive: false });
    pedalBtn.addEventListener('touchend', stopAccelerating, { passive: false });
    pedalBtn.addEventListener('touchcancel', stopAccelerating, { passive: false });

    // HUD Top Speed Click Handler
    if (hudTopSpeedBtn) {
      hudTopSpeedBtn.addEventListener('click', () => {
        const simCard = document.querySelector('.accelerator-simulator-card');
        if (simCard) {
          simCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          pedalBtn.classList.add('pressed');
          setTimeout(() => pedalBtn.classList.remove('pressed'), 400);
        }
      });
    }
  }

  // --- 4.2 INTERACTIVE MOUNTAIN ALTITUDE DRAG CURSOR SLIDER LOGIC ---
  const altSlider = document.getElementById('altitude-drag-slider');
  if (altSlider) {
    let currentAltM = 0;
    const targetPeakM = 4200;
    let peakTriggered = false;
    let animInterval = null;

    const cursorHandle = document.getElementById('climber-cursor-handle');
    const sliderFillProgress = document.getElementById('slider-fill-progress');
    const cursorTooltipVal = document.getElementById('cursor-tooltip-val');
    const altMValEl = document.getElementById('sim-alt-m-val');
    const altFtValEl = document.getElementById('sim-alt-ft-val');
    const trailTagEl = document.getElementById('sim-trail-tag');
    const o2FillEl = document.getElementById('sim-o2-fill');
    const o2ValEl = document.getElementById('sim-o2-val');
    const pressValEl = document.getElementById('sim-press-val');
    const trailFillEl = document.getElementById('sim-trail-fill');
    const peakAlert = document.getElementById('peak-altitude-record-alert');
    const trekStatusEl = document.getElementById('trek-status-text');
    const btnQuickSummit = document.getElementById('btn-quick-summit');
    const btnQuickReset = document.getElementById('btn-quick-reset');
    const hudAltitudeBtn = document.getElementById('hud-altitude-btn');

    function updateCheckpoints(alt) {
      [1000, 2000, 3000, 4200].forEach(m => {
        const tick = document.getElementById(`tick-${m}`);
        if (tick) {
          if (alt >= m) tick.classList.add('reached');
          else tick.classList.remove('reached');
        }
      });
    }

    function setAltitude(altM) {
      const clampedAlt = Math.max(0, Math.min(targetPeakM, altM));
      currentAltM = clampedAlt;
      const altRatio = currentAltM / targetPeakM;
      const percentStr = `${(altRatio * 100).toFixed(2)}%`;

      // Slider & Cursor Knob UI (Vertical Hill Down-to-Up)
      altSlider.value = currentAltM;
      if (cursorHandle) cursorHandle.style.bottom = percentStr;
      if (sliderFillProgress) sliderFillProgress.style.height = percentStr;
      if (trailFillEl) trailFillEl.style.width = percentStr;

      const meters = Math.floor(currentAltM);
      const feet = Math.floor(currentAltM * 3.28084);

      if (cursorTooltipVal) cursorTooltipVal.textContent = `${meters}m`;
      if (altMValEl) altMValEl.textContent = meters.toLocaleString();
      if (altFtValEl) altFtValEl.textContent = feet.toLocaleString();

      // Oxygen & Pressure
      const o2Percent = 100 - Math.floor(altRatio * 38);
      if (o2FillEl) o2FillEl.style.width = `${o2Percent}%`;

      if (o2ValEl) {
        if (currentAltM < 1000) o2ValEl.textContent = `${o2Percent}% O₂ (SEA LEVEL AIR)`;
        else if (currentAltM < 2500) o2ValEl.textContent = `${o2Percent}% O₂ (MODERATE ALTITUDE)`;
        else if (currentAltM < 3800) o2ValEl.textContent = `${o2Percent}% O₂ (HIGH ALTITUDE ZONE)`;
        else o2ValEl.textContent = `${o2Percent}% O₂ (THIN AIR PEAK)`;
      }

      const pressHpa = Math.floor(1013 - (altRatio * 413));
      if (pressValEl) pressValEl.textContent = `${pressHpa} hPa`;

      // Trail Location Tag
      if (trailTagEl) {
        if (currentAltM === 0) trailTagEl.textContent = 'TRAILHEAD (BASE CAMP)';
        else if (currentAltM < 1500) trailTagEl.textContent = 'HIMALAYAN VALLEY PASS';
        else if (currentAltM < 3000) trailTagEl.textContent = 'ALPINE FOREST RIDGE';
        else if (currentAltM < 4200) trailTagEl.textContent = 'SNOW LINE EXPEDITION';
        else trailTagEl.textContent = '🚩 4,200M SUMMIT RECORD REACHED!';
      }

      // Checkpoints
      updateCheckpoints(meters);

      // Status text
      if (trekStatusEl) {
        if (currentAltM >= targetPeakM) {
          trekStatusEl.textContent = 'STATUS: 🏆 SUMMIT CONQUERED (4,200m / 13,780 FT)';
        } else if (currentAltM > 0) {
          trekStatusEl.textContent = `STATUS: ASCENDING TRAIL (${meters}m / ${feet} FT)`;
        } else {
          trekStatusEl.textContent = 'STATUS: AT BASE CAMP (0m) — DRAG CURSOR TO CLIMB PEAK';
        }
      }

      // Sound FX
      if (window.CyberAudio && window.CyberAudio.playClimbWind) {
        if (currentAltM > 0) {
          window.CyberAudio.playClimbWind(altRatio, currentAltM >= targetPeakM);
        } else {
          window.CyberAudio.stopClimbWind();
        }
      }

      // Peak Summit Record Alert
      if (currentAltM >= targetPeakM) {
        if (!peakTriggered) {
          peakTriggered = true;
          if (altMValEl) altMValEl.classList.add('peak-alt-flash');
          if (peakAlert) peakAlert.classList.add('active');
          if (window.CyberAudio && window.CyberAudio.playPeakSummitChime) {
            window.CyberAudio.playPeakSummitChime();
          }
        }
      } else {
        if (peakTriggered) {
          peakTriggered = false;
          if (altMValEl) altMValEl.classList.remove('peak-alt-flash');
          if (peakAlert) peakAlert.classList.remove('active');
        }
      }
    }

    function animateToAltitude(targetAlt) {
      if (animInterval) clearInterval(animInterval);
      const startAlt = currentAltM;
      const distance = targetAlt - startAlt;
      const duration = 1200; // ms
      const startTime = performance.now();

      if (cursorHandle) cursorHandle.classList.add('active');

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Easing cubic out
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = startAlt + (distance * ease);

        setAltitude(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          if (cursorHandle) cursorHandle.classList.remove('active');
        }
      }

      requestAnimationFrame(step);
    }

    // Input events
    altSlider.addEventListener('input', (e) => {
      if (animInterval) clearInterval(animInterval);
      if (cursorHandle) cursorHandle.classList.add('active');
      setAltitude(parseFloat(e.target.value));
    });

    altSlider.addEventListener('change', () => {
      if (cursorHandle) cursorHandle.classList.remove('active');
    });

    // Quick action buttons
    if (btnQuickSummit) {
      btnQuickSummit.addEventListener('click', () => {
        if (window.CyberAudio) CyberAudio.playClick();
        animateToAltitude(4200);
      });
    }

    if (btnQuickReset) {
      btnQuickReset.addEventListener('click', () => {
        if (window.CyberAudio) CyberAudio.playClick();
        animateToAltitude(0);
      });
    }

    // HUD Altitude Button Click Handler
    if (hudAltitudeBtn) {
      hudAltitudeBtn.addEventListener('click', () => {
        const simCard = document.querySelector('.altimeter-simulator-card');
        if (simCard) {
          simCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          animateToAltitude(4200);
        }
      });
    }
  }

  // --- 5. GAMING FILTER GUI (personal.html) ---
  const filterPills = document.querySelectorAll('.filter-pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');
        if (window.CyberAudio) CyberAudio.playClick();

        const cards = document.querySelectorAll('.gaming-grid .game-card');
        const items = document.querySelectorAll('.game-achievements-list .game-item');

        if (filter === 'all') {
          cards.forEach(c => c.style.display = 'flex');
          items.forEach(i => i.style.display = 'flex');
        } else if (filter === 'pc') {
          cards.forEach(c => c.style.display = c.getAttribute('data-category')?.includes('pc') ? 'flex' : 'none');
          items.forEach(i => i.style.display = 'flex');
        } else if (filter === 'ps5') {
          cards.forEach(c => c.style.display = c.getAttribute('data-category')?.includes('ps5') ? 'flex' : 'none');
        } else if (filter === 'cleared') {
          cards.forEach(c => c.style.display = c.getAttribute('data-category')?.includes('cleared') ? 'flex' : 'none');
          items.forEach(i => i.style.display = i.getAttribute('data-category')?.includes('cleared') ? 'flex' : 'none');
        }
      });
    });
  }

  // --- 6. 3D CARD TILT & MOUSE SPECULAR LIGHTING ENGINE ---
  function initCardTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      });
    });
  }
  initCardTilt();

  // --- 7. INTERACTIVE BUTTON CLICK RIPPLE & AUDIO TRIGGER ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.cyber-btn, .social-chip, .whatsapp-float-btn, .gateway-option-card, .spec-tab-btn, .filter-pill');
    if (!btn) return;

    if (window.CyberAudio && !btn.id?.includes('audio')) {
      CyberAudio.playClick();
    }

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'cyber-ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

});

