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
    default: "Saiman Sah | Chairman of AI Alliance (Nepal), Full-Stack Engineer & Creative Technologist",
    template: "%s | Saiman Sah",
  },
  description:
    "Official Portfolio & Dossier of Saiman Sah — Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist based in Nepal.",
  keywords: [
    "Saiman Sah",
    "Saiman",
    "Shah Saiman",
    "Chairman of AI Alliance",
    "AI Alliance Nepal",
    "AI Alliance",
    "Full-Stack Engineer",
    "Creative Technologist",
    "Cybersecurity Researcher",
    "Next.js Developer Nepal",
    "TypeScript Developer",
    "Kathmandu Developer",
    "Nepal Cyber Security",
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
    title: "Saiman Sah | Chairman of AI Alliance (Nepal), Full-Stack Engineer & Creative Technologist",
    description:
      "Official portfolio & dossier of Saiman Sah. Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist based in Nepal.",
    url: "https://saimansah.com.np",
    siteName: "Saiman Sah Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 630,
        alt: "Saiman Sah - Chairman of AI Alliance (Nepal) & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiman Sah | Chairman of AI Alliance (Nepal) & Full-Stack Engineer",
    description:
      "Official portfolio & dossier of Saiman Sah. Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist.",
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
      "alternateName": ["Saiman", "Shah Saiman", "Saiman Sah Nepal"],
      "url": "https://saimansah.com.np",
      "image": "https://saimansah.com.np/assets/profile.png",
      "jobTitle": "Chairman of AI Alliance (Nepal) & Full-Stack Engineer",
      "description":
        "Chairman of AI Alliance (Nepal), Full-Stack Engineer, and Creative Technologist based in Nepal.",
      "sameAs": [
        "https://www.linkedin.com/in/saiman-sah-0877b9435/",
        "https://x.com/sah_saiman",
        "https://github.com/saimansah",
        "https://www.instagram.com/shah_saiman",
        "https://www.facebook.com/shahsaiman",
        "https://www.threads.net/@shah_saiman",
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kathmandu",
        "addressCountry": "Nepal",
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Full-Stack Web Development",
        "Cybersecurity",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Rust",
        "Node.js",
        "Python",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://saimansah.com.np/#website",
      "url": "https://saimansah.com.np",
      "name": "Saiman Sah Portfolio",
      "description":
        "Official Portfolio & Dossier of Saiman Sah — Chairman of AI Alliance (Nepal) & Full-Stack Engineer",
      "publisher": {
        "@id": "https://saimansah.com.np/#person",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://saimansah.com.np/#webpage",
      "url": "https://saimansah.com.np",
      "name": "Saiman Sah | Chairman of AI Alliance (Nepal), Full-Stack Engineer & Creative Technologist",
      "isPartOf": {
        "@id": "https://saimansah.com.np/#website",
      },
      "about": {
        "@id": "https://saimansah.com.np/#person",
      },
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
