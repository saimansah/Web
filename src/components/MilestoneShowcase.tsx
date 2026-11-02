import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GarageShowroom3D, type GarageFocusMode } from "./GarageShowroom3D";

/**
 * ============================================================================
 * SAIMAN_CONFIG — Central configuration for Saiman Sah's Unified Outside Hub
 * Easily edit garage specs, 140 km/h cockpit parameters, 5,116m Tilicho Lake
 * checkpoints, gaming rig modes, and section links.
 * ============================================================================
 */
export const SAIMAN_CONFIG = {
  profile: {
    name: "Saiman Sah",
    location: "Kathmandu, Nepal",
    portfolioUrl: "https://saimansah.com.np",
  },
  garage: {
    atto3: {
      id: "atto3" as const,
      brand: "BYD",
      model: "Atto 3",
      badge: "BYD ATTO 3",
      powertrain: "Blade Battery · 150 kW · 310 Nm",
      accentHex: "#48e5ff",
    },
    zsev: {
      id: "zsev" as const,
      brand: "MG",
      model: "ZS EV",
      badge: "MG ZS EV",
      powertrain: "Pure Electric SUV · 130 kW · 280 Nm",
      accentHex: "#ff5c7c",
    },
  },
  cockpitChallenge: {
    title: "140 km/h Top Speed Challenge",
    subtitle: "First-Person 3D Cockpit · 5-Speed H-Gate Gearbox & Real Pedals",
    milestoneBanner: "140 km/h Top Speed Milestone Achieved by Saiman Sah",
    targetSpeedKmh: 140,
    maxSpeedKmh: 160,
    idleRpm: 850,
    optimalShiftMinRpm: 5800,
    optimalShiftMaxRpm: 6750,
    redlineRpm: 6800,
    maxRpm: 8000,
    maxBoostBar: 1.6,
    gearTopSpeedsKmh: [0, 42, 74, 105, 133, 160] as const,
  },
  altitudeExplorer: {
    title: "Tilicho Lake · 5,116m Altitude Explorer",
    subtitle: "I reached 5,116 meters on foot in the Himalayas — Annapurna Region, Nepal.",
    startElevationM: 1320,
    peakElevationM: 5116,
    baseTemperatureC: 20.5, // Temp at 1,320m (Kathmandu)
    lapseRateCPer1000m: 6.5, // Standard tropospheric drop (-6.5°C per 1,000m climb)
    seaLevelPressureHpa: 1013.25,
    checkpoints: [
      {
        id: "kathmandu",
        progress: 0,
        name: "Kathmandu Valley",
        shortLabel: "Kathmandu",
        elevationM: 1320,
        region: "Bagmati · Starting Point",
        summary: "Home base at 1,320m where Saiman builds software, leads AI initiatives, and plans Himalayan expeditions.",
        tag: "START · 1,320 M",
        linkLabel: "About Saiman",
        linkHref: "#about",
      },
      {
        id: "chame",
        progress: 0.26,
        name: "Chame · Marshyangdi Gorge",
        shortLabel: "Chame",
        elevationM: 2670,
        region: "Manang District · Pine & Fir Zone",
        summary: "Steep river gorges and suspension bridges mark the transition into the high alpine Annapurna corridor.",
        tag: "CHECKPOINT 01 · 2,670 M",
        linkLabel: "My Workbench",
        linkHref: "#skills",
      },
      {
        id: "manang",
        progress: 0.52,
        name: "Manang Acclimatization Hub",
        shortLabel: "Manang",
        elevationM: 3519,
        region: "Upper Manang · Rain-Shadow Valley",
        summary: "Thinning air and glacier views—critical acclimatization stage before entering the Tilicho side valley.",
        tag: "CHECKPOINT 02 · 3,519 M",
        linkLabel: "20 Certificates",
        linkHref: "#credentials",
      },
      {
        id: "basecamp",
        progress: 0.76,
        name: "Tilicho Base Camp",
        shortLabel: "Base Camp",
        elevationM: 4150,
        region: "Scree Landslide Traverse",
        summary: "Above the tree line across exposed scree slopes beneath the towering north face of Tilicho Peak.",
        tag: "BASE CAMP · 4,150 M",
        linkLabel: "3D Garage",
        linkHref: "#outside",
      },
      {
        id: "tilicho",
        progress: 1,
        name: "Tilicho Lake Summit",
        shortLabel: "Tilicho Lake",
        elevationM: 5116,
        region: "5,116 Meters · High Himalayan Glacial Lake",
        summary: "Reached 5,116 meters (16,785 ft) on foot in the Himalayas—one of the highest lakes in the world.",
        tag: "SUMMIT · 5,116 M",
        linkLabel: "Back to Top",
        linkHref: "#home",
      },
    ],
  },
  playModes: [
    {
      id: "sim",
      tag: "SIM RACING",
      title: "Precision Driving & Telemetry",
      detail: "Apex lines, manual H-pattern shifting, and high-speed cockpit telemetry runs.",
    },
    {
      id: "pc",
      tag: "PC",
      title: "High-Refresh PC Rig",
      detail: "Competitive co-op play, strategy sandboxes, and real-time 3D graphics worlds.",
    },
    {
      id: "ps5",
      tag: "PS5",
      title: "PlayStation 5 Cinema",
      detail: "Narrative-driven epics with DualSense haptics and unforgettable storytelling.",
    },
  ],
} as const;

/**
 * ============================================================================
 * Procedural Web Audio API Sound Engine (Zero External Audio Assets)
 * Synthesizes engine harmonics, mechanical H-gate gearbox clunks, turbo BOV
 * hiss, milestone fanfare chimes, and elevation-scaled Himalayan wind.
 * ============================================================================
 */
class ProceduralSoundEngine {
  private ctx: AudioContext | null = null;
  private muted = true;
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private engineGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;

  private ensureContext() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return this.ctx;
    }
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    this.ctx = ctx;

    // Engine harmonic synthesis chain
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "triangle";
    osc1.frequency.value = 55;
    osc2.frequency.value = 110;

    filter.type = "lowpass";
    filter.frequency.value = 220;
    filter.Q.value = 3.2;

    gain.gain.value = 0;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    this.engineOsc1 = osc1;
    this.engineOsc2 = osc2;
    this.engineFilter = filter;
    this.engineGain = gain;

    // Himalayan wind noise generator
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i += 1) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = output[i];
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const wFilter = ctx.createBiquadFilter();
    wFilter.type = "bandpass";
    wFilter.frequency.value = 260;
    wFilter.Q.value = 2.4;

    const wGain = ctx.createGain();
    wGain.gain.value = 0;

    whiteNoise.connect(wFilter);
    wFilter.connect(wGain);
    wGain.connect(ctx.destination);
    whiteNoise.start();

    this.windFilter = wFilter;
    this.windGain = wGain;

    return ctx;
  }

  public setMuted(nextMuted: boolean) {
    this.muted = nextMuted;
    if (!nextMuted) {
      this.ensureContext();
    } else if (this.ctx && this.engineGain && this.windGain) {
      const now = this.ctx.currentTime;
      this.engineGain.gain.setTargetAtTime(0, now, 0.05);
      this.windGain.gain.setTargetAtTime(0, now, 0.05);
    }
  }

  public updateEngine(rpm: number, throttle: boolean, stuttering: boolean, active: boolean) {
    if (this.muted || !this.ctx || !this.engineOsc1 || !this.engineOsc2 || !this.engineFilter || !this.engineGain) {
      return;
    }
    const now = this.ctx.currentTime;
    const normalized = Math.max(0, Math.min(1, (rpm - 800) / 7200));
    const jitter = stuttering ? (Math.sin(now * 68) > 0 ? 18 : -22) : 0;
    const baseFreq = 46 + normalized * 198 + jitter;

    this.engineOsc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
    this.engineOsc2.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.03);
    this.engineFilter.frequency.setTargetAtTime(185 + normalized * 1380 + (throttle ? 270 : 0), now, 0.04);

    const targetGain = active ? 0.02 + normalized * 0.055 + (throttle ? 0.018 : 0) : 0.006;
    this.engineGain.gain.setTargetAtTime(targetGain, now, 0.05);
  }

  public triggerGearClunk() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Low mechanical linkage thud
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = "sine";
    thudOsc.frequency.setValueAtTime(165, now);
    thudOsc.frequency.exponentialRampToValueAtTime(48, now + 0.075);
    thudGain.gain.setValueAtTime(0.11, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.085);

    // Metallic open-gate slot click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(1920, now + 0.012);
    clickOsc.frequency.exponentialRampToValueAtTime(620, now + 0.045);
    clickGain.gain.setValueAtTime(0.045, now + 0.012);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now + 0.012);
    clickOsc.stop(now + 0.05);
  }

  public triggerTurboBov(intensity = 1) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const duration = 0.28;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.09));
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2900, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + duration);
    filter.Q.value = 3.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.085 * Math.min(1.3, Math.max(0.4, intensity)), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  public triggerMilestoneChime() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const start = ctx.currentTime + idx * 0.075;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.065, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.56);
    });
  }

  public updateWind(altitudeProgress: number, velocity: number, active: boolean) {
    if (this.muted || !this.ctx || !this.windFilter || !this.windGain) return;
    const now = this.ctx.currentTime;
    const clamped = Math.max(0, Math.min(1, altitudeProgress));
    const freq = 210 + clamped * 480 + Math.min(220, Math.abs(velocity) * 300);
    const targetGain = active
      ? 0.015 + clamped * 0.055 + Math.min(0.04, Math.abs(velocity) * 0.08)
      : 0.004 + clamped * 0.012;
    this.windFilter.frequency.setTargetAtTime(freq, now, 0.06);
    this.windGain.gain.setTargetAtTime(targetGain, now, 0.08);
  }

  public dispose() {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}

/**
 * Exact polar-to-cartesian gauge arc generator (0 deg = 12 o'clock, clockwise positive)
 */
function polarFromTop(cx: number, cy: number, radius: number, angleDegFromTop: number) {
  const rad = ((angleDegFromTop - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function describeGaugeArc(
  cx: number,
  cy: number,
  radius: number,
  startDegFromTop: number,
  endDegFromTop: number,
): string {
  const start = polarFromTop(cx, cy, radius, startDegFromTop);
  const end = polarFromTop(cx, cy, radius, endDegFromTop);
  const largeArc = endDegFromTop - startDegFromTop > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

/**
 * 5-Speed Open-Gate H-Pattern Coordinates (in % of gate plate)
 */
interface GateSlot {
  gear: number; // 0 = N, 1..5
  label: string;
  x: number;
  y: number;
}

const GEAR_GATE_SLOTS: ReadonlyArray<GateSlot> = [
  { gear: 1, label: "1", x: 38, y: 24 },
  { gear: 2, label: "2", x: 38, y: 86 },
  { gear: 0, label: "N", x: 80, y: 55 },
  { gear: 3, label: "3", x: 80, y: 24 },
  { gear: 4, label: "4", x: 80, y: 86 },
  { gear: 5, label: "5", x: 122, y: 24 },
];

interface TrailPoint {
  x: number;
  y: number;
}

const TRAIL_CONTROL_POINTS: ReadonlyArray<TrailPoint> = [
  { x: 56, y: 298 },
  { x: 145, y: 274 },
  { x: 232, y: 238 },
  { x: 325, y: 214 },
  { x: 416, y: 170 },
  { x: 505, y: 146 },
  { x: 590, y: 98 },
  { x: 688, y: 58 },
];

function sampleTrailPoint(progress: number): TrailPoint {
  const t = Math.max(0, Math.min(1, progress));
  const scaled = t * (TRAIL_CONTROL_POINTS.length - 1);
  const index = Math.min(TRAIL_CONTROL_POINTS.length - 2, Math.floor(scaled));
  const localT = scaled - index;
  const p0 = TRAIL_CONTROL_POINTS[Math.max(0, index - 1)];
  const p1 = TRAIL_CONTROL_POINTS[index];
  const p2 = TRAIL_CONTROL_POINTS[index + 1];
  const p3 = TRAIL_CONTROL_POINTS[Math.min(TRAIL_CONTROL_POINTS.length - 1, index + 2)];

  const t2 = localT * localT;
  const t3 = t2 * localT;
  const x =
    0.5 *
    (2 * p1.x +
      (-p0.x + p2.x) * localT +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
  const y =
    0.5 *
    (2 * p1.y +
      (-p0.y + p2.y) * localT +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

  return { x, y };
}

function buildTrailSvgPath(samples = 80, maxProgress = 1): string {
  const clamped = Math.max(0.005, Math.min(1, maxProgress));
  const parts: string[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const p = sampleTrailPoint((i / samples) * clamped);
    parts.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  return parts.join(" ");
}

/**
 * ============================================================================
 * UNIFIED OUTSIDE SHOWCASE HUB
 * Combines 3D EV Garage (BYD Atto 3 & MG ZS EV), 140 km/h 3D Cockpit Simulator,
 * Tilicho Lake 5,116m Altitude Explorer, and PC/PS5/Sim Play Mode in ONE place.
 * ============================================================================
 */
export function MilestoneShowcase() {
  const soundRef = useRef<ProceduralSoundEngine | null>(null);
  const cockpitCardRef = useRef<HTMLElement>(null);

  const [muted, setMuted] = useState(true);
  const [garageFocus, setGarageFocus] = useState<GarageFocusMode>("dual");
  const [activeCar, setActiveCar] = useState<"atto3" | "zsev">("atto3");
  const [liveTelemetry, setLiveTelemetry] = useState({
    speedKmh: 0,
    braking: false,
    throttling: false,
  });
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const engine = new ProceduralSoundEngine();
    soundRef.current = engine;
    return () => engine.dispose();
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundRef.current?.setMuted(nextMuted);
  };

  const handleJumpToCockpit = () => {
    setResetSignal((n) => n + 1);
    cockpitCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    cockpitCardRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="unified-outside-hub reveal">
      {/* Unified Command Bar */}
      <div className="outside-command-bar">
        <div className="outside-command-pills">
          <span className="command-pill is-live">
            <i /> ALL-IN-ONE INTERACTIVE SHOWCASE
          </span>
          <span className="command-pill">BYD ATTO 3 · MG ZS EV</span>
          <span className="command-pill">140 KM/H COCKPIT</span>
          <span className="command-pill">5,116 M TILICHO LAKE</span>
          <span className="command-pill">PC · PS5 · SIM</span>
        </div>

        <button
          type="button"
          className={`showcase-audio-btn${!muted ? " is-active" : ""}`}
          aria-pressed={!muted}
          onClick={toggleSound}
        >
          <span className="showcase-audio-dot" />
          {muted ? "Unmute Procedural Audio" : "Audio Synth Active"}
        </button>
      </div>

      {/* Unified 4-Module Bento Grid */}
      <div className="unified-bento-grid">
        {/* 01: Interactive Three.js 3D Garage (BYD Atto 3 & MG ZS EV) */}
        <GarageShowroom3D
          focusMode={garageFocus}
          onSelectFocus={setGarageFocus}
          activeCockpitCar={activeCar}
          onSelectCockpitCar={setActiveCar}
          speedKmh={liveTelemetry.speedKmh}
          braking={liveTelemetry.braking}
          throttling={liveTelemetry.throttling}
        />

        {/* 02: Realistic 3D Car Cockpit, Real Brake & Accelerator Pads, Real H-Gate Gearbox */}
        <CockpitSpeedChallenge
          cardRef={cockpitCardRef}
          soundRef={soundRef}
          activeCar={activeCar}
          resetSignal={resetSignal}
          onTelemetryChange={setLiveTelemetry}
        />

        {/* 03: Tilicho Lake 5,116m Atmospheric 3D-Parallax Altitude Explorer */}
        <AltitudeGainExplorer soundRef={soundRef} />

        {/* 04: PC + PlayStation 5 + Sim Racing Interactive Play Mode */}
        <PlayModeCard onLaunchSim={handleJumpToCockpit} />
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MODULE 02: Realistic 3D Car Cockpit & 140 km/h Top Speed Challenge
 * Features Real Brake Pad, Real Organ-Hinged Accelerator Pad & Real H-Gate Gearbox
 * ============================================================================
 */
function CockpitSpeedChallenge({
  cardRef,
  soundRef,
  activeCar,
  resetSignal,
  onTelemetryChange,
}: {
  cardRef: React.RefObject<HTMLElement | null>;
  soundRef: React.RefObject<ProceduralSoundEngine | null>;
  activeCar: "atto3" | "zsev";
  resetSignal: number;
  onTelemetryChange: (telemetry: { speedKmh: number; braking: boolean; throttling: boolean }) => void;
}) {
  const cfg = SAIMAN_CONFIG.cockpitChallenge;
  const carInfo = SAIMAN_CONFIG.garage[activeCar];
  const roadCanvasRef = useRef<HTMLCanvasElement>(null);
  const gateWellRef = useRef<HTMLDivElement>(null);

  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState<number>(cfg.idleRpm);
  const [gear, setGear] = useState(0); // 0 = N, 1..5
  const [boost, setBoost] = useState(-0.3);
  const [throttling, setThrottling] = useState(false);
  const [braking, setBraking] = useState(false);
  const [stuttering, setStuttering] = useState(false);
  const [draggingKnob, setDraggingKnob] = useState(false);
  const [shiftFeedback, setShiftFeedback] = useState<string>(
    "PRESS REAL ACCELERATOR PAD OR [W / ↑] · SHIFT VIA H-GATE GEARBOX",
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milestoneTime, setMilestoneTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });

  const stateRef = useRef({
    speed: 0,
    rpm: cfg.idleRpm as number,
    gear: 0,
    boost: -0.3,
    throttling: false,
    braking: false,
    redlineDuration: 0,
    turboSurgeTimer: 0,
    runStartTime: null as number | null,
    elapsed: 0,
    achieved140: false,
    roadOffset: 0,
  });

  const engageGear = useCallback(
    (targetGear: number) => {
      const clamped = Math.max(0, Math.min(5, targetGear));
      const s = stateRef.current;
      if (clamped === s.gear) return;

      const prevGear = s.gear;
      const prevRpm = s.rpm;
      s.gear = clamped;
      s.redlineDuration = 0;

      soundRef.current?.triggerGearClunk();

      if (clamped === 0) {
        setShiftFeedback("NEUTRAL GATE [N] ENGAGED");
      } else if (clamped > prevGear && prevGear >= 1) {
        if (prevRpm >= cfg.optimalShiftMinRpm && prevRpm <= cfg.optimalShiftMaxRpm) {
          s.turboSurgeTimer = 0.95;
          s.boost = Math.min(cfg.maxBoostBar, s.boost + 0.55);
          setShiftFeedback(`PERFECT GATE SHIFT → GEAR ${clamped} · +TURBO SURGE!`);
          soundRef.current?.triggerTurboBov(1.2);
        } else if (prevRpm > cfg.optimalShiftMaxRpm) {
          s.turboSurgeTimer = 0.35;
          setShiftFeedback(`LATE SHIFT → GEAR ${clamped}`);
          soundRef.current?.triggerTurboBov(0.85);
        } else {
          setShiftFeedback(`EARLY SHIFT → GEAR ${clamped} · BUILD RPM IN GREEN ZONE`);
          soundRef.current?.triggerTurboBov(0.45);
        }
      } else if (clamped === 1 && prevGear === 0) {
        setShiftFeedback("1ST GEAR LOCKED IN · HOLD ACCELERATOR PAD TO LAUNCH");
      } else {
        setShiftFeedback(`DOWNSHIFTED TO GEAR ${clamped}`);
        soundRef.current?.triggerTurboBov(0.6);
      }

      setGear(clamped);
    },
    [cfg.maxBoostBar, cfg.optimalShiftMaxRpm, cfg.optimalShiftMinRpm, soundRef],
  );

  const shiftSequential = useCallback(
    (direction: 1 | -1) => {
      engageGear(stateRef.current.gear + direction);
    },
    [engageGear],
  );

  const resetRun = useCallback(() => {
    const s = stateRef.current;
    s.speed = 0;
    s.rpm = cfg.idleRpm;
    s.gear = 0;
    s.boost = -0.3;
    s.redlineDuration = 0;
    s.turboSurgeTimer = 0;
    s.runStartTime = null;
    s.elapsed = 0;
    s.achieved140 = false;
    setSpeed(0);
    setRpm(cfg.idleRpm);
    setGear(0);
    setBoost(-0.3);
    setStuttering(false);
    setElapsedTime(0);
    setMilestoneTime(null);
    setShiftFeedback("RUN RESET · SLOT GEAR 1 OR HOLD ACCELERATOR PAD TO LAUNCH");
  }, [cfg.idleRpm]);

  useEffect(() => {
    if (resetSignal > 0) resetRun();
  }, [resetRun, resetSignal]);

  // Keyboard driving controls when cockpit is focused OR hovered
  const activeInputZoneRef = useRef(false);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeInputZoneRef.current) return;
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        e.preventDefault();
        stateRef.current.throttling = true;
        setThrottling(true);
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        e.preventDefault();
        stateRef.current.braking = true;
        setBraking(true);
      } else if (e.key === " " || e.key === "Shift" || e.key === "e" || e.key === "E") {
        e.preventDefault();
        if (!e.repeat) shiftSequential(1);
      } else if (e.key === "Control" || e.key === "q" || e.key === "Q") {
        e.preventDefault();
        if (!e.repeat) shiftSequential(-1);
      } else if (["0", "1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        if (!e.repeat) engageGear(Number(e.key));
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        if (!e.repeat) engageGear(0);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        resetRun();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        stateRef.current.throttling = false;
        setThrottling(false);
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        stateRef.current.braking = false;
        setBraking(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [engageGear, resetRun, shiftSequential]);

  // Dragging the 3D shift stick across the H-Gate slots (160x110 gate coordinate space)
  const updateGearFromGatePointer = useCallback(
    (clientX: number, clientY: number) => {
      const well = gateWellRef.current;
      if (!well) return;
      const rect = well.getBoundingClientRect();
      const px = ((clientX - rect.left) / Math.max(1, rect.width)) * 160;
      const py = ((clientY - rect.top) / Math.max(1, rect.height)) * 110;

      let bestGear = stateRef.current.gear;
      let minDist = Infinity;
      for (const slot of GEAR_GATE_SLOTS) {
        const dist = Math.hypot(px - slot.x, py - slot.y);
        if (dist < minDist) {
          minDist = dist;
          bestGear = slot.gear;
        }
      }
      if (minDist < 34) {
        engageGear(bestGear);
      }
    },
    [engageGear],
  );

  // Sync telemetry upward to 3D EV Garage
  useEffect(() => {
    onTelemetryChange({ speedKmh: speed, braking, throttling });
  }, [braking, onTelemetryChange, speed, throttling]);

  // Main Physics + Crisp 3D Windshield Night-Highway Canvas Renderer
  useEffect(() => {
    const canvas = roadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = Array.from({ length: 64 }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: Math.random() * 0.44,
      z: Math.random(),
    }));

    let inView = true;
    let frameId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      frameId = 0;
      if (!inView || document.hidden) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const s = stateRef.current;

      // Auto-slot 1st gear if driver floors accelerator from Neutral
      if (s.throttling && s.gear === 0) {
        s.gear = 1;
        setGear(1);
        soundRef.current?.triggerGearClunk();
        setShiftFeedback("LAUNCHING IN 1ST GEAR · SHIFT AT GREEN ZONE (5,800–6,750 RPM)");
      }

      if (s.throttling && s.runStartTime === null && s.speed < 2) {
        s.runStartTime = now;
      }

      if (s.runStartTime !== null && !s.achieved140) {
        s.elapsed = (now - s.runStartTime) / 1000;
        setElapsedTime(s.elapsed);
      }

      if (s.turboSurgeTimer > 0) {
        s.turboSurgeTimer = Math.max(0, s.turboSurgeTimer - dt);
      }

      const gearMaxSpeed = cfg.gearTopSpeedsKmh[s.gear] || 42;
      const prevGearMaxSpeed = s.gear > 1 ? cfg.gearTopSpeedsKmh[s.gear - 1] : 0;

      if (s.gear === 0) {
        const targetRpm = s.throttling ? 6200 : cfg.idleRpm;
        s.rpm += (targetRpm - s.rpm) * Math.min(1, dt * 8);
        s.speed = Math.max(0, s.speed - (8 + (s.braking ? 46 : 0)) * dt);
        setStuttering(false);
      } else {
        const rpmRatio = Math.max(0, Math.min(1.15, (s.rpm - cfg.idleRpm) / (cfg.redlineRpm - cfg.idleRpm)));
        const torqueCurve = 0.5 + Math.sin(Math.min(1, rpmRatio) * Math.PI * 0.85) * 0.68;
        const surgeMultiplier = s.turboSurgeTimer > 0 ? 1.42 : 1.0;
        const gearFactor = 1.18 - s.gear * 0.12;

        const isRedlining = s.rpm >= cfg.redlineRpm;
        if (isRedlining && s.throttling) {
          s.redlineDuration += dt;
        } else {
          s.redlineDuration = Math.max(0, s.redlineDuration - dt * 2.2);
        }

        const isStuttering = s.redlineDuration > 0.62;
        setStuttering(isStuttering);

        if (isStuttering && s.gear < 5) {
          setShiftFeedback(`REV LIMITER IN GEAR ${s.gear}! SHIFT TO GEAR ${s.gear + 1} IN GEARBOX`);
        }

        if (s.throttling) {
          const rawAccel = 26.5 * torqueCurve * gearFactor * surgeMultiplier;
          const speedCeilingDrag = s.speed >= gearMaxSpeed ? 0.07 : 1.0;
          const stutterPenalty = isStuttering ? 0.05 : 1.0;
          s.speed = Math.min(cfg.maxSpeedKmh, s.speed + rawAccel * speedCeilingDrag * stutterPenalty * dt);
        } else {
          s.speed = Math.max(0, s.speed - (7.2 + s.speed * 0.062) * dt);
        }

        if (s.braking) {
          s.speed = Math.max(0, s.speed - 52 * dt);
        }

        const gearSpan = Math.max(18, gearMaxSpeed - prevGearMaxSpeed * 0.58);
        const gearProgress = Math.max(0, (s.speed - prevGearMaxSpeed * 0.58) / gearSpan);
        const targetRpm = cfg.idleRpm + gearProgress * (cfg.redlineRpm - cfg.idleRpm + 460);
        const stutterJitter = isStuttering ? Math.sin(now * 0.068) * 270 : 0;
        s.rpm = Math.max(
          cfg.idleRpm,
          Math.min(cfg.maxRpm, s.rpm + (targetRpm - s.rpm) * Math.min(1, dt * 11) + stutterJitter),
        );
      }

      const targetBoost = s.throttling
        ? Math.min(cfg.maxBoostBar, ((s.rpm - 1800) / 5200) * 1.26 + (s.turboSurgeTimer > 0 ? 0.36 : 0))
        : -0.32 + (s.speed / cfg.maxSpeedKmh) * 0.24;
      s.boost += (targetBoost - s.boost) * Math.min(1, dt * 7);

      // 140 km/h Milestone Climax
      if (s.speed >= cfg.targetSpeedKmh && !s.achieved140) {
        s.achieved140 = true;
        const finalTime = s.runStartTime ? (now - s.runStartTime) / 1000 : 8.4;
        setMilestoneTime(finalTime);
        setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
        setShiftFeedback("140 KM/H TOP SPEED MILESTONE UNLOCKED!");
        soundRef.current?.triggerMilestoneChime();
      }

      // Cockpit Shake
      const highSpeedFactor = Math.max(0, (s.speed - 95) / 65);
      const stutterFactor = s.redlineDuration > 0.62 ? 1.35 : 0;
      const shakeAmp = highSpeedFactor * 2.3 + stutterFactor * 2.7;
      if (shakeAmp > 0.08) {
        setShakeOffset({
          x: (Math.random() - 0.5) * shakeAmp * 2,
          y: (Math.random() - 0.5) * shakeAmp * 1.5,
        });
      } else {
        setShakeOffset({ x: 0, y: 0 });
      }

      setSpeed(s.speed);
      setRpm(s.rpm);
      setBoost(s.boost);

      soundRef.current?.updateEngine(
        s.rpm,
        s.throttling,
        s.redlineDuration > 0.62,
        s.throttling || s.speed > 5,
      );

      // Render Crisp 960x300 3D Perspective Night Highway
      const width = canvas.width;
      const height = canvas.height;
      const horizonY = height * 0.44;
      const isAdrenaline = s.speed >= 125;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, "#04050a");
      skyGrad.addColorStop(0.65, isAdrenaline ? "#1e0919" : "#0b1124");
      skyGrad.addColorStop(1, isAdrenaline ? "#3e1129" : "#13243b");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Starfield motion-blur streaks
      const warpFactor = 1 + (s.speed / cfg.maxSpeedKmh) * 19;
      ctx.strokeStyle = isAdrenaline ? "rgba(255, 162, 198, 0.76)" : "rgba(175, 232, 255, 0.72)";
      ctx.lineWidth = 1.5;
      stars.forEach((star) => {
        star.z -= dt * (0.12 + (s.speed / cfg.maxSpeedKmh) * 1.9);
        if (star.z <= 0.05) {
          star.z = 1;
          star.x = (Math.random() - 0.5) * 2;
          star.y = Math.random() * 0.42;
        }
        const sx = width * 0.5 + (star.x / star.z) * (width * 0.43);
        const sy = horizonY - (star.y / star.z) * (horizonY * 0.75);
        const tailZ = Math.min(1.12, star.z + 0.012 * warpFactor);
        const tx = width * 0.5 + (star.x / tailZ) * (width * 0.43);
        const ty = horizonY - (star.y / tailZ) * (horizonY * 0.75);
        if (sx >= 0 && sx <= width && sy >= 0 && sy <= horizonY) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
      });

      // Distant Himalayan night peaks
      ctx.fillStyle = "#070912";
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.14, horizonY - 24);
      ctx.lineTo(width * 0.28, horizonY - 11);
      ctx.lineTo(width * 0.44, horizonY - 34);
      ctx.lineTo(width * 0.59, horizonY - 14);
      ctx.lineTo(width * 0.75, horizonY - 31);
      ctx.lineTo(width * 0.9, horizonY - 13);
      ctx.lineTo(width, horizonY - 21);
      ctx.lineTo(width, horizonY);
      ctx.closePath();
      ctx.fill();

      // Asphalt plane
      const roadGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      roadGrad.addColorStop(0, "#090c15");
      roadGrad.addColorStop(1, "#040509");
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Glowing perspective highway curbs
      const vpX = width * 0.5;
      ctx.strokeStyle = isAdrenaline ? "rgba(255, 72, 118, 0.85)" : "rgba(92, 232, 255, 0.72)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(vpX - 32, horizonY);
      ctx.lineTo(width * 0.04, height);
      ctx.moveTo(vpX + 32, horizonY);
      ctx.lineTo(width * 0.96, height);
      ctx.stroke();

      // Multi-lane markers & streetlights
      s.roadOffset = (s.roadOffset + dt * (0.36 + (s.speed / 140) * 5.1)) % 1;
      for (let i = 0; i < 8; i += 1) {
        const rawProgress = (i / 8 + s.roadOffset / 8) % 1;
        const p = Math.pow(rawProgress, 2.35);
        const nextP = Math.pow(Math.min(1, rawProgress + 0.055), 2.35);
        const y1 = horizonY + p * (height - horizonY);
        const y2 = horizonY + nextP * (height - horizonY);

        ctx.strokeStyle = `rgba(245, 242, 255, ${0.18 + p * 0.78})`;
        ctx.lineWidth = Math.max(1.2, p * 5.2);
        ctx.beginPath();
        ctx.moveTo(vpX, y1);
        ctx.lineTo(vpX, y2);
        ctx.stroke();

        // Passing twin streetlights with overhead poles
        const spread = 34 + p * (width * 0.45);
        const postHeight = 8 + p * 56;
        const alpha = Math.min(0.92, p * 1.2);
        ctx.strokeStyle = `rgba(120, 145, 185, ${alpha * 0.35})`;
        ctx.lineWidth = Math.max(1, p * 2.2);
        ctx.beginPath();
        ctx.moveTo(vpX - spread, y1);
        ctx.lineTo(vpX - spread, y1 - postHeight);
        ctx.moveTo(vpX + spread, y1);
        ctx.lineTo(vpX + spread, y1 - postHeight);
        ctx.stroke();

        ctx.fillStyle = isAdrenaline
          ? `rgba(255, 95, 138, ${alpha})`
          : `rgba(142, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(vpX - spread, y1 - postHeight, 1.5 + p * 4.2, 0, Math.PI * 2);
        ctx.arc(vpX + spread, y1 - postHeight, 1.5 + p * 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (frameId === 0 && inView && !document.hidden) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              if (inView) start();
              else stop();
            },
            { rootMargin: "15% 0px 15% 0px" },
          )
        : null;
    if (cardRef.current) observer?.observe(cardRef.current);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [
    cardRef,
    cfg.gearTopSpeedsKmh,
    cfg.idleRpm,
    cfg.maxBoostBar,
    cfg.maxRpm,
    cfg.maxSpeedKmh,
    cfg.redlineRpm,
    cfg.targetSpeedKmh,
    soundRef,
  ]);

  const isAdrenaline = speed >= 125 || milestoneTime !== null;
  const rpmAngle = -125 + (rpm / cfg.maxRpm) * 250;
  const speedAngle = -125 + (speed / cfg.maxSpeedKmh) * 250;
  const shiftLightPct = Math.max(0, Math.min(100, ((rpm - 3000) / (cfg.redlineRpm - 3000)) * 100));
  const isShiftReady = rpm >= cfg.optimalShiftMinRpm && rpm <= cfg.optimalShiftMaxRpm && gear < 5;

  // Exact polar SVG gauge paths
  const optimalArcPath = useMemo(
    () =>
      describeGaugeArc(
        80,
        80,
        59,
        -125 + (cfg.optimalShiftMinRpm / cfg.maxRpm) * 250,
        -125 + (cfg.optimalShiftMaxRpm / cfg.maxRpm) * 250,
      ),
    [cfg.maxRpm, cfg.optimalShiftMaxRpm, cfg.optimalShiftMinRpm],
  );
  const redlineArcPath = useMemo(
    () => describeGaugeArc(80, 80, 59, -125 + (cfg.redlineRpm / cfg.maxRpm) * 250, 125),
    [cfg.maxRpm, cfg.redlineRpm],
  );
  const speedTargetArcPath = useMemo(
    () => describeGaugeArc(80, 80, 59, -125 + (cfg.targetSpeedKmh / cfg.maxSpeedKmh) * 250, 125),
    [cfg.maxSpeedKmh, cfg.targetSpeedKmh],
  );
  const fullDialArcPath = useMemo(() => describeGaugeArc(80, 80, 59, -125, 125), []);

  // Current 3D shifter knob position inside H-gate
  const activeGateSlot = GEAR_GATE_SLOTS.find((slot) => slot.gear === gear) ?? GEAR_GATE_SLOTS[2];
  const throttlePct = throttling ? 100 : Math.min(35, Math.round((rpm - cfg.idleRpm) / 180));

  return (
    <article
      ref={cardRef}
      className={`bento-card cockpit-card${isAdrenaline ? " is-adrenaline" : ""}${stuttering ? " is-stuttering" : ""}`}
      tabIndex={0}
      onMouseEnter={() => {
        activeInputZoneRef.current = true;
      }}
      onMouseLeave={() => {
        if (document.activeElement !== cardRef.current) {
          activeInputZoneRef.current = false;
        }
      }}
      onFocus={() => {
        activeInputZoneRef.current = true;
      }}
      onBlur={() => {
        activeInputZoneRef.current = false;
        stateRef.current.throttling = false;
        stateRef.current.braking = false;
        setThrottling(false);
        setBraking(false);
      }}
    >
      <div className="bento-card-topline">
        <span>FIRST-PERSON 3D COCKPIT · {carInfo.badge}</span>
        <span>02 — 140 KM/H CHALLENGE</span>
      </div>

      <div className="cockpit-header">
        <div>
          <h3>{cfg.title}</h3>
          <p className="cockpit-sub">{carInfo.powertrain} · Manual Sim Override</p>
        </div>
        <div className="cockpit-header-meta">
          <span className="cockpit-timer-pill">
            0–140: <strong>{milestoneTime !== null ? `${milestoneTime.toFixed(2)}s` : `${elapsedTime.toFixed(1)}s`}</strong>
          </span>
          {bestTime !== null && <span className="cockpit-best-pill">BEST: {bestTime.toFixed(2)}s</span>}
        </div>
      </div>

      {/* Upper 3D Cockpit Viewport (Windshield + Dual Gauges + Steering Wheel) */}
      <div
        className="cockpit-stage"
        style={{
          transform: `translate3d(${shakeOffset.x.toFixed(2)}px, ${shakeOffset.y.toFixed(2)}px, 0)`,
        }}
      >
        <div className="cockpit-windshield">
          <canvas ref={roadCanvasRef} width={960} height={300} className="cockpit-road-canvas" />
          <div className="windshield-glare" aria-hidden="true" />

          {milestoneTime !== null && (
            <div className="cockpit-milestone-banner" role="status" aria-live="polite">
              <span className="milestone-tag">MILESTONE UNLOCKED · {carInfo.badge}</span>
              <strong>{cfg.milestoneBanner}</strong>
              <span>0–140 km/h in {milestoneTime.toFixed(2)}s · Peak Precision Run</span>
            </div>
          )}
        </div>

        <div className="cockpit-dash-binnacle">
          <div
            className="dash-ambient-led"
            style={!isAdrenaline ? { boxShadow: `0 0 14px ${carInfo.accentHex}` } : undefined}
            aria-hidden="true"
          />

          <div className="shift-light-bar" aria-hidden="true">
            <div
              className={`shift-light-fill${rpm >= cfg.optimalShiftMinRpm ? " is-optimal" : ""}${rpm >= cfg.redlineRpm ? " is-redline" : ""}`}
              style={{ width: `${shiftLightPct}%` }}
            />
          </div>

          <div className="cockpit-clusters">
            {/* Left Beveled Gauge: Tachometer (0–8,000 RPM) */}
            <div className="gauge-bezel">
              <svg viewBox="0 0 160 160" className="gauge-svg" aria-label={`Tachometer ${Math.round(rpm)} RPM`}>
                <circle cx="80" cy="80" r="70" className="gauge-ring-bg" />
                <path d={fullDialArcPath} className="gauge-arc-track" />
                <path d={optimalArcPath} className="gauge-arc-optimal" />
                <path d={redlineArcPath} className="gauge-arc-redline" />

                {Array.from({ length: 33 }, (_, idx) => {
                  const deg = -125 + (idx / 32) * 250;
                  const major = idx % 4 === 0;
                  const outer = polarFromTop(80, 80, 63, deg);
                  const inner = polarFromTop(80, 80, major ? 54 : 58, deg);
                  return (
                    <line
                      key={idx}
                      x1={inner.x}
                      y1={inner.y}
                      x2={outer.x}
                      y2={outer.y}
                      className={`gauge-tick-line${major ? " is-major" : ""}${idx >= 27 ? " is-red" : ""}`}
                    />
                  );
                })}

                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const deg = -125 + (num / 8) * 250;
                  const pos = polarFromTop(80, 83, 43, deg);
                  return (
                    <text key={num} x={pos.x} y={pos.y} className={`gauge-tick-label${num >= 7 ? " is-red" : ""}`}>
                      {num}
                    </text>
                  );
                })}

                <g transform={`rotate(${rpmAngle} 80 80)`}>
                  <line x1="80" y1="90" x2="80" y2="23" className="gauge-needle" />
                </g>
                <circle cx="80" cy="80" r="9.5" className="gauge-cap" />
                <text x="80" y="114" className="gauge-value-text">
                  {Math.round(rpm)}
                </text>
                <text x="80" y="128" className="gauge-unit-text">
                  RPM ×1000
                </text>
              </svg>
            </div>

            {/* Center Telemetry MFD */}
            <div className="cockpit-mfd">
              <span className="mfd-car-badge">{carInfo.brand}</span>
              <span className="mfd-label">GEAR</span>
              <strong className={`mfd-gear${isShiftReady ? " is-shift-ready" : ""}`}>
                {gear === 0 ? "N" : gear}
              </strong>
              <div className="mfd-boost">
                <div className="mfd-boost-top">
                  <span>BOOST</span>
                  <span>{boost >= 0 ? `+${boost.toFixed(1)}` : boost.toFixed(1)} BAR</span>
                </div>
                <div className="mfd-boost-track">
                  <div
                    className="mfd-boost-fill"
                    style={{ width: `${Math.max(0, Math.min(100, ((boost + 0.4) / 2.0) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Beveled Gauge: Speedometer (0–160 km/h) */}
            <div className="gauge-bezel">
              <svg viewBox="0 0 160 160" className="gauge-svg" aria-label={`Speedometer ${Math.round(speed)} km/h`}>
                <circle cx="80" cy="80" r="70" className="gauge-ring-bg" />
                <path d={fullDialArcPath} className="gauge-arc-track" />
                <path d={speedTargetArcPath} className="gauge-arc-speed-target" />

                {Array.from({ length: 33 }, (_, idx) => {
                  const deg = -125 + (idx / 32) * 250;
                  const major = idx % 4 === 0;
                  const outer = polarFromTop(80, 80, 63, deg);
                  const inner = polarFromTop(80, 80, major ? 54 : 58, deg);
                  return (
                    <line
                      key={idx}
                      x1={inner.x}
                      y1={inner.y}
                      x2={outer.x}
                      y2={outer.y}
                      className={`gauge-tick-line${major ? " is-major" : ""}${idx >= 28 ? " is-red" : ""}`}
                    />
                  );
                })}

                {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((spd) => {
                  const deg = -125 + (spd / 160) * 250;
                  const pos = polarFromTop(80, 83, 42, deg);
                  return (
                    <text
                      key={spd}
                      x={pos.x}
                      y={pos.y}
                      className={`gauge-tick-label is-small${spd >= 140 ? " is-red" : ""}`}
                    >
                      {spd}
                    </text>
                  );
                })}

                <g transform={`rotate(${speedAngle} 80 80)`}>
                  <line x1="80" y1="90" x2="80" y2="23" className="gauge-needle is-cyan" />
                </g>
                <circle cx="80" cy="80" r="9.5" className="gauge-cap" />
                <text x="80" y="114" className="gauge-value-text">
                  {Math.round(speed)}
                </text>
                <text x="80" y="128" className="gauge-unit-text">
                  KM/H
                </text>
              </svg>
            </div>
          </div>

          {/* Recessed 3D Sport Steering Wheel & Metallic Paddle Shifters */}
          <div className="cockpit-steering-row">
            <button
              type="button"
              className="paddle-shifter"
              onClick={() => shiftSequential(-1)}
              aria-label="Paddle shift down"
            >
              <span>−</span>
              <small>PADDLE DN</small>
            </button>

            <div className="steering-wheel-silhouette" aria-hidden="true">
              <div className="steering-rim">
                <span className="steering-noon-mark" />
              </div>
              <div className="steering-hub">{carInfo.brand} · SAIMAN</div>
            </div>

            <button
              type="button"
              className={`paddle-shifter is-upshift${isShiftReady ? " is-pulse" : ""}`}
              onClick={() => shiftSequential(1)}
              aria-label="Paddle shift up"
            >
              <span>+</span>
              <small>PADDLE UP</small>
            </button>
          </div>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="cockpit-status-line" role="status" aria-live="polite">
        <span>{shiftFeedback}</span>
        <button type="button" className="cockpit-reset-btn" onClick={resetRun}>
          Reset Run
        </button>
      </div>

      {/* ====================================================================
          LOWER MECHANICAL DRIVING CONSOLE:
          Left: Real 3D Footwell with Brake Pad & Organ-Hinged Accelerator Pad
          Right: Real 3D Machined Open-Gate 5-Speed H-Pattern Gear Box
         ==================================================================== */}
      <div className="cockpit-mechanical-deck">
        {/* 1. REAL FOOTWELL PEDAL ASSEMBLY */}
        <div
          className={`footwell-housing${braking ? " is-braking-glow" : ""}${throttling ? " is-throttling-glow" : ""}`}
        >
          <div className="mechanical-box-header">
            <span>DRIVER FOOTWELL</span>
            <span>HOLD PADS · [S / W]</span>
          </div>

          <div className="footwell-stage">
            <div className="footwell-courtesy-led" aria-hidden="true" />

            {/* REAL BRAKE PEDAL PAD (Top-hinged steel arm + wide rubber-ribbed billet pad) */}
            <div className="pedal-column is-brake-col">
              <div className="brake-steel-arm" aria-hidden="true" />
              <button
                type="button"
                aria-label="Hold Brake Pedal Pad"
                className={`real-brake-pad${braking ? " is-pressed" : ""}`}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  stateRef.current.braking = true;
                  setBraking(true);
                }}
                onPointerUp={() => {
                  stateRef.current.braking = false;
                  setBraking(false);
                }}
                onPointerCancel={() => {
                  stateRef.current.braking = false;
                  setBraking(false);
                }}
                onLostPointerCapture={() => {
                  stateRef.current.braking = false;
                  setBraking(false);
                }}
              >
                <span className="pad-bolt tl" aria-hidden="true" />
                <span className="pad-bolt tr" aria-hidden="true" />
                <span className="pad-bolt bl" aria-hidden="true" />
                <span className="pad-bolt br" aria-hidden="true" />
                <span className="brake-rubber-treads" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="pad-engraving">BRAKE</span>
              </button>
              <small className="pedal-caption">[S / ↓]</small>
            </div>

            {/* REAL ACCELERATOR PEDAL PAD (Floor-hinged tall organ-style sport aluminum pad) */}
            <div className="pedal-column is-accel-col">
              <div className="accel-assembly-row">
                <button
                  type="button"
                  aria-label="Hold Accelerator Pedal Pad"
                  className={`real-accel-pad${throttling ? " is-pressed" : ""}`}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    stateRef.current.throttling = true;
                    setThrottling(true);
                  }}
                  onPointerUp={() => {
                    stateRef.current.throttling = false;
                    setThrottling(false);
                  }}
                  onPointerCancel={() => {
                    stateRef.current.throttling = false;
                    setThrottling(false);
                  }}
                  onLostPointerCapture={() => {
                    stateRef.current.throttling = false;
                    setThrottling(false);
                  }}
                >
                  <span className="pad-bolt tc" aria-hidden="true" />
                  <span className="accel-rubber-slots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="pad-engraving">THROTTLE</span>
                  <span className="accel-floor-hinge" aria-hidden="true" />
                </button>

                {/* Live Throttle Travel Meter */}
                <div className="throttle-travel-meter" aria-hidden="true">
                  <div className="throttle-travel-fill" style={{ height: `${throttlePct}%` }} />
                </div>
              </div>
              <small className="pedal-caption">HOLD · [W / ↑]</small>
            </div>
          </div>
        </div>

        {/* 2. REAL 3D MACHINED OPEN-GATE 5-SPEED H-PATTERN GEAR BOX */}
        <div className={`gearbox-console${isShiftReady ? " is-shift-ready" : ""}`}>
          <div className="mechanical-box-header">
            <span>H-GATE GEARBOX</span>
            <span>DRAG STICK OR TAP [1–5]</span>
          </div>

          <div
            ref={gateWellRef}
            className={`gearbox-gate-well${draggingKnob ? " is-dragging" : ""}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDraggingKnob(true);
              updateGearFromGatePointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (!draggingKnob) return;
              updateGearFromGatePointer(e.clientX, e.clientY);
            }}
            onPointerUp={() => setDraggingKnob(false)}
            onPointerCancel={() => setDraggingKnob(false)}
            onLostPointerCapture={() => setDraggingKnob(false)}
          >
            {/* 4 Machined Bezel Corner Bolts */}
            <span className="gearbox-bolt tl" aria-hidden="true" />
            <span className="gearbox-bolt tr" aria-hidden="true" />
            <span className="gearbox-bolt bl" aria-hidden="true" />
            <span className="gearbox-bolt br" aria-hidden="true" />

            {/* Pleated Dark Leather Shift Boot Rings */}
            <div className="gearbox-leather-boot" aria-hidden="true" />

            {/* Machined Metal Open-Gate H-Pattern Channels + 3D Chrome Linkage Rod */}
            <svg viewBox="0 0 160 110" className="gearbox-gate-svg" aria-hidden="true">
              {/* Outer machined metal slot bezel */}
              <path
                d="M38 24 V86 M80 24 V86 M122 24 V55 M38 55 H122"
                className="gate-channel-shadow"
              />
              {/* Dark recessed H-gate cutout */}
              <path
                d="M38 24 V86 M80 24 V86 M122 24 V55 M38 55 H122"
                className="gate-channel-cutout"
              />
              {/* Reverse lockout decorative spur at bottom-right */}
              <path d="M122 55 V80" className="gate-channel-lockout" />
              <text x="122" y="96" className="gate-r-mark">
                R
              </text>

              {/* 3D Chrome Gear Stick Shaft from center boot pivot (80, 60) to Knob */}
              <line
                x1="80"
                y1="60"
                x2={activeGateSlot.x}
                y2={activeGateSlot.y}
                className="gear-chrome-shaft-shadow"
              />
              <line
                x1="80"
                y1="60"
                x2={activeGateSlot.x}
                y2={activeGateSlot.y}
                className="gear-chrome-shaft"
              />
              <circle cx="80" cy="60" r="7.5" className="gear-boot-collar" />
            </svg>

            {/* Clickable Individual Gate Targets (N, 1, 2, 3, 4, 5) */}
            {GEAR_GATE_SLOTS.map((slot) => {
              const isSelected = gear === slot.gear;
              const isNextRecommended = isShiftReady && slot.gear === gear + 1;
              return (
                <button
                  key={slot.label}
                  type="button"
                  style={{ left: `${(slot.x / 160) * 100}%`, top: `${(slot.y / 110) * 100}%` }}
                  aria-label={`Shift gearbox to ${slot.label === "N" ? "Neutral" : `Gear ${slot.label}`}`}
                  className={`gate-slot-btn${isSelected ? " is-selected" : ""}${isNextRecommended ? " is-recommended" : ""}`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    engageGear(slot.gear);
                  }}
                >
                  <span>{slot.label}</span>
                </button>
              );
            })}

            {/* Physical 3D Spherical Weighted Shift Knob */}
            <div
              className={`gearbox-3d-knob${isShiftReady ? " is-shift-ready" : ""}`}
              style={{
                left: `${(activeGateSlot.x / 160) * 100}%`,
                top: `${(activeGateSlot.y / 110) * 100}%`,
              }}
              aria-hidden="true"
            >
              <div className="knob-cap">
                <span>{gear === 0 ? "N" : gear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * MODULE 03: Nepal / Annapurna Region · Tilicho Lake 5,116m Altitude Explorer
 * ============================================================================
 */
function AltitudeGainExplorer({ soundRef }: { soundRef: React.RefObject<ProceduralSoundEngine | null> }) {
  const cfg = SAIMAN_CONFIG.altitudeExplorer;
  const cardRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [progress, setProgress] = useState(0.52);
  const [isDragging, setIsDragging] = useState(false);
  const [summitUnlocked, setSummitUnlocked] = useState(false);

  const physicsRef = useRef({
    current: 0.52,
    target: 0.52,
    velocity: 0,
    dragging: false,
    summitChimed: false,
  });

  const updateTargetFromClientX = useCallback(
    (clientX: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const svg = svgRef.current;
      const ctm = svg?.getScreenCTM();
      let raw: number;
      if (ctm && ctm.a > 0) {
        const svgX = (clientX - ctm.e) / ctm.a;
        raw = Math.max(0, Math.min(1, (svgX - 56) / (688 - 56)));
      } else {
        const rect = stage.getBoundingClientRect();
        raw = Math.max(0, Math.min(1, (clientX - rect.left - 24) / Math.max(1, rect.width - 48)));
      }

      let snapped = raw;
      for (const cp of cfg.checkpoints) {
        if (Math.abs(raw - cp.progress) < 0.032) {
          snapped = cp.progress;
          break;
        }
      }
      physicsRef.current.target = snapped;
    },
    [cfg.checkpoints],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const snowParticles = Array.from({ length: 90 }, () => ({
      x: Math.random() * 960,
      y: Math.random() * 380,
      r: 0.9 + Math.random() * 2.3,
      vx: -0.45 - Math.random() * 1.5,
      vy: 0.65 + Math.random() * 1.6,
    }));

    const clouds = [
      { x: 110, y: 128, w: 220, h: 30, speed: 7 },
      { x: 430, y: 94, w: 260, h: 34, speed: 10 },
      { x: 720, y: 148, w: 210, h: 28, speed: 6 },
    ];

    let inView = true;
    let frameId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      frameId = 0;
      if (!inView || document.hidden) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const p = physicsRef.current;

      const stiffness = 140;
      const damping = 18;
      const force = (p.target - p.current) * stiffness;
      p.velocity = (p.velocity + force * dt) * Math.exp(-damping * dt);
      p.current = Math.max(0, Math.min(1, p.current + p.velocity * dt));

      if (Math.abs(p.target - p.current) < 0.0005 && Math.abs(p.velocity) < 0.0005) {
        p.current = p.target;
        p.velocity = 0;
      }

      if (p.current >= 0.985 && !p.summitChimed) {
        p.summitChimed = true;
        setSummitUnlocked(true);
        soundRef.current?.triggerMilestoneChime();
      } else if (p.current < 0.94 && p.summitChimed) {
        p.summitChimed = false;
      }

      setProgress(p.current);
      soundRef.current?.updateWind(p.current, p.velocity, p.dragging);

      const w = canvas.width;
      const h = canvas.height;
      const shift = p.current;

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, shift > 0.7 ? "#050916" : "#080914");
      sky.addColorStop(0.55, shift > 0.7 ? "#10213d" : "#16122c");
      sky.addColorStop(1, "#090a11");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Far parallax Himalayan peaks
      const p1 = -shift * 36;
      ctx.fillStyle = "rgba(46, 42, 78, 0.45)";
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, 210);
      ctx.lineTo(145 + p1, 130);
      ctx.lineTo(295 + p1, 180);
      ctx.lineTo(465 + p1, 90);
      ctx.lineTo(630 + p1, 152);
      ctx.lineTo(795 + p1, 62);
      ctx.lineTo(w, 120);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Moving cloud bands
      clouds.forEach((cloud) => {
        cloud.x = (cloud.x + cloud.speed * dt * (1 + shift * 2.2)) % (w + 260);
        const drawX = cloud.x - 130;
        const grad = ctx.createRadialGradient(
          drawX,
          cloud.y + shift * 20,
          10,
          drawX,
          cloud.y + shift * 20,
          cloud.w * 0.62,
        );
        grad.addColorStop(0, "rgba(198, 216, 255, 0.15)");
        grad.addColorStop(1, "rgba(198, 216, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(drawX - cloud.w, cloud.y - cloud.h + shift * 20, cloud.w * 2, cloud.h * 2);
      });

      // Midground glacial ridgeline
      const p2 = -shift * 68;
      ctx.fillStyle = "rgba(21, 20, 37, 0.82)";
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, 260);
      ctx.lineTo(180 + p2, 188);
      ctx.lineTo(345 + p2, 228);
      ctx.lineTo(535 + p2, 140);
      ctx.lineTo(705 + p2, 185);
      ctx.lineTo(875 + p2, 102);
      ctx.lineTo(w, 156);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Elevation-scaled Himalayan snowstorm particles
      const activeSnowCount = Math.floor(16 + shift * 74);
      const windMultiplier = 1 + shift * 3.4;
      ctx.fillStyle = "rgba(236, 245, 255, 0.8)";
      for (let i = 0; i < activeSnowCount; i += 1) {
        const sp = snowParticles[i];
        sp.x += sp.vx * windMultiplier;
        sp.y += sp.vy * (0.8 + shift * 1.4);
        if (sp.x < 0) sp.x = w;
        if (sp.y > h) {
          sp.y = 0;
          sp.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r * (0.7 + shift * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (frameId === 0 && inView && !document.hidden) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              if (inView) start();
              else stop();
            },
            { rootMargin: "15% 0px 15% 0px" },
          )
        : null;
    if (cardRef.current) observer?.observe(cardRef.current);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [soundRef]);

  const elevationM = Math.round(
    cfg.startElevationM + progress * (cfg.peakElevationM - cfg.startElevationM),
  );
  const elevationFt = Math.round(elevationM * 3.28084);
  const climbDeltaKm = (elevationM - cfg.startElevationM) / 1000;
  const temperatureC = cfg.baseTemperatureC - climbDeltaKm * cfg.lapseRateCPer1000m;
  const pressureHpa = Math.round(
    cfg.seaLevelPressureHpa * Math.pow(1 - 2.25577e-5 * elevationM, 5.25588),
  );
  const oxygenPctOfSeaLevel = Math.round((pressureHpa / cfg.seaLevelPressureHpa) * 100);
  const simulatedSpo2 = Math.max(
    82,
    Math.round(98 - Math.pow(Math.max(0, elevationM - 1300) / 1000, 1.55) * 2.4),
  );

  const activeCheckpoint = useMemo(() => {
    let closest: (typeof cfg.checkpoints)[number] = cfg.checkpoints[0];
    let minDiff = Infinity;
    for (const cp of cfg.checkpoints) {
      const diff = Math.abs(progress - cp.progress);
      if (diff < minDiff) {
        minDiff = diff;
        closest = cp;
      }
    }
    return closest;
  }, [cfg.checkpoints, progress]);

  const climberPoint = sampleTrailPoint(progress);
  const fullTrailPath = useMemo(() => buildTrailSvgPath(80, 1), []);
  const completedTrailPath = useMemo(() => buildTrailSvgPath(60, progress), [progress]);
  const summitPoint = sampleTrailPoint(1);

  return (
    <article ref={cardRef} className="bento-card altitude-card">
      <div className="bento-card-topline">
        <span>NEPAL / ANNAPURNA REGION · A HIGH POINT</span>
        <span>03 — TREKKING · 5,116 M</span>
      </div>

      <div className="cockpit-header">
        <div>
          <h3>{cfg.title}</h3>
          <p className="cockpit-sub">{cfg.subtitle}</p>
        </div>
        <div className="altitude-pill">
          <strong>{elevationM.toLocaleString("en-US")} m</strong>
          <span>{elevationFt.toLocaleString("en-US")} FT · PEAK 5,116 M</span>
        </div>
      </div>

      {/* Live Environmental Telemetry HUD */}
      <div className="altitude-telemetry-grid" aria-label="Live environmental telemetry">
        <div className="telemetry-box">
          <span>ELEVATION</span>
          <strong>
            {elevationM.toLocaleString("en-US")} <small>m</small>
          </strong>
        </div>
        <div className="telemetry-box">
          <span>TEMP (-6.5°C/km)</span>
          <strong className={temperatureC <= 0 ? "is-freezing" : ""}>
            {temperatureC > 0 ? `+${temperatureC.toFixed(1)}` : temperatureC.toFixed(1)} <small>°C</small>
          </strong>
        </div>
        <div className="telemetry-box">
          <span>PRESSURE</span>
          <strong>
            {pressureHpa} <small>hPa</small>
          </strong>
        </div>
        <div className="telemetry-box">
          <span>O₂ SAT / AIR</span>
          <strong>
            {simulatedSpo2}% <small>({oxygenPctOfSeaLevel}% O₂)</small>
          </strong>
        </div>
      </div>

      {/* Interactive 3D Parallax Mountain Stage */}
      <div
        ref={stageRef}
        className={`altitude-stage${isDragging ? " is-dragging" : ""}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          physicsRef.current.dragging = true;
          setIsDragging(true);
          updateTargetFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!physicsRef.current.dragging) return;
          updateTargetFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          physicsRef.current.dragging = false;
          setIsDragging(false);
        }}
        onPointerCancel={() => {
          physicsRef.current.dragging = false;
          setIsDragging(false);
        }}
      >
        <canvas ref={canvasRef} width={960} height={380} className="altitude-canvas" />

        <svg
          ref={svgRef}
          viewBox="0 0 740 340"
          className="altitude-trail-svg"
          role="img"
          aria-label="Interactive Himalayan elevation path to Tilicho Lake at 5,116 meters"
        >
          <defs>
            <linearGradient id="altitude-completed-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#8ce7e0" />
              <stop offset="55%" stopColor="#c78eff" />
              <stop offset="100%" stopColor="#ff7bd5" />
            </linearGradient>
          </defs>

          <g className="altitude-svg-grid">
            <line x1="40" y1="60" x2="700" y2="60" />
            <line x1="40" y1="140" x2="700" y2="140" />
            <line x1="40" y1="220" x2="700" y2="220" />
            <line x1="40" y1="300" x2="700" y2="300" />
          </g>

          <path d={fullTrailPath} className="altitude-path-base" />
          <path d={completedTrailPath} className="altitude-path-active" stroke="url(#altitude-completed-grad)" />

          {cfg.checkpoints.map((cp) => {
            const pt = sampleTrailPoint(cp.progress);
            const reached = progress >= cp.progress - 0.015;
            const isCurrent = activeCheckpoint.id === cp.id;
            return (
              <g key={cp.id} transform={`translate(${pt.x}, ${pt.y})`} className="altitude-cp-node">
                {isCurrent && <circle r="13" className="altitude-cp-pulse" />}
                <circle r={isCurrent ? "6" : "4.2"} className={`altitude-cp-dot${reached ? " is-reached" : ""}`} />
                <text y="-14" textAnchor="middle" className="altitude-cp-label">
                  {cp.elevationM}m
                </text>
              </g>
            );
          })}

          <g
            transform={`translate(${summitPoint.x}, ${summitPoint.y})`}
            className={`summit-flag-group${progress >= 0.96 || summitUnlocked ? " is-planted" : ""}`}
          >
            <line x1="0" y1="0" x2="0" y2="-36" className="summit-flag-pole" />
            <path d="M0 -36 L24 -28 L8 -23 L26 -15 L0 -15 Z" className="summit-flag-banner" />
          </g>

          <g transform={`translate(${climberPoint.x}, ${climberPoint.y})`} className="climber-avatar">
            <circle r="16" className="climber-halo" />
            <circle r="8.5" className="climber-core" />
            <circle r="3.2" className="climber-center" />
          </g>
        </svg>

        <div className="altitude-milestone-popup" onPointerDown={(e) => e.stopPropagation()}>
          <div className="milestone-popup-top">
            <span className="milestone-popup-tag">{activeCheckpoint.tag}</span>
            <a className="milestone-popup-link" href={activeCheckpoint.linkHref}>
              {activeCheckpoint.linkLabel} ↗
            </a>
          </div>
          <h4>{activeCheckpoint.name}</h4>
          <p>{activeCheckpoint.summary}</p>
        </div>
      </div>

      {/* Scrub Slider & Distinct Checkpoint Pills */}
      <div className="altitude-controls">
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(progress * 1000)}
          aria-label="Climb altitude slider from Kathmandu (1,320m) to Tilicho Lake (5,116m)"
          className="altitude-range-input"
          onChange={(e) => {
            physicsRef.current.target = Number(e.target.value) / 1000;
          }}
        />
        <div className="altitude-checkpoint-pills">
          {cfg.checkpoints.map((cp) => {
            const active = activeCheckpoint.id === cp.id;
            return (
              <button
                key={cp.id}
                type="button"
                className={`cp-jump-btn${active ? " is-active" : ""}`}
                onClick={() => {
                  physicsRef.current.target = cp.progress;
                }}
              >
                <span>{cp.elevationM.toLocaleString("en-US")}m</span>
                <small>{cp.shortLabel}</small>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * MODULE 04: PC + PlayStation 5 + Sim Racing Interactive Play Mode Card
 * ============================================================================
 */
function PlayModeCard({ onLaunchSim }: { onLaunchSim: () => void }) {
  const modes = SAIMAN_CONFIG.playModes;
  const [selectedId, setSelectedId] = useState<(typeof modes)[number]["id"]>("sim");
  const activeMode = modes.find((m) => m.id === selectedId) ?? modes[0];

  return (
    <article className="bento-card play-mode-card">
      <div className="bento-card-topline">
        <span>PC + PLAYSTATION 5</span>
        <span>04 — GAMES &amp; SIMS</span>
      </div>

      <div className="game-orbit" aria-hidden="true">
        <span className="game-orbit-ring" />
        <span className="game-core">
          PLAY
          <br />
          MODE
        </span>
        <span className="game-orbit-dot" />
      </div>

      <h3>
        Good stories.
        <br />
        Good games.
      </h3>
      <p>Story-driven games, team play, and driving simulators.</p>

      <div className="play-mode-selector" role="group" aria-label="Gaming platforms">
        {modes.map((mode) => {
          const active = mode.id === selectedId;
          return (
            <button
              key={mode.id}
              type="button"
              aria-pressed={active}
              className={`play-tag-btn${active ? " is-active" : ""}`}
              onClick={() => setSelectedId(mode.id)}
            >
              {mode.tag}
            </button>
          );
        })}
      </div>

      <div className="play-mode-detail">
        <strong>{activeMode.title}</strong>
        <p>{activeMode.detail}</p>
      </div>

      <button type="button" className="play-sim-launch-btn" onClick={onLaunchSim}>
        <span>Launch 0–140 Sim Run</span>
        <span aria-hidden="true">↑</span>
      </button>
    </article>
  );
}
