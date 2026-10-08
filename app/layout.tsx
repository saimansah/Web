import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saimansah.com.np"),
  title: {
    default: "Saiman Sah | Chairperson of AI Alliance (Nepal) & Full-Stack Engineer",
    template: "%s | Saiman Sah",
  },
  description:
    "Official Portfolio & Knowledge Dossier of Saiman Sah — Chairperson and Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist based in Nepal.",
  keywords: [
    "Saiman Sah",
    "Saiman",
    "Shah Saiman",
    "Saiman Sah Chairperson",
    "Saiman Sah Chairman",
    "Chairperson of AI Alliance",
    "Chairperson of AI Alliance Nepal",
    "Chairman of AI Alliance",
    "Chairman of AI Alliance Nepal",
    "AI Alliance Nepal Chairperson",
    "AI Alliance Nepal Chairman",
    "AI Alliance Nepal",
    "AI Alliance",
    "Full-Stack Engineer Nepal",
    "Creative Technologist",
    "Cybersecurity Researcher Nepal",
    "Next.js Developer Nepal",
    "TypeScript Developer Nepal",
    "Kathmandu Developer",
    "Nepal AI Leader",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Saiman Sah", url: "https://saimansah.com.np" }],
  creator: "Saiman Sah",
  publisher: "Saiman Sah",
  alternates: {
    canonical: "https://saimansah.com.np",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/s_logo.svg",
    shortcut: "/assets/s_logo.svg",
    apple: "/assets/s_logo.svg",
  },
  openGraph: {
    title: "Saiman Sah | Chairperson of AI Alliance (Nepal) & Full-Stack Engineer",
    description:
      "Official portfolio & knowledge dossier of Saiman Sah — Chairperson and Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist based in Nepal.",
    url: "https://saimansah.com.np",
    siteName: "Saiman Sah Portfolio & AI Alliance (Nepal)",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 630,
        alt: "Saiman Sah - Chairperson of AI Alliance (Nepal) & Full-Stack Engineer",
      },
      {
        url: "/assets/ai_alliance_logo.png",
        width: 800,
        height: 800,
        alt: "AI Alliance (Nepal) Official Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiman Sah | Chairperson of AI Alliance (Nepal) & Full-Stack Engineer",
    description:
      "Official portfolio & knowledge dossier of Saiman Sah — Chairperson and Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist.",
    creator: "@sah_saiman",
    images: ["/assets/profile.png"],
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://saimansah.com.np/#person",
      "name": "Saiman Sah",
      "alternateName": [
        "Shah Saiman",
        "Saiman",
        "Saiman Sah Nepal",
        "Chairperson Saiman Sah",
        "Chairman Saiman Sah",
      ],
      "url": "https://saimansah.com.np",
      "image": "https://saimansah.com.np/assets/profile.png",
      "jobTitle": "Chairperson & Chairman of AI Alliance (Nepal)",
      "description":
        "Chairperson and Chairman of AI Alliance (Nepal), Full-Stack Software Engineer, and Creative Technologist based in Kathmandu, Nepal.",
      "worksFor": {
        "@id": "https://saimansah.com.np/#organization",
      },
      "memberOf": {
        "@id": "https://saimansah.com.np/#organization",
      },
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Chairperson of AI Alliance",
        "occupationLocation": {
          "@type": "AdministrativeArea",
          "name": "Nepal",
        },
        "skills": [
          "Artificial Intelligence Strategy",
          "Machine Learning",
          "Executive Leadership",
          "Full-Stack Web Development",
          "Cybersecurity",
          "System Architecture",
        ],
      },
      "sameAs": [
        "https://www.linkedin.com/in/saiman-sah-0877b9435/",
        "https://x.com/sah_saiman",
        "https://github.com/saimansah",
        "https://www.instagram.com/sah_saiman",
        "https://www.facebook.com/sahsaiman",
        "https://www.threads.net/@shah_saiman",
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kathmandu",
        "addressCountry": "Nepal",
      },
      "knowsAbout": [
        "AI Alliance (Nepal)",
        "Artificial Intelligence",
        "AI Governance",
        "Machine Learning",
        "Full-Stack Web Development",
        "Cybersecurity",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Python",
        "Rust",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://saimansah.com.np/#organization",
      "name": "AI Alliance (Nepal)",
      "alternateName": [
        "AI Alliance Nepal",
        "Artificial Intelligence Alliance Nepal",
        "AI Alliance",
      ],
      "url": "https://saimansah.com.np",
      "logo": "https://saimansah.com.np/assets/ai_alliance_logo.png",
      "image": "https://saimansah.com.np/assets/ai_alliance_logo.png",
      "description":
        "National Artificial Intelligence innovation, research, and developer community hub in Nepal, led by Chairperson Saiman Sah.",
      "founder": {
        "@id": "https://saimansah.com.np/#person",
      },
      "leader": {
        "@id": "https://saimansah.com.np/#person",
      },
      "chairperson": {
        "@id": "https://saimansah.com.np/#person",
      },
      "areaServed": "Nepal",
    },
    {
      "@type": "WebSite",
      "@id": "https://saimansah.com.np/#website",
      "url": "https://saimansah.com.np",
      "name": "Saiman Sah — Chairperson of AI Alliance (Nepal)",
      "description":
        "Official Portfolio, Knowledge Dossier & Engineering Platform of Saiman Sah — Chairperson of AI Alliance (Nepal).",
      "publisher": {
        "@id": "https://saimansah.com.np/#person",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://saimansah.com.np/#webpage",
      "url": "https://saimansah.com.np",
      "name": "Saiman Sah | Chairperson of AI Alliance (Nepal), Full-Stack Engineer & Creative Technologist",
      "isPartOf": {
        "@id": "https://saimansah.com.np/#website",
      },
      "about": [
        {
          "@id": "https://saimansah.com.np/#person",
        },
        {
          "@id": "https://saimansah.com.np/#organization",
        },
      ],
      "mainEntity": {
        "@id": "https://saimansah.com.np/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <meta name="subject" content="Saiman Sah - Chairperson of AI Alliance (Nepal)" />
        <meta name="topic" content="AI Alliance Nepal Chairperson" />
        <meta
          name="classification"
          content="Artificial Intelligence, Software Engineering, Technology Leadership"
        />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian-950 font-sans text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-300 min-h-screen relative overflow-x-hidden">
        {/* Subtle noise grain filter */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Client side providers (Lenis, Custom Cursor, Canvas Particle Field) */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
