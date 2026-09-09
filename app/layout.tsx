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
  title: "Saiman Sah | Full-Stack Engineer, Cyber Executive & Creative Technologist",
  description:
    "Official Portfolio & Dossier of Saiman Sah — Full-Stack Engineer, ODNI CTIIC Cyber Executive (Badge #118), and Creative Technologist based in Nepal.",
  keywords: [
    "Saiman Sah",
    "Full-Stack Engineer",
    "Cyber Executive",
    "ODNI CTIIC",
    "Creative Technologist",
    "Cybersecurity Researcher",
    "Next.js Developer",
    "TypeScript",
    "Nepal Developer",
  ],
  authors: [{ name: "Saiman Sah", url: "https://saimansah.com.np" }],
  creator: "Saiman Sah",
  icons: {
    icon: "/assets/s_logo.svg",
    apple: "/assets/s_logo.svg",
  },
  openGraph: {
    title: "Saiman Sah | Full-Stack Engineer & Cyber Executive",
    description:
      "Official portfolio of Saiman Sah. Full-Stack Engineer, ODNI CTIIC Cyber Executive (Badge #118), and Creative Technologist.",
    url: "https://saimansah.com.np",
    siteName: "Saiman Sah Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiman Sah | Full-Stack Engineer & Cyber Executive",
    description:
      "Official portfolio of Saiman Sah. Full-Stack Engineer, ODNI CTIIC Cyber Executive (Badge #118), and Creative Technologist.",
    creator: "@sah_saiman",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-obsidian-950 font-sans text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-300 min-h-screen relative overflow-x-hidden">
        {/* Subtle noise grain filter */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Client side providers (Lenis, Custom Cursor, Canvas Particle Field) */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
