import { Project, SkillItem, TimelineEvent } from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "Saiman Sah",
  role: "Full-Stack Developer & Security Specialist",
  title: "Full-Stack Developer | Cyber Executive | Ethical Hacker",
  email: "me@saimansah.com.np",
  location: "Kathmandu, Nepal",
  locationShort: "Nepal 🇳🇵",
  philosophySanskrit: "अन्तः अस्ति प्रारम्भः",
  philosophyEnglish: "End is Beginning",
  status: "Open for New Projects & Consulting",
  bio: "Self-taught developer and cybersecurity researcher from Nepal. Former Cyber Executive at ODNI CTIIC (Badge #118). I build modern web applications, secure software systems, and interactive digital experiences.",
  stats: [
    { label: "Code Integrity", value: "100%" },
    { label: "ODNI CTIIC Service", value: "690 Days" },
    { label: "Highest Trek Point", value: "4,200 m" },
    { label: "Top Speed Record", value: "130 km/h" },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/saiman-sah-0877b9435/",
    twitter: "https://x.com/sah_saiman",
    threads: "https://www.threads.net/@shah_saiman",
    instagram: "https://www.instagram.com/shah_saiman",
    facebook: "https://www.facebook.com/shahsaiman",
  },
  garage: {
    carsOwned: [
      {
        name: "BYD Atto 3",
        model: "Electric SUV",
        specs: "Blade Battery • 130 km/h Top Speed Record",
        image: "/assets/byd_atto3.png",
      },
      {
        name: "MG ZS EV",
        model: "Electric SUV",
        specs: "Permanent Magnet Motor • Fast Charging",
      },
    ],
  },
  dniDossier: {
    agency: "ODNI CTIIC",
    agencyFull: "Office of the Director of National Intelligence (USA) • Cyber Threat Intelligence Integration Center",
    role: "Cyber Executive",
    badgeNumber: "118",
    tenureAd: "Aug 31, 2024 – Jul 22, 2026",
    tenureBs: "Bhadra 15, 2081 – Shrawan 6, 2083 B.S.",
    duration: "1 Year, 10 Months, 22 Days (690 Days)",
    clearanceLevel: "Verified Executive",
    responsibilities: [
      "Led technical project workflows and coordinated developer teams on core security software.",
      "Built reliable software architectures with strong security practices and automated testing.",
      "Ran vulnerability assessments, penetration testing, and threat prevention across digital systems.",
      "Maintained encrypted communication channels and digital privacy for security operations.",
    ],
  },
};

export const PROJECTS: Project[] = [
  {
    id: "sentinel-threat-engine",
    title: "Sentinel Network Threat Detector",
    tagline: "Real-Time Network Monitoring & Anomaly Detection",
    description: "A fast network monitoring tool that analyzes network traffic in real time, detects suspicious activity, and blocks security threats before they enter your system.",
    category: "cybersecurity",
    technologies: ["Rust", "TypeScript", "Next.js", "eBPF", "Tailwind CSS", "Redis"],
    metrics: [
      { label: "Response Time", value: "< 2.4 ms" },
      { label: "Speed", value: "1.2M pkt/s" },
      { label: "Accuracy", value: "99.99%" },
    ],
    featured: true,
    accentColor: "cyan",
    liveUrl: "https://saimansah.com.np",
  },
  {
    id: "aether-iot-gateway",
    title: "Aether Trekking Weather & GPS Tracker",
    tagline: "Rugged Outdoor Tracker for Himalayan Mountain Treks",
    description: "A battery-powered tracker built for high-altitude mountain hiking. Tracks elevation, temperature, atmospheric pressure, and GPS coordinates over long-range radio.",
    category: "iot",
    technologies: ["C++", "FreeRTOS", "ESP32", "MQTT", "WebSockets", "React"],
    metrics: [
      { label: "Tested Height", value: "4,200 m" },
      { label: "Battery Life", value: "21 Days" },
      { label: "Reliability", value: "99.6%" },
    ],
    featured: true,
    accentColor: "amber",
  },
  {
    id: "nexus-spatial-engine",
    title: "Nexus 3D Web Visualizer",
    tagline: "Interactive 3D Graphics & Particle Animations",
    description: "An interactive 3D web canvas that lets users explore floating particle networks, smooth lighting effects, and GPU-powered animations in real time.",
    category: "web",
    technologies: ["Three.js", "WebGL", "Next.js", "GLSL Shaders", "GSAP", "Socket.io"],
    metrics: [
      { label: "Frame Rate", value: "60-120 FPS" },
      { label: "Performance", value: "Smooth" },
      { label: "Sync", value: "Realtime" },
    ],
    featured: true,
    accentColor: "violet",
    liveUrl: "https://saimansah.com.np",
  },
  {
    id: "apex-automotive-telematics",
    title: "Apex Electric Vehicle Dashboard",
    tagline: "Live Car Telemetry & Battery Health Monitor",
    description: "A clean dashboard for electric vehicles that displays live driving speed, battery percentage, motor temperature, and energy efficiency using car sensor data.",
    category: "systems",
    technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "CAN-bus", "Chart.js"],
    metrics: [
      { label: "Top Speed Tested", value: "130 km/h" },
      { label: "Data Refresh", value: "50 times/sec" },
    ],
    featured: false,
    accentColor: "emerald",
  },
];

export const SKILLS: SkillItem[] = [
  // Frontend
  { name: "Next.js & React", level: "Advanced", category: "frontend", featured: true },
  { name: "TypeScript", level: "Advanced", category: "frontend", featured: true },
  { name: "Tailwind CSS", level: "Advanced", category: "frontend", featured: true },
  { name: "Framer Motion", level: "Advanced", category: "frontend", featured: true },
  { name: "GSAP Animations", level: "Advanced", category: "frontend", featured: true },
  { name: "Three.js & WebGL", level: "Intermediate", category: "frontend", featured: true },
  { name: "HTML5 & CSS3", level: "Advanced", category: "frontend" },
  { name: "Responsive Design", level: "Advanced", category: "frontend" },

  // Backend
  { name: "Node.js & Express", level: "Advanced", category: "backend", featured: true },
  { name: "Python & FastAPI", level: "Advanced", category: "backend", featured: true },
  { name: "Rust", level: "Intermediate", category: "backend", featured: true },
  { name: "PostgreSQL", level: "Advanced", category: "backend" },
  { name: "Redis", level: "Advanced", category: "backend" },
  { name: "REST APIs", level: "Advanced", category: "backend" },
  { name: "WebSockets", level: "Advanced", category: "backend" },

  // Embedded & IoT
  { name: "C / C++", level: "Advanced", category: "embedded", featured: true },
  { name: "FreeRTOS", level: "Intermediate", category: "embedded", featured: true },
  { name: "ESP32 & Arduino", level: "Advanced", category: "embedded", featured: true },
  { name: "MQTT Protocol", level: "Advanced", category: "embedded" },
  { name: "CAN-bus Systems", level: "Intermediate", category: "embedded" },
  { name: "Hardware Sensors", level: "Advanced", category: "embedded" },

  // Security & Tooling
  { name: "Ethical Hacking", level: "Advanced", category: "security", featured: true },
  { name: "Vulnerability Auditing", level: "Advanced", category: "security", featured: true },
  { name: "Network Security", level: "Advanced", category: "security", featured: true },
  { name: "Online Privacy & OPSEC", level: "Advanced", category: "security", featured: true },
  { name: "Linux Administration", level: "Advanced", category: "security" },
  { name: "Docker", level: "Intermediate", category: "security" },
  { name: "Git & Version Control", level: "Advanced", category: "security" },
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "ctiic-leadership",
    period: "Aug 31, 2024 – Jul 22, 2026",
    duration: "690 Days (1 Year, 10 Months, 22 Days)",
    title: "Cyber Executive",
    organization: "ODNI CTIIC (Cyber Threat Intelligence Integration Center)",
    location: "United States (Verified Record)",
    roleType: "Technical & Executive Leadership",
    highlightBadge: "VERIFIED RECORD",
    badgeNumber: "BADGE NO. 118",
    isVerifiedRecord: true,
    description: [
      "Served as Cyber Executive leading technical operations, system architecture, and development teams.",
      "Built automated security tools to detect, analyze, and fix vulnerabilities across computer systems.",
      "Set up secure communication channels and privacy protocols for critical projects.",
      "Guided developer teams to follow strong security and software engineering standards.",
    ],
    skills: ["Leadership", "System Security", "Threat Detection", "Secure Coding", "Vulnerability Testing"],
  },
  {
    id: "self-learned-mastery",
    period: "Ongoing Journey",
    duration: "Continuous Learning",
    title: "Self-Taught Full-Stack Developer & Security Researcher",
    organization: "Independent Learning & Open Source",
    location: "Nepal 🇳🇵",
    roleType: "Software & Systems Development",
    highlightBadge: "100% SELF-TAUGHT",
    description: [
      "Learned programming, web development, and cybersecurity through independent study, hands-on projects, and real-world experiments.",
      "Built web applications with Next.js, TypeScript, and Python, focusing on clean design and fast performance.",
      "Explored microcontrollers, electronics, and hardware sensors to build real-world tracking devices.",
    ],
    skills: ["Next.js", "TypeScript", "Python", "C++", "Three.js", "Tailwind CSS", "Linux"],
  },
  {
    id: "academic-foundation",
    period: "Education",
    duration: "Completed",
    title: "High School & Computer Science Education",
    organization: "+2 Science / Computer Science & SEE",
    location: "Nepal",
    roleType: "Academic Studies",
    description: [
      "Completed Higher Secondary Education (+2 Science) with a major in Computer Science.",
      "Passed Secondary Education Examination (SEE), building a strong foundation in math, logic, and physics.",
    ],
    skills: ["Computer Science", "Algorithms", "Mathematics", "Physics"],
  },
];
