/* ==========================================================================
   SAIMAN SAH PORTFOLIO — INTERACTIVE ENGINE, BILINGUAL I18N & ENTRY GATEWAY
   ========================================================================== */

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
      desc_pro_path: "Cybersecurity operations, software engineering, technical projects, and academic credentials.",
      btn_enter_pro: "Enter Professional Bio",

      badge_personal_path: "CARS & GAMING",
      title_personal_path: "Personal Life & Hobbies",
      desc_personal_path: "BYD Atto 3 EV (130 km/h record),  Land Rover Defender 110 dream, PC Gaming (GTA V 3x, RDR 2 2x, COD, Hitman 3) & PS5.",
      btn_enter_personal: "Enter Personal Bio",
      hint_lang: "Change Language:",

      badge_role: "Ethical Hacker & Developer",
      hero_hi: "Hi, I'm",
      hero_tagline: "Developer | Ethical Hacker | Tech Enthusiast | Cybersecurity Researcher | Debugger",
      spotlight_badge: "PHILOSOPHY",
      spotlight_quote: "अन्तः अस्ति प्रारम्भः",
      spotlight_meaning: "End is Beginning",
      hero_bio: "Experienced Developer and Ethical Hacker specializing in cybersecurity research, system vulnerability assessment, and full-stack software development. Based in Nepal, I build, debug, and secure high-stakes digital applications.",
      info_location: "Location: Nepal 🇳🇵",
      info_dob: "DOB: July 21, 2008",
      info_dob_bs: "(B.S.: Shrawan 6, 2065 BS)",
      btn_contact_me: "Get in Touch",
      btn_view_exp: "View Experience",
      tag_leadership: "EXPERIENCE & LEADERSHIP",
      exp_heading: "Engineering & Security Operations",

      pillar1_title: "Technical Leadership",
      pillar1_desc: "Led technical operations, managing project workflows, development architecture, and strategic execution across software initiatives.",
      pillar2_title: "Software Engineering & Debugging",
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
      personal_hero_subtitle: "Exploring high-speed automotive engineering, mastering epic gaming campaigns on PC & PS5, and crafting custom tech setups.",
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


  // --- CLASSIFIED ODNI CTIIC VAULT ENCRYPTED ENGINE ---
  const ODNI_ENCRYPTED_DATA = "bBYGEEUQHwgcHVxOIygvOiMbCQ8AF14fDhsNGG0sKyg0Fx1EW3lTSVMdEQ0uZC0lMQEcW0cbBg1CDAAIJyFuOzUWTxYQHwAMQgkNAzdmcHU5UgwKBAAAVE0IAEEzKyIgNFIJB0gfHAoEQw4cJSpsd2xdBlhFITY6OzwoLxQBCmkRMSwjNiBTJSo4JCBgcW5dcCchKiowOCwrUk4fMCUgd1pST1oNQU0mKyAoTAMQBwATUkczCxcWGwwBFwkybW5dcDYKFgQBBwQKABUNLGQYKCUeG1pKG0FXZU5BUDBkLSUxARxbRwUSHAMaTB81JjogJB4KRFswHwgcHQgKKSEqaR8CChQEBxoGAQ8NTBIhLSYiFk9ART8WCAsLEx8oLT5pGBscEgoBClVAHl9mfGsqICZMZWxZFxofTw0NDTM3c2s0HAZLExIGBRtDAg0yIG4rPwALAxdeEQwOA0wOLzxsd1pST1oBGgVJDAIAHzN5bD8xBwMSSBYeCwMLDEEyKzlrbnhPRkVTTw0GGEEPLCU9Om1QAwkCHF4eHQ8RHCU2bGkjBhYKAE5RHgYKFQR6dX15IApURg0WGg4HGltdc3Q+MWtSAgcXFBoHVV5BDTUwIWlhQB8eXlFNY09OQUxgZHIgPRVPFRcQTksOHRIJNDdhLT4bMAoKFBxHHwAGTmAlIj1tUCAiKzpTKjsnKC9gASMrPBcCREUQHwgcHVxOJConZDUfDQoAHl4AAglBCiwrLz19EwEPCFFTGhsXDQl9ZjkgNAYHXFRAQxkXVUEEJS0pISRIXlVVAwtSTwEDBiUnOmQ2GxtcBhwdHQ4HD1dgJiE7NBcdSxcSFwAaHVtZcGF1a254T0ZFU09GCwcXUkpObmlwTgdVWzw3JyZOIjgJDQ1peCchIiAhMCY5KzNFYAALGREgOysgPSdVQAZSUkpkbmlwTh9GBh8SGhxTQxohMSI9fQAACgBRTSEKDwVMLyJuDTUCDhQRHhYHG051TBUqKiwiEQAQAAFTJgECCAIlZAE5NQAOEgwFFlVAHl9mYGRuaWwWBhBFEB8IHB1cTjYlOyUkXwsHERYARA0BGU5+Tm5pcFJPRlkAAwgBUF0FYCciKCMBUkQDEl4bCgkUACE2bi8xXwwHCRYdDQ4cTAghPT1rbk5AD1tTJwwBGxMJemQPPDdSXFdJU0FZXVpBf2AOOyVwQF1KRUFDW1lSTh8wJSB3WlJPRkVTU1UcHgACfngnaTMeDhUWTlEPDkMSAywtKmk2E0IFBB8WBwsPE0E3ISsickxTSQxNUytBPU9WYAYmKDQADkZURl9JXV5ZXWBXbho4AA4RBB1TX0NOU1x4d24LfiFBWkoAAwgBUGtMYGRuaXBOHBYEHVMKAw8SH31mPjw8AQpLAh8cHk8JEwklKmM9NQobRFtPGkkMAgAfM3lsLzFfHAkJGhdJCQ9MDywrLSJyTFNJDE1TLRocABgpKyBzcENPPwASAUVPX1FMDSsgPTgBQ0ZXQVMtDhcSTGhyd3lwNg4fFlpPRhweAAJ+Tm5pcFJTSQEaBVdlTkFQbyAnP254U0kBGgVX";

  function decryptClassifiedVault(enc, key) {
    try {
      const raw = atob(enc);
      let str = '';
      for (let i = 0; i < raw.length; i++) {
        str += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      if (str.includes('classified-vault-header')) {
        return str;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  const vaultModal = document.getElementById('classified-vault-modal');
  const btnVaultOpen = document.getElementById('btn-vault-open');
  const heroVaultTrigger = document.getElementById('hero-vault-trigger');
  const btnVaultClose = document.getElementById('btn-vault-close');
  const btnVaultUnlock = document.getElementById('btn-vault-unlock');
  const vaultPassInput = document.getElementById('vault-pass-input');
  const vaultLockScreen = document.getElementById('vault-lock-screen');
  const vaultUnlockedContent = document.getElementById('vault-unlocked-content');
  const vaultAuthError = document.getElementById('vault-auth-error');

  function openVaultModal() {
    if (vaultModal) {
      vaultModal.classList.add('open');
      if (vaultPassInput) vaultPassInput.focus();
      if (window.CyberAudio) CyberAudio.playSwitch();
    }
  }

  function closeVaultModal() {
    if (vaultModal) vaultModal.classList.remove('open');
  }

  function attemptUnlockVault(inputPass) {
    const pass = inputPass || (vaultPassInput ? vaultPassInput.value.trim() : '');
    if (!pass) {
      if (vaultAuthError) vaultAuthError.textContent = 'Please enter clearance key.';
      return false;
    }

    const decryptedHtml = decryptClassifiedVault(ODNI_ENCRYPTED_DATA, pass);

    if (decryptedHtml) {
      if (vaultLockScreen) vaultLockScreen.style.display = 'none';
      if (vaultUnlockedContent) {
        vaultUnlockedContent.innerHTML = decryptedHtml;
        vaultUnlockedContent.style.display = 'block';

        const btnRelock = document.getElementById('btn-relock-vault');
        if (btnRelock) {
          btnRelock.onclick = relockVault;
        }
      }
      if (vaultAuthError) vaultAuthError.textContent = '';
      if (vaultPassInput) vaultPassInput.value = '';
      if (window.CyberAudio) CyberAudio.playChime();
      return true;
    } else {
      if (vaultAuthError) {
        vaultAuthError.textContent = 'ACCESS DENIED — INVALID CLEARANCE KEY';
        vaultAuthError.classList.add('shake');
        setTimeout(() => vaultAuthError.classList.remove('shake'), 500);
      }
      return false;
    }
  }

  function relockVault() {
    if (vaultUnlockedContent) {
      vaultUnlockedContent.innerHTML = '';
      vaultUnlockedContent.style.display = 'none';
    }
    if (vaultLockScreen) vaultLockScreen.style.display = 'flex';
    if (vaultPassInput) vaultPassInput.value = '';
    if (vaultAuthError) vaultAuthError.textContent = '';
  }

  if (btnVaultOpen) btnVaultOpen.addEventListener('click', openVaultModal);
  if (heroVaultTrigger) heroVaultTrigger.addEventListener('click', openVaultModal);
  if (btnVaultClose) btnVaultClose.addEventListener('click', closeVaultModal);
  if (btnVaultUnlock) btnVaultUnlock.addEventListener('click', () => attemptUnlockVault());
  if (vaultPassInput) {
    vaultPassInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlockVault();
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
    'help': 'Commands: pro, personal, about, exp, opsec, classified, vault, proverb, social, cars, gaming, skills, education, contact, clear',
    'pro': 'Navigating to Professional Portfolio (professional.html)...',
    'personal': 'Navigating to Personal Life & Gaming (personal.html)...',
    'about': 'Saiman Sah — Developer | Ethical Hacker | Cybersecurity Researcher based in Nepal.',
    'exp': 'Engineering & Security Operations: Software architecture, vulnerability research & full-stack development.',
    'opsec': '[OPERATIONAL SECURITY] Anonymized digital footprint, encrypted communication channels & secure infrastructure.',
    'classified': 'Type "classified Professional@DNI" to unlock Restricted Vault directly, or use the Classified Vault button in the header.',
    'vault': 'Type "vault Professional@DNI" to unlock Restricted Vault directly.',
    'dni': 'Type "classified Professional@DNI" to unlock Restricted Vault directly.',
    'odni': 'Type "classified Professional@DNI" to unlock Restricted Vault directly.',
    'ctiic': 'Type "classified Professional@DNI" to unlock Restricted Vault directly.',
    'proverb': '“अंतः अस्ति प्रारंभः” — End is Beginning (Guiding Philosophy)',
    'social': 'FB: https://www.facebook.com/shahsaiman | IG: https://www.instagram.com/shah_saiman | X: https://x.com/sah_saiman | Threads: https://www.threads.net/@shah_saiman',
    'cars': 'BYD Atto 3 Owner (Max Speed 130 km/h) | Dream Car: New Land Rover Defender 110',
    'gaming': 'PC: GTA V (3x), RDR 2 (2x), Hitman 3, COD Series. Console: PS5 Gamer',
    'skills': 'Software Dev & Debugging, Cybersecurity & Ethical Hacking, Core Leadership.',
    'education': '+2 Science / Computer Science (Completed), SEE (Completed)',
    'contact': 'Location: Nepal | Email: me@saimansah.com.np | Phone: +977 9749933211 | Socials: FB, IG, X, Threads'
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

        if (['dni', 'odni', 'ctiic', 'classified', 'vault', 'undercover', 'covert'].includes(mainCmd)) {
          if (passArg === 'Professional@DNI' || (passArg && attemptUnlockVault(passArg))) {
            openVaultModal();
            attemptUnlockVault('Professional@DNI');
            line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br><span style="color:#00f3ff;font-weight:bold;">[ACCESS GRANTED — RESTRICTED ACCESS LEVEL 5 UNLOCKED]</span><br>Head of Department — ODNI CTIIC (Undercover) Department (Aug 31, 2024 – Jul 22, 2026 / 690 Days). Classified Vault Unlocked!`;
          } else {
            line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br><span style="color:#ff0055">[RESTRICTED VAULT LOCKED] Enter valid clearance key e.g.: 'classified Professional@DNI' or use the Classified Vault button in the header.</span>`;
          }
          termOutput.appendChild(line);
          termOutput.scrollTop = termOutput.scrollHeight;
          return;
        }

        if (COMMANDS[mainCmd]) {
          line.innerHTML = `<span class="prompt">$ ${rawCmd}</span><br>${COMMANDS[mainCmd]}`;
        } else {
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
      "Security Engineer",
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
        desc: "1st Dream Car — Ultimate luxury 4x4 off-road terrain capability, robust aluminum architecture, and iconic adventure engineering.",
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
          }, 150);
        }
      });
    });
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

