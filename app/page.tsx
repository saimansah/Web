import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { MobileDock } from "@/components/ui/MobileDock";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col pb-16 lg:pb-0">
      {/* Sticky Glassmorphic Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Production Projects Showcase */}
      <Projects />

      {/* Filterable Engineering Arsenal */}
      <SkillsMatrix />

      {/* Official ODNI CTIIC Record & Timeline */}
      <ExperienceTimeline />

      {/* Personal Expeditions, Garage & Gaming */}
      <BeyondCode />

      {/* Encrypted Direct Contact & Networks */}
      <Contact />

      {/* System Footer */}
      <Footer />

      {/* Automatic Mobile Dock */}
      <MobileDock />
    </main>
  );
}
