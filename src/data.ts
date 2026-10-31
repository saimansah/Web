export type CredentialCategory = "build" | "ai" | "security";

export interface CredentialFile {
  label: string;
  href: string;
}

export interface Credential {
  number: string;
  category: CredentialCategory;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issuerMark?: string;
  note: string;
  files: CredentialFile[];
  featured?: boolean;
}

export const credentialFilters: ReadonlyArray<{
  id: "all" | CredentialCategory;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "build", label: "Software & cloud" },
  { id: "ai", label: "AI & governance" },
  { id: "security", label: "Security & digital" },
];

const certificateUrl = (filename: string) => `/assets/certificates/${filename}`;

export const credentials: Credential[] = [
  {
    number: "01",
    category: "ai",
    title: "Arms Trade Treaty Annual Reporting Course",
    issuer: "United Nations",
    issuerLogo: "/assets/unitednations.svg",
    note: "Course completion",
    featured: true,
    files: [{ label: "Arms Trade Treaty Annual Reporting Course", href: certificateUrl("un-certificate.pdf") }],
  },
  {
    number: "02",
    category: "security",
    title: "Google Ads Search Professional Certification (2026)",
    issuer: "Google",
    issuerLogo: "/assets/google.svg",
    issuerMark: "G",
    note: "Professional certification",
    files: [{ label: "Google Ads Search Professional Certification (2026)", href: certificateUrl("google-ads-search-professional.pdf") }],
  },
  {
    number: "03",
    category: "build",
    title: "Official Transcript",
    issuer: "Credly",
    issuerMark: "CR",
    note: "Official record",
    files: [{ label: "Official Transcript", href: certificateUrl("credly-credential-transcript.pdf") }],
  },
  {
    number: "04",
    category: "build",
    title: "Software Engineer",
    issuer: "HackerRank",
    issuerLogo: "/assets/hackerrank.svg",
    note: "Role certification",
    files: [{ label: "Software Engineer", href: certificateUrl("hackerrank-software-engineer.pdf") }],
  },
  {
    number: "05",
    category: "build",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    issuerLogo: "/assets/hackerrank.svg",
    note: "Skill certification",
    files: [{ label: "SQL (Advanced)", href: certificateUrl("hackerrank-sql-advanced.pdf") }],
  },
  {
    number: "06",
    category: "security",
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    issuerLogo: "/assets/cisco.svg",
    issuerMark: "CISCO",
    note: "Course completion",
    files: [{ label: "Ethical Hacker", href: certificateUrl("cisco-ethical-hacker.pdf") }],
  },
  {
    number: "07",
    category: "build",
    title: "AWS SimuLearn: Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerLogo: "/assets/aws.svg",
    note: "Completion certificate",
    files: [{ label: "AWS SimuLearn: Cloud Practitioner", href: certificateUrl("aws-training-certification.pdf") }],
  },
  {
    number: "08",
    category: "build",
    title: "Data Privacy Fundamentals & Beyond the Basics: Istio and IBM Cloud Kubernetes Service",
    issuer: "IBM",
    issuerLogo: "/assets/ibm.svg",
    note: "Two credentials",
    files: [
      { label: "Data Privacy Fundamentals", href: certificateUrl("ibm-certificate-i.pdf") },
      { label: "Beyond the Basics: Istio and IBM Cloud Kubernetes Service", href: certificateUrl("ibm-certificate-ii.pdf") },
    ],
  },
  {
    number: "09",
    category: "build",
    title: "Security monitoring and governance & Introduction to Zero Trust and best practice frameworks",
    issuer: "Microsoft Learn",
    issuerLogo: "/assets/microsoft.svg",
    note: "Three documents",
    files: [
      { label: "Security monitoring and governance (September 25, 2026)", href: certificateUrl("microsoft-achievements-1.pdf") },
      { label: "Security monitoring and governance (September 29 export)", href: certificateUrl("microsoft-achievements-2.pdf") },
      { label: "Introduction to Zero Trust and best practice frameworks", href: certificateUrl("microsoft-achievements-zero-trust.pdf") },
    ],
  },
  {
    number: "10",
    category: "build",
    title: "Building AI-Powered Search with MongoDB Vector Search",
    issuer: "MongoDB · Credly",
    issuerMark: "MDB",
    note: "MongoDB Skill",
    files: [{ label: "Building AI-Powered Search with MongoDB Vector Search", href: certificateUrl("skills-cert.pdf") }],
  },
  {
    number: "11",
    category: "ai",
    title: "Artificial Intelligence (AI) for Social Impact",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "Artificial Intelligence (AI) for Social Impact", href: certificateUrl("adbi-ai-social-impact.pdf") }],
  },
  {
    number: "12",
    category: "ai",
    title: "Strategic Planning in the AI Age",
    issuer: "HP LIFE",
    issuerMark: "HP",
    note: "Course certificate",
    files: [{ label: "Strategic Planning in the AI Age", href: certificateUrl("strategic-planning-ai-age.pdf") }],
  },
  {
    number: "13",
    category: "security",
    title: "Digital Public Infrastructure (DPI): Foundations, Applications, and Future Pathways",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "Digital Public Infrastructure (DPI): Foundations, Applications, and Future Pathways", href: certificateUrl("adbi-dpi-foundations.pdf") }],
  },
  {
    number: "14",
    category: "security",
    title: "Cybersecurity",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "Cybersecurity", href: certificateUrl("adbi-cybersecurity.pdf") }],
  },
  {
    number: "15",
    category: "security",
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE",
    issuerMark: "HP",
    note: "Course certificate",
    files: [{ label: "Introduction to Cybersecurity Awareness", href: certificateUrl("cybersecurity-awareness.pdf") }],
  },
  {
    number: "16",
    category: "security",
    title: "Rights and Obligations in E-commerce",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "Rights and Obligations in E-commerce", href: certificateUrl("adbi-rights-obligations-e-commerce.pdf") }],
  },
];

export const skills = [
  { label: "Web", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Code", items: ["Python", "C++", "Advanced SQL"] },
  { label: "3D and systems", items: ["Three.js", "WebGL", "GLSL", "ESP32"] },
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/sahsaiman", icon: "/assets/facebook.svg" },
  { label: "X", href: "https://x.com/sah_saiman", icon: "/assets/x.svg" },
  { label: "Instagram", href: "https://www.instagram.com/sah_saiman", icon: "/assets/instagram.svg" },
  { label: "Threads", href: "https://www.threads.com/@sah_saiman", icon: "/assets/threads.svg" },
  { label: "Truth Social", href: "https://truthsocial.com/sah_saiman", icon: "/assets/truthsocial.svg" },
];
