/* ==========================================================================
   SAIMAN SAH PORTFOLIO — INTERACTIVE ENGINE, BILINGUAL I18N & ENTRY GATEWAY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- DICTIONARY FOR ENGLISH AND NEPALI TRANSLATION ---
  const i18n = {
    en: {
      nav_about: "About",
      nav_dni: "ODNI CTIIC",
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
      badge_pro_path: "CAREER & SECURITY",
      title_pro_path: "Professional Portfolio",
      desc_pro_path: "ODNI CTIIC Head of Dept leadership tenure, cybersecurity operations, software engineering, and academic credentials.",
      btn_enter_pro: "Enter Professional View",

      badge_personal_path: "CARS & GAMING",
      title_personal_path: "Personal Life & Hobbies",
      desc_personal_path: "BYD Atto 3 EV (130 km/h record),  Land Rover Defender 110 dream, PC Gaming (GTA V 3x, RDR 2 2x, COD, Hitman 3) & PS5.",
      btn_enter_personal: "Enter Personal & Gaming View",
      hint_lang: "Change Language:",

      badge_role: "Ethical Hacker & Developer",
      hero_hi: "Hi, I'm",
      hero_tagline: "Developer | Ethical Hacker | Tech Enthusiast | Cybersecurity Researcher | Debugger",
      hero_bio: "Based in Nepal, I build, debug, and secure digital applications. With a strong background in computer science and experience leading technical operations, I focus on building efficient software, uncovering vulnerabilities, and solving complex technical challenges.",
      info_location: "Location: Nepal 🇳🇵",
      info_dob: "DOB: July 21, 2008",
      info_dob_bs: "(B.S.: Shrawan 6, 2065 BS)",
      btn_contact_me: "Get in Touch",
      btn_view_dni: "ODNI CTIIC Tenure",
      dni_role_title: "Head of Department",
      tag_leadership: "PAST EXPERIENCE & LEADERSHIP",
      dni_heading: "Head of Department —",
      dni_date: "Aug 31, 2024 – Jul 22, 2026",
      dni_date_bs: "Bhadra 15, 2081 – Shrawan 7, 2083 BS",
      dni_date_bs_full: "Nepali Date (B.S.): Bhadra 15, 2081 – Shrawan 7, 2083 BS",
      dni_duration: "Duration: 1 Year, 10 Months, 22 Days",
      dni_duration_full: "Total Tenure: 1 Year, 10 Months, 22 Days (690 Days)",

      pillar1_title: "Departmental Management",
      pillar1_desc: "Led overall operations, managing team workflows, project timelines, and strategic execution across departmental initiatives.",
      pillar2_title: "Technical Oversight & Debugging",
      pillar2_desc: "Directed software processes, system testing, and troubleshooting to maintain system stability and reliability.",
      pillar3_title: "Team Leadership & Strategy",
      pillar3_desc: "Supervised team members, delegated technical responsibilities, and aligned project goals with broader organization objectives.",
      pillar4_title: "Security & Problem Solving",
      pillar4_desc: "Acted as the primary point of escalation for critical technical issues, performing root-cause analysis and implementing long-term technical solutions.",

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
      ph_name: "Your Name",
      ph_email: "Your Email",
      ph_msg: "Your Message",
      btn_send: "Send Message",
      btn_terminal: "Terminal",
      msg_sent: "Thank you! Your message has been dispatched to saiman@academystg.space.",

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
      pc_platform_tag: "All Completed on Custom PC Rig",
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
      ps5_status_desc: "Immersed in next-gen 4K 120Hz console gaming, DualSense haptic feedback titles, and PS5 console exclusives."
    },

    ne: {
      nav_about: "बारेमा",
      nav_dni: "ODNI CTIIC",
      nav_skills: "सीपहरू",
      nav_edu: "शिक्षा",
      nav_contact: "सम्पर्क",
      nav_personal_about: "प्रविधि बाहिर",
      nav_personal_garage: "ग्यारेज र गाडीहरू",
      nav_personal_gaming: "गेमिङ",
      btn_switch_mode: "मोड फेर्नुहोस्",

      // GATEWAY MODAL TRANSLATIONS (NEPALI)
      gateway_title: "प्रवेश गर्न मोड चयन गर्नुहोस्",
      gateway_subtitle: "व्यावसायिक प्राविधिक उपलब्धिहरू वा व्यक्तिगत गेमिङ र गाडीहरूको विवरण हेर्न आफ्नो मार्ग रोज्नुहोस्।",
      badge_pro_path: "करियर र सुरक्षा",
      title_pro_path: "व्यावसायिक पोर्टफोलियो",
      desc_pro_path: "ODNI CTIIC विभाग प्रमुखको नेतृत्व, साइबर सुरक्षा, सफ्टवेयर इन्जिनियरिङ र शैक्षिक योग्यता।",
      btn_enter_pro: "व्यावसायिक मोडमा प्रवेश गर्नुहोस्",

      badge_personal_path: "गाडीहरू र गेमिङ",
      title_personal_path: "व्यक्तिगत जीवन र रुचिहरू",
      desc_personal_path: "BYD Atto 3 EV (१३० किमी/घण्टा रेकर्ड), New Land Rover Defender 110, PC गेमिङ (GTA V ३x, RDR 2 २x, COD, Hitman 3) र PS5।",
      btn_enter_personal: "व्यक्तिगत तथा गेमिङ मोडमा प्रवेश गर्नुहोस्",
      hint_lang: "भाषा परिवर्तन गर्नुहोस्:",

      badge_role: "एथिकल ह्याकर र डेभलपर",
      hero_hi: "नमस्ते, म",
      hero_tagline: "डेभलपर | एथिकल ह्याकर | प्रविधि प्रेमी | साइबर सुरक्षा अनुसन्धानकर्ता | डिबगर",
      hero_bio: "नेपालमा आधारित, म डिजिटल एप्लिकेसनहरू निर्माण, डिबग र सुरक्षित गर्दछु। कम्प्युटर विज्ञानमा बलियो पृष्ठभूमि र प्राविधिक सञ्चालनको नेतृत्व गरेको अनुभवका साथ, म कुशल सफ्टवेयर निर्माण, सुरक्षा कमजोरीहरू पत्ता लगाउने र जटिल प्राविधिक चुनौतीहरू समाधान गर्नमा केन्द्रित छु।",
      info_location: "स्थान: नेपाल 🇳🇵",
      info_dob: "जन्ममिति: जुलाई २१, २००८",
      info_dob_bs: "(वि.सं.: साउन ६, २०६५)",
      btn_contact_me: "सम्पर्क गर्नुहोस्",
      btn_view_dni: "ODNI CTIIC अनुभव",
      dni_role_title: "विभाग प्रमुख (HOD)",
      tag_leadership: "विगतको अनुभव र नेतृत्व",
      dni_heading: "विभाग प्रमुख —",
      dni_date: "अगस्ट ३१, २०२४ – जुलाई २२, २०२६",
      dni_date_bs: "भदौ १५, २०८१ – साउन ७, २०८३ (वि.सं.)",
      dni_date_bs_full: "नेपाली मिति (वि.सं.): भदौ १५, २०८१ – साउन ७, २०८३",
      dni_duration: "अवधि: १ वर्ष, १० महिना, २२ दिन",
      dni_duration_full: "कुल कार्यअवधि: १ वर्ष, १० महिना, २२ दिन (६९० दिन)",

      pillar1_title: "विभागीय व्यवस्थापन",
      pillar1_desc: "विभागीय पहलहरूमा टोली कार्यप्रवाह, आयोजना तालिका, र रणनीतिक कार्यान्वयनको व्यवस्थापन गर्दै समग्र सञ्चालनको नेतृत्व गरियो।",
      pillar2_title: "प्राविधिक निरीक्षण र डिबगिङ",
      pillar2_desc: "प्रणाली स्थिरता र विश्वसनीयता कायम राख्न सफ्टवेयर प्रक्रिया, प्रणाली परीक्षण, र समस्या निवारण निर्देशित गरियो।",
      pillar3_title: "टोली नेतृत्व र रणनीति",
      pillar3_desc: "टोलीका सदस्यहरूको पर्यवेक्षण गरियो, प्राविधिक जिम्मेवारीहरू हस्तान्तरण गरियो, र व्यापक संस्थागत उद्देश्यहरूसँग परियोजना लक्ष्यहरू संरेखित गरियो।",
      pillar4_title: "सुरक्षा र समस्या समाधान",
      pillar4_desc: "गम्भीर प्राविधिक समस्याहरूको लागि प्राथमिक उत्तरदायी व्यक्ति रूपमा कार्य गर्दै मूल-कारण विश्लेषण (Root-Cause Analysis) र दीर्घकालीन प्राविधिक समाधानहरू लागू गरियो।",

      tag_skills: "प्राविधिक सीपहरू",
      skills_heading: "मुख्य प्राविधिक क्षमताहरू",
      skill1_title: "सफ्टवेयर विकास र डिबगिङ",
      skill1_desc: "सफा, कार्यमूलक कोड निर्माण, त्रुटि निवारण, र कार्यसम्पादन (Performance) अप्टिमाइज गर्ने।",
      skill2_title: "साइबर सुरक्षा र एथिकल ह्याकिङ",
      skill2_desc: "नेटवर्क सुरक्षा सिद्धान्तहरू, प्रणाली सुरक्षा कमजोरी मूल्याङ्कन, र रक्षात्मक सुरक्षा परीक्षण।",
      skill3_title: "मुख्य क्षमताहरू",
      skill3_desc: "प्राविधिक समस्या समाधान, प्रणाली विश्लेषण, टोली नेतृत्व, र परियोजना समन्वय।",

      tag_edu: "शिक्षा",
      edu_heading: "शैक्षिक योग्यता",
      edu1_title: "उच्च माध्यमिक शिक्षा (+२ विज्ञान / कम्प्युटर साइन्स)",
      edu2_title: "माध्यमिक शिक्षा परीक्षा (SEE)",
      status_completed: "सम्पन्न",

      tag_contact: "सम्पर्कमा आउनुहोस्",
      contact_heading: "साइमन शाहलाई सम्पर्क गर्नुहोस्",
      lbl_location: "स्थान:",
      lbl_email: "इमेल:",
      lbl_phone: "फोन:",
      ph_name: "तपाईंको नाम",
      ph_email: "तपाईंको इमेल",
      ph_msg: "तपाईंको सन्देश",
      btn_send: "सन्देश पठाउनुहोस्",
      btn_terminal: "टर्मिनल",
      msg_sent: "धन्यवाद! तपाईंको सन्देश saiman@academystg.space मा पठाइएको छ।",

      // PERSONAL & GAMING PAGE TRANSLATIONS (NEPALI)
      tag_personal_title: "कोड भन्दा बाहिर",
      personal_hero_title: "व्यक्तिगत जीवन, गाडी र गेमिङ संसार",
      personal_hero_subtitle: "उच्च-गतिका गाडी इन्जिनियरिङ, PC र PS5 मा महाकाव्य गेमिङ अभियानहरू पूरा गर्ने, र कस्टम टेक सेटअपहरू निर्माण गर्ने।",
      tag_garage: "ग्यारेज र गाडीहरू",
      garage_heading: "मेरो गाडी सम्बन्धी रुचि",
      badge_current_ride: "वर्तमान गाडी",
      car_atto3_title: "BYD Atto 3 (इलेक्ट्रिक SUV)",
      car_atto3_desc: "आधुनिक BYD Atto 3 इलेक्ट्रिक गाडीको गर्वित मालिक, जहाँ भविष्यको EV प्रविधि र तीव्र गति समाहित छ।",
      atto3_speed_record: "मैले रेकर्ड गरेको अधिकतम गति: १३० किमी/घण्टा",

      badge_dream_car: "सपनाको गाडी",
      car_defender_title: "नयाँ ल्याण्ड रोभर डिफेन्डर ११०",
      car_defender_desc: "नयाँ पुस्ताको लक्जरी अफ-रोड गाडी — न्यू ल्याण्ड रोभर डिफेन्डर ११० (New Defender 110) स्वामित्व प्राप्त गर्ने सपना।",
      defender_goal: "अन्तिम स्वामित्व लक्ष्य",

      tag_gaming: "गेमिङ पोर्टफोलियो",
      gaming_heading: "गेमिङ उपलब्धिहरू (PC र प्लेस्टेशन ५)",
      pc_platform_tag: "सबै PC मा पूरा गरिएको",
      gta5_stat: "३ पटक पूरा गरिएको",
      gta5_desc: "तीन अलग-अलग पटक पूरा १००% स्टोरी मोड अभियानहरू पूरा गरियो।",
      rdr2_stat: "२ पटक पूरा गरिएको",
      rdr2_desc: "Arthur Morgan र John Marston को खुला-संसारको महाकाव्य २ पटक पूरा गरियो।",
      hitman_stat: "मास्टर र पूरा गरिएको",
      hitman_desc: "स्टील्थ एसासिन अभियानहरू साइलेन्ट एसासिन रेटिङका साथ पूरा गरियो।",
      cod_stat: "सबै सिरिज पूरा गरिएको",
      cod_desc: "क्लासिक Modern Warfare देखि Black Ops सम्मका हरेक Call of Duty अभियानहरू PC मा पूरा गरियो।",

      ps5_tag: "PS5 कन्सोल गेमर",
      ps5_status_title: "सक्रिय प्लेस्टेशन ५ गेमर",
      ps5_status_desc: "4K 120Hz कन्सोल गेमिङ, DualSense ह्याप्टिक फिडब्याक र PS5 कन्सोल गेमहरू खेल्ने।"
    }
  };

  let currentLang = localStorage.getItem('saiman_lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('saiman_lang', lang);

    document.body.className = `lang-${lang}` + (gatewayOverlay && gatewayOverlay.classList.contains('open') ? ' modal-open' : '');

    // Update navbar active lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));

    const activeBtnEn = document.getElementById('lang-en');
    const activeBtnNe = document.getElementById('lang-ne');
    const modalBtnEn = document.getElementById('modal-lang-en');
    const modalBtnNe = document.getElementById('modal-lang-ne');

    if (lang === 'en') {
      if (activeBtnEn) activeBtnEn.classList.add('active');
      if (modalBtnEn) modalBtnEn.classList.add('active');
    } else {
      if (activeBtnNe) activeBtnNe.classList.add('active');
      if (modalBtnNe) modalBtnNe.classList.add('active');
    }

    // Translate DOM elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    // Translate Input Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18n[lang] && i18n[lang][key]) {
        el.placeholder = i18n[lang][key];
      }
    });
  }

  const btnEn = document.getElementById('lang-en');
  const btnNe = document.getElementById('lang-ne');
  const modalBtnEn = document.getElementById('modal-lang-en');
  const modalBtnNe = document.getElementById('modal-lang-ne');

  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
  if (btnNe) btnNe.addEventListener('click', () => setLanguage('ne'));
  if (modalBtnEn) modalBtnEn.addEventListener('click', () => setLanguage('en'));
  if (modalBtnNe) modalBtnNe.addEventListener('click', () => setLanguage('ne'));


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
    }
  }

  function closeGatewayAndSelectMode(mode) {
    if (gatewayOverlay) {
      gatewayOverlay.classList.remove('open');
      document.body.classList.remove('modal-open');
    }

    if (mode === 'personal') {
      pageProfessional.classList.remove('active');
      pagePersonal.classList.add('active');
      updateNavForMode('personal');
    } else {
      pagePersonal.classList.remove('active');
      pageProfessional.classList.add('active');
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
        <a href="#dni-experience" data-i18n="nav_dni">ODNI CTIIC</a>
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
        if (!targetHref || targetHref === '#') return;

        const targetEl = document.querySelector(targetHref);
        if (!targetEl) return;

        const inPro = pageProfessional && pageProfessional.contains(targetEl);
        const inPersonal = pagePersonal && pagePersonal.contains(targetEl);

        if (inPro && !pageProfessional.classList.contains('active')) {
          e.preventDefault();
          pagePersonal.classList.remove('active');
          pageProfessional.classList.add('active');
          updateNavForMode('pro');
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        } else if (inPersonal && !pagePersonal.classList.contains('active')) {
          e.preventDefault();
          pageProfessional.classList.remove('active');
          pagePersonal.classList.add('active');
          updateNavForMode('personal');
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      };
    });
  }

  if (selectProBtn) selectProBtn.addEventListener('click', () => closeGatewayAndSelectMode('pro'));
  if (selectPersonalBtn) selectPersonalBtn.addEventListener('click', () => closeGatewayAndSelectMode('personal'));
  if (btnReopenGateway) btnReopenGateway.addEventListener('click', openGateway);

  // Initialize Language & Open Gateway on start
  setLanguage(currentLang);
  openGateway();


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

    const characters = '01SAIMAN_SAH_ODNI_CTIIC_NEPAL_0123456789';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0);

    function drawMatrix() {
      if (!matrixActive) return;

      ctx.fillStyle = 'rgba(11, 15, 25, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 40);
  }

  const btnMatrixToggle = document.getElementById('btn-matrix-toggle');
  if (btnMatrixToggle) {
    btnMatrixToggle.addEventListener('click', () => {
      matrixActive = !matrixActive;
      canvas.style.display = matrixActive ? 'block' : 'none';
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
    'help': 'Commands: about, dni, cars, gaming, skills, education, contact, clear',
    'about': 'Saiman Sah — Developer | Ethical Hacker | Tech Enthusiast based in Nepal.',
    'dni': 'Head of Department — ODNI CTIIC Department (Aug 31, 2024 – Jul 22, 2026)',
    'cars': 'BYD Atto 3 Owner (Max Speed 130 km/h) | Dream Car: New Land Rover Defender 110',
    'gaming': 'PC: GTA V (3x), RDR 2 (2x), Hitman 3, COD Series. Console: PS5 Gamer',
    'skills': 'Software Dev & Debugging, Cybersecurity & Ethical Hacking, Core Leadership.',
    'education': '+2 Science / Computer Science (Completed), SEE (Completed)',
    'contact': 'Location: Nepal | Email: saiman@academystg.space | Phone: +977 9749933211'
  };

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';

        if (!cmd) return;

        const line = document.createElement('div');
        line.className = 'term-line';

        if (cmd === 'clear') {
          termOutput.innerHTML = '';
          return;
        }

        if (COMMANDS[cmd]) {
          line.innerHTML = `<span class="prompt">$ ${cmd}</span><br>${COMMANDS[cmd]}`;
        } else {
          line.innerHTML = `<span class="prompt">$ ${cmd}</span><br><span style="color:#ff0055">Command not found: '${cmd}'. Type 'help'.</span>`;
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

});
