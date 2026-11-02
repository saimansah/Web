# Saiman Sah — Portfolio

A responsive React, TypeScript, Tailwind CSS, Vite, and Three.js portfolio for `saimansah.com.np`. The homepage hero features a scroll-driven 3D workspace and screen portal, the certificates section showcases 20 verified credentials, the Outside Work section features a unified interactive 3D Bento showcase, and the custom 404 page renders a particle nebula and starfield.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To type-check and build the production site:

```powershell
npm run typecheck
npm run build
npm run preview
```

## Certificates

All 20 supplied PDFs are stored in `public/assets/certificates/` and linked from 20 individual certificate cards (`01`–`20`), ordered with United Nations first, followed by Google professional certifications and software, cloud, AI, and security credentials.

## Unified Outside Work Interactive Showcase

Located in `src/components/MilestoneShowcase.tsx` (with central configuration in `SAIMAN_CONFIG`) and `src/components/GarageShowroom3D.tsx`:

1. **3D Electric SUV Showroom (`BYD Atto 3` & `MG ZS EV`)**: Interactive Three.js 360° turntable showroom featuring sculpted 3D models of both electric SUVs, factory paint swatches, toggleable DRL/headlights, brake light reactivity, and speed-synced alloy wheel telemetry.
2. **3D Car Cockpit & 140 km/h Top Speed Challenge**: First-person perspective highway viewport, precision dual-cluster gauges (`0–8,000 RPM` tachometer & `0–160 km/h` speedometer), tactile top-hinged billet/rubber Brake Pad, floor-hinged organ-style Accelerator Pad, and a 3D machined open-gate 5-speed H-pattern Gear Box.
3. **Tilicho Lake 5,116m Altitude Gain Explorer**: Multi-layer 3D parallax Himalayan range with dynamic snow particles, spring-physics magnetic climber avatar, live tropospheric telemetry (`Elevation`, `-6.5°C/km Temp`, `Pressure`, `SpO₂`), and summit flag animation.
4. **Play Mode & Procedural Web Audio Synth**: Interactive `PC`, `PS5`, and `SIM RACING` selector paired with zero-asset Web Audio synthesis (engine harmonics, mechanical gearbox clunks, turbo blow-off hiss, milestone chimes, and high-altitude wind).

## Site files

- `index.html` contains the page metadata and structured data.
- `404.html` is the custom not-found page for static hosts that support custom 404 files.
- `public/robots.txt` and `public/sitemap.xml` help search engines discover the site.
- `public/assets/og-cover.png` is the social sharing image; its vector source is `public/assets/og-cover.svg`.

## Brand vectors

- Cisco, Facebook, Google, HackerRank, Instagram, Threads, United Nations, and X vectors are from [Simple Icons](https://simpleicons.org/).
- The AWS brand vector is from [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome).
- The Truth Social mark is from the [official Truth Social brand guide](https://help.truthsocial.com/branding/).
- The Microsoft four-square mark and IBM 8-bar wordmark are local SVG vectors.
