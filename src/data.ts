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
    category: "build",
    title: "Credly badge transcript",
    issuer: "Credly",
    issuerMark: "CR",
    note: "Official record",
    featured: true,
    files: [{ label: "Credential transcript", href: certificateUrl("credly-credential-transcript.pdf") }],
  },
  {
    number: "02",
    category: "build",
    title: "AWS SimuLearn: Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerLogo: "/assets/aws.svg",
    note: "Completion certificate",
    files: [{ label: "AWS SimuLearn completion certificate", href: certificateUrl("aws-training-certification.pdf") }],
  },
  {
    number: "03",
    category: "build",
    title: "Software Engineer Certification",
    issuer: "HackerRank",
    issuerLogo: "/assets/hackerrank.svg",
    note: "Engineering",
    files: [{ label: "Software Engineer certificate", href: certificateUrl("hackerrank-software-engineer.pdf") }],
  },
  {
    number: "04",
    category: "build",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    issuerLogo: "/assets/hackerrank.svg",
    note: "Data and SQL",
    files: [{ label: "Advanced SQL certificate", href: certificateUrl("hackerrank-sql-advanced.pdf") }],
  },
  {
    number: "05",
    category: "build",
    title: "IBM credentials",
    issuer: "IBM",
    issuerLogo: "/assets/ibm.svg",
    note: "Two credentials",
    files: [
      { label: "Data Privacy Fundamentals", href: certificateUrl("ibm-certificate-i.pdf") },
      { label: "Beyond the Basics: Istio and IBM Cloud Kubernetes Service", href: certificateUrl("ibm-certificate-ii.pdf") },
    ],
  },
  {
    number: "06",
    category: "build",
    title: "Microsoft Learn achievements",
    issuer: "Microsoft Learn",
    issuerLogo: "/assets/microsoft.svg",
    note: "Three documents",
    files: [
      { label: "Security monitoring and governance (September 25)", href: certificateUrl("microsoft-achievements-1.pdf") },
      { label: "Security monitoring and governance (September 29 export)", href: certificateUrl("microsoft-achievements-2.pdf") },
      { label: "Introduction to Zero Trust and best practice frameworks", href: certificateUrl("microsoft-achievements-zero-trust.pdf") },
    ],
  },
  {
    number: "07",
    category: "build",
    title: "Building AI-powered search with MongoDB Vector Search",
    issuer: "MongoDB · Credly",
    issuerMark: "MDB",
    note: "Digital badge",
    files: [{ label: "MongoDB AI search credential", href: certificateUrl("skills-cert.pdf") }],
  },
  {
    number: "08",
    category: "ai",
    title: "Artificial Intelligence for Social Impact",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "AI for Social Impact certificate", href: certificateUrl("adbi-ai-social-impact.pdf") }],
  },
  {
    number: "09",
    category: "ai",
    title: "Strategic Planning in the AI Age",
    issuer: "HP LIFE",
    issuerMark: "HP",
    note: "Course certificate",
    files: [{ label: "Strategic Planning in the AI Age certificate", href: certificateUrl("strategic-planning-ai-age.pdf") }],
  },
  {
    number: "10",
    category: "ai",
    title: "United Nations certificate",
    issuer: "United Nations",
    issuerLogo: "/assets/unitednations.svg",
    note: "Global learning",
    files: [{ label: "United Nations certificate", href: certificateUrl("un-certificate.pdf") }],
  },
  {
    number: "11",
    category: "security",
    title: "Cybersecurity",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "ADBI Cybersecurity certificate", href: certificateUrl("adbi-cybersecurity.pdf") }],
  },
  {
    number: "12",
    category: "security",
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE",
    issuerMark: "HP",
    note: "Course certificate",
    files: [{ label: "Cybersecurity Awareness certificate", href: certificateUrl("cybersecurity-awareness.pdf") }],
  },
  {
    number: "13",
    category: "security",
    title: "Digital Public Infrastructure: Foundations",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "DPI Foundations certificate", href: certificateUrl("adbi-dpi-foundations.pdf") }],
  },
  {
    number: "14",
    category: "security",
    title: "Rights and Obligations in E-Commerce",
    issuer: "Asian Development Bank Institute",
    issuerMark: "ADBI",
    note: "ADBI e-learning",
    files: [{ label: "Rights and Obligations in E-Commerce certificate", href: certificateUrl("adbi-rights-obligations-e-commerce.pdf") }],
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
