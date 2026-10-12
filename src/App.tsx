import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BatteryCharging,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Compass,
  Cpu,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Linkedin,
  MapPin,
  Mountain,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

type View = "professional" | "personal";
type V3 = [number, number, number];

const DOMAIN = "https://saimansah.com.np";
const TITLE =
  "Saiman Sah | Systems Researcher, Technologist & Founder";
const DESCRIPTION =
  "Saiman Sah is a self-taught software engineer, founder of Saiman Innovations and Chairman of AI Alliance, based in Kathmandu, Nepal.";

const PERSONAL_BIO =
  "Beyond software architecture and systems engineering, I am a passionate electric mobility advocate, high-altitude Himalayan trekker, and lifelong tech enthusiast. Driven by curiosity, I love exploring rugged mountain trails, testing endurance in extreme elevations, driving electric, and coding through late-night hours in Kathmandu.";

const PROJECTS = [
  {
    title: "Saiman Protocol",
    category: "NETWORK INTELLIGENCE",
    description:
      "Real-time network monitoring and threat intelligence packet inspection framework built for low-latency security auditing and traffic analysis.",
    tags: ["Packet inspection", "Threat detection", "Network analysis"],
    icon: Network,
  },
  {
    title: "High-Altitude IoT Trek Tracker",
    category: "EMBEDDED / FIELD ENGINEERING",
    description:
      "Ruggedized telemetry tracking device designed, assembled, and field-tested for extreme Himalayan altitudes up to 5,116 meters elevation.",
    tags: ["ESP32", "GPS telemetry", "5,116 m"],
    icon: CircuitBoard,
  },
  {
    title: "Saiman Innovations Platform",
    category: "CLOUD / APPLICATION ARCHITECTURE",
    description:
      "High-performance cloud architectures, scalable client software, and resilient full-stack systems engineering.",
    tags: ["Cloud infrastructure", "Web systems", "Client software"],
    icon: Code2,
  },
];

const CERTIFICATIONS = [
  {
    title: "Software Engineer",
    issuer: "HackerRank",
    field: "Software Engineering & Algorithms",
    highlight: "Problem Solving, Data Structures & Algorithm Design",
  },
  {
    title: "Building AI-Powered Search with MongoDB Vector Search",
    issuer: "MongoDB",
    field: "Artificial Intelligence & Search",
    highlight: "Vector Embeddings, RAG Architecture & Semantic Retrieval",
  },
  {
    title: "Istio and IBM Cloud Kubernetes Service",
    issuer: "IBM",
    field: "Cloud Infrastructure & Orchestration",
    highlight: "Service Mesh, Microservice Security & Container Traffic Routing",
  },
  {
    title: "Data Privacy Fundamentals",
    issuer: "IBM",
    field: "Compliance & Security",
    highlight: "Data Governance, Regulatory Privacy Frameworks & Audit Compliance",
  },
  {
    title: "Security Monitoring and Governance",
    issuer: "Microsoft Learn",
    field: "Enterprise Security & Threat Monitoring",
    highlight: "Security Posture Management, Threat Detection & Zero Trust Auditing",
  },
  {
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE",
    field: "Cybersecurity & Defense",
    highlight: "Defensive Operations, Risk Mitigation & System Hardening",
  },
  {
    title: "Arms Trade Treaty Reporting Course",
    issuer: "UNITAR (United Nations)",
    field: "International Governance",
    highlight: "Multilateral Reporting Frameworks & Transparency Standards",
  },
];

const SKILLS = [
  {
    title: "Web & systems",
    icon: Code2,
    text: "Next.js, React, TypeScript, Tailwind CSS, Python, C++, Three.js, WebGL",
  },
  {
    title: "Microcontrollers & embedded",
    icon: Cpu,
    text: "ESP32 development boards, Arduino IDE, UART / SPI / I2C communication, GPS telemetry integration",
  },
  {
    title: "Systems & cloud",
    icon: ShieldCheck,
    text: "Network threat detection, Kubernetes service mesh, DNS / SSL administration, Linux system hardening",
  },
];

const PASSIONS = [
  {
    title: "BYD Atto 3 & Electric Mobility",
    label: "QUIET POWER",
    icon: BatteryCharging,
    badge: "DAILY EV DRIVER",
    text: "Proud owner and daily driver of a BYD Atto 3 electric SUV. Fascinated by aerodynamic efficiency, cell-to-body architecture, blade battery safety, and the whisper-quiet instant torque on Kathmandu's roads.",
    metric: "BYD Atto 3 • 60.48 kWh Blade Battery",
  },
  {
    title: "Himalayan High Trails",
    label: "ALTITUDE ENDURANCE",
    icon: Mountain,
    badge: "5,116 METERS ELEVATION",
    text: "Himalayan mountain trekker across Nepal. Successfully completed strenuous high-altitude alpine trails reaching Tilicho Lake at 5,116 meters elevation—one of the world's highest glacial lakes.",
    metric: "Tilicho Lake: 5,116 m • High Himalayas",
  },
  {
    title: "Simulations & Gaming",
    label: "VIRTUAL WORLDS",
    icon: Gamepad2,
    badge: "PC & PLAYSTATION 5",
    text: "Passionate gamer immersed in story-driven single-player campaigns, precision driving simulators, and tactical team shooters. Inspired by 3D rendering engines and interactive physics.",
    metric: "Immersive Campaigns & Driving Sims",
  },
  {
    title: "Midnight Frequencies",
    label: "THE CODING SOUNDTRACK",
    icon: Headphones,
    badge: "ACOUSTIC → ELECTRONIC",
    text: "Late-night coding and deep work sessions in Kathmandu are powered by acoustic guitar melodies, Alan Walker, and Marshmello anthems, bridging calm harmony with upbeat rhythm.",
    metric: "English Acoustic • Alan Walker • Marshmello",
  },
];

const PERSONAL_JOURNEY = [
  {
    title: "Roots & Foundation",
    location: "Naya Gamhariya, Nepal",
    icon: Compass,
    description:
      "Alumnus of Shree Secondary School Naya Gamhariya. Rooted in disciplined self-learning, relentless curiosity, and solving problems from first principles without formal shortcuts.",
  },
  {
    title: "Himalayan Spirit",
    location: "High Altitude Nepal",
    icon: Mountain,
    description:
      "Trekking high alpine trails teaches patience, preparedness, and perseverance. Carrying custom-built telemetry hardware up to 5,116m merges nature with personal passion.",
  },
  {
    title: "Clean Technology",
    location: "Kathmandu & Highway Routes",
    icon: Zap,
    description:
      "Believer in clean energy and electric mobility. Driving an EV isn't just about zero emissions—it represents a thoughtful shift toward sustainable, silent, and smart engineering.",
  },
];

const SOCIALS: {
  name: string;
  url: string;
  favicon?: string;
  icon?: LucideIcon;
  note?: string;
}[] = [
  {
    name: "GitHub",
    url: "https://github.com/search?q=Saiman%20Sah&type=users",
    icon: Github,
    note: "Profile search",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/search/results/people/?keywords=Saiman%20Sah",
    icon: Linkedin,
    note: "Profile search",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/sahsaiman",
    favicon: "https://www.facebook.com/favicon.ico",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/sah_saiman",
    favicon: "https://www.instagram.com/favicon.ico",
  },
  {
    name: "X",
    url: "https://x.com/sah_saiman",
    favicon: "https://abs.twimg.com/favicons/twitter.3.ico",
  },
  {
    name: "Threads",
    url: "https://www.threads.com/@sah_saiman",
    favicon: "https://www.threads.com/favicon.ico",
  },
  {
    name: "Truth Social",
    url: "https://truthsocial.com/@sah_saiman",
    favicon: "https://truthsocial.com/favicon.ico",
  },
  {
    name: "Official website",
    url: DOMAIN,
    icon: Globe,
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${DOMAIN}/#person`,
      name: "Saiman Sah",
      url: DOMAIN,
      jobTitle:
        "Founder of Saiman Innovations & Chairman of AI Alliance",
      description: DESCRIPTION,
      worksFor: {
        "@type": "Organization",
        name: "Saiman Innovations",
        alternateName: "साइमन इनोभेसन",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      alumnusOf: {
        "@type": "EducationalOrganization",
        name: "Shree Secondary School Naya Gamhariya",
      },
      knowsAbout: [
        "Full-Stack Web Development",
        "Cybersecurity",
        "Embedded IoT",
        "ESP32",
        "Three.js",
        "Next.js",
        "Kubernetes",
        "AI Systems",
      ],
      sameAs: SOCIALS.filter((social) => social.favicon).map(
        (social) => social.url,
      ),
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      name: "Saiman Sah",
      url: DOMAIN,
      description: DESCRIPTION,
      inLanguage: "en",
      author: { "@id": `${DOMAIN}/#person` },
      about: { "@id": `${DOMAIN}/#person` },
    },
  ],
};

function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = TITLE;

    const restorations: (() => void)[] = [];

    const setMeta = (attribute: "name" | "property", key: string, value: string) => {
      const existing = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      const node = existing ?? document.createElement("meta");
      const previous = existing?.getAttribute("content");

      node.setAttribute(attribute, key);
      node.setAttribute("content", value);

      if (!existing) document.head.appendChild(node);

      restorations.push(() => {
        if (!existing) node.remove();
        else if (previous !== null && previous !== undefined) {
          node.setAttribute("content", previous);
        } else node.removeAttribute("content");
      });
    };

    setMeta("name", "description", DESCRIPTION);
    setMeta("name", "theme-color", "#07080c");
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("property", "og:url", DOMAIN);
    setMeta("property", "og:type", "profile");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);

    const existingCanonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonical = existingCanonical ?? document.createElement("link");
    const oldCanonical = existingCanonical?.getAttribute("href");
    canonical.rel = "canonical";
    canonical.href = DOMAIN;
    if (!existingCanonical) document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
      restorations.reverse().forEach((restore) => restore());
      if (!existingCanonical) canonical.remove();
      else if (oldCanonical !== null && oldCanonical !== undefined) {
        canonical.setAttribute("href", oldCanonical);
      } else canonical.removeAttribute("href");
    };
  }, []);
}

/* Procedural geometry utilities */

function Tube({
  points,
  radius = 0.012,
  color = "#182430",
  emissive,
}: {
  points: V3[];
  radius?: number;
  color?: string;
  emissive?: string;
}) {
  const key = JSON.stringify(points);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      (JSON.parse(key) as V3[]).map((point) => new THREE.Vector3(...point)),
    );
    return new THREE.TubeGeometry(curve, 28, radius, 7, false);
  }, [key, radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.45}
        metalness={0.55}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? 2.5 : 0}
        toneMapped={!emissive}
      />
    </mesh>
  );
}

function Block({
  position = [0, 0, 0],
  size,
  color = "#141c25",
  radius = 0.015,
  metalness = 0.4,
  roughness = 0.45,
}: {
  position?: V3;
  size: V3;
  color?: string;
  radius?: number;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <RoundedBox
      position={position}
      args={size}
      radius={Math.min(radius, Math.min(...size) / 2 - 0.0001)}
      smoothness={3}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </RoundedBox>
  );
}

function LED({
  position,
  size,
  color = "#06b6d4",
}: {
  position: V3;
  size: V3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

/* Real-time monitor textures */

function useMonitorTexture(mode: "terminal" | "network", reduced: boolean) {
  const resource = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    const context = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return { canvas, context, texture, lastFrame: -1 };
  }, []);

  useEffect(() => () => resource.texture.dispose(), [resource]);

  useFrame((state) => {
    const time = reduced ? 0 : state.clock.elapsedTime;
    const tick = Math.floor(time * 8);
    if (resource.lastFrame === tick) return;
    resource.lastFrame = tick;

    const ctx = resource.context;
    if (!ctx) return;

    const width = resource.canvas.width;
    const height = resource.canvas.height;

    ctx.fillStyle = "#07121b";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#102431";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 64);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 64; y < height; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#112332";
    ctx.fillRect(0, 0, width, 64);
    ["#fb7185", "#fbbf24", "#34d399"].forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(24 + index * 23, 31, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = "17px monospace";
    ctx.fillStyle = "#a1b8ca";
    ctx.fillText(
      mode === "terminal"
        ? "saiman@studio : ~/systems"
        : "LAB / TOPOLOGY SIMULATION",
      125,
      37,
    );

    if (mode === "terminal") {
      const lines = [
        "$ initialize studio --environment local",
        "[ok] application runtime ready",
        "[ok] telemetry interface connected",
        "> UART: 115200 / SPI bus: active",
        "[info] packet inspection pipeline loaded",
        "[ok] ESP32 development interface online",
        "> compiling application graph...",
        "[ok] diagnostics complete",
        "> memory integrity check: passed",
        "[info] awaiting next telemetry sample",
        "$ run network observer --local",
        "[ok] service mesh topology resolved",
        "> system state: nominal",
      ];

      const offset = Math.floor(time * 0.7);
      ctx.font = "21px monospace";
      for (let row = 0; row < 12; row++) {
        const text = lines[(row + offset) % lines.length];
        ctx.fillStyle = text.startsWith("[ok]")
          ? "#5eead4"
          : text.startsWith("$")
            ? "#c4b5fd"
            : "#a6c1d6";
        ctx.fillText(text, 32, 106 + row * 33);
      }

      ctx.fillStyle = "#081923";
      ctx.fillRect(0, 520, width, 56);
      ctx.font = "16px monospace";
      ctx.fillStyle = "#67e8f9";
      ctx.fillText("LOCAL SIMULATION  /  SYSTEMS LAB  /  NEPAL", 30, 552);
      if (Math.floor(time * 2) % 2 === 0) {
        ctx.fillRect(31, 493, 11, 21);
      }
    } else {
      ctx.font = "20px monospace";
      ctx.fillStyle = "#e2e8f0";
      ctx.fillText("NEURAL GRAPH / SIGNAL ROUTING", 34, 107);

      const layers = [4, 6, 5, 3];
      const nodes: { x: number; y: number }[][] = layers.map(
        (count, layer) =>
          Array.from({ length: count }, (_, index) => ({
            x: 120 + layer * 238,
            y: 163 + index * (250 / Math.max(count - 1, 1)),
          })),
      );

      for (let layer = 0; layer < nodes.length - 1; layer++) {
        nodes[layer].forEach((a, i) => {
          nodes[layer + 1].forEach((b, j) => {
            const alpha =
              0.08 + (0.5 + 0.5 * Math.sin(time + i * 1.7 + j)) * 0.2;
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          });
        });
      }

      nodes.flat().forEach((node, index) => {
        ctx.fillStyle =
          index % 3 === 0 ? "#a78bfa" : "#22d3ee";
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          5 + Math.sin(time * 1.4 + index) * 1.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      ctx.strokeStyle = "#5eead4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 32; x < 992; x += 3) {
        const y =
          491 -
          Math.sin(x * 0.028 + time * 1.3) * 15 -
          Math.sin(x * 0.076 - time) * 7;
        if (x === 32) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.font = "15px monospace";
      ctx.fillStyle = "#9fb5c8";
      ctx.fillText("PROCEDURAL VISUALIZATION / NOT LIVE PRODUCTION DATA", 32, 551);
    }

    resource.texture.needsUpdate = true;
  });

  return resource.texture;
}

function curvedScreen(width: number, height: number) {
  const geometry = new THREE.PlaneGeometry(width, height, 48, 1);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index);
    positions.setZ(index, (x * x / (width * width)) * 0.1);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function Monitor({
  side,
  reduced,
}: {
  side: -1 | 1;
  reduced: boolean;
}) {
  const texture = useMonitorTexture(
    side === -1 ? "terminal" : "network",
    reduced,
  );
  const geometry = useMemo(() => curvedScreen(0.71, 0.4), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group
      position={[side * 0.386, 1.185, -0.09]}
      rotation={[0, -side * 0.14, 0]}
    >
      <Block
        size={[0.755, 0.45, 0.05]}
        color="#11171f"
        roughness={0.38}
        radius={0.02}
      />
      <mesh geometry={geometry} position={[0, 0, 0.028]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <LED
        position={[0, -0.211, 0.027]}
        size={[0.36, 0.003, 0.005]}
      />
      <Tube
        points={[
          [0, 0, -0.03],
          [-side * 0.18, -0.06, -0.14],
          [-side * 0.31, -0.27, -0.15],
          [-side * 0.36, -0.39, -0.11],
        ]}
        radius={0.018}
      />
    </group>
  );
}

/* Workstation hardware */

function Fan({
  position,
  reduced,
}: {
  position: V3;
  reduced: boolean;
}) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (rotor.current && !reduced) {
      rotor.current.rotation.z -= Math.min(dt, 0.05) * 5;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <torusGeometry args={[0.069, 0.006, 8, 32]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <group ref={rotor}>
        {Array.from({ length: 7 }, (_, index) => (
          <mesh
            key={index}
            position={[
              Math.sin(index * Math.PI * 2 / 7) * 0.036,
              Math.cos(index * Math.PI * 2 / 7) * 0.036,
              0,
            ]}
            rotation={[0, 0, -index * Math.PI * 2 / 7 + 0.5]}
          >
            <boxGeometry args={[0.025, 0.056, 0.006]} />
            <meshStandardMaterial
              color="#283844"
              roughness={0.5}
              metalness={0.6}
            />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.018, 0.018, 0.012, 16]} />
          <meshStandardMaterial color="#13232d" />
        </mesh>
      </group>
    </group>
  );
}

function ComputerRig({ reduced }: { reduced: boolean }) {
  return (
    <group position={[1.025, 1.015, -0.08]}>
      <Block size={[0.31, 0.56, 0.42]} color="#0c1118" radius={0.018} />

      <mesh position={[0, 0, 0.216]}>
        <planeGeometry args={[0.278, 0.52]} />
        <meshPhysicalMaterial
          color="#b7d7ee"
          transparent
          opacity={0.12}
          roughness={0.09}
          metalness={0.05}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Block
        position={[-0.012, 0, 0.155]}
        size={[0.22, 0.44, 0.02]}
        color="#1a2631"
        radius={0.004}
      />
      <Block
        position={[0.065, -0.08, 0.18]}
        size={[0.038, 0.24, 0.025]}
        color="#0b151e"
        radius={0.004}
      />

      <Fan position={[-0.025, 0.132, 0.234]} reduced={reduced} />
      <Fan position={[-0.025, -0.043, 0.234]} reduced={reduced} />

      <LED
        position={[-0.137, 0, 0.227]}
        size={[0.005, 0.49, 0.005]}
      />
      <LED
        position={[0.137, 0, 0.227]}
        size={[0.005, 0.49, 0.005]}
        color="#8b5cf6"
      />
      <LED
        position={[0.065, -0.08, 0.199]}
        size={[0.008, 0.23, 0.008]}
        color="#a78bfa"
      />

      <pointLight
        color="#06b6d4"
        intensity={0.22}
        distance={0.7}
        position={[0, 0.1, 0.25]}
      />
    </group>
  );
}

function ESP32({ reduced }: { reduced: boolean }) {
  const status = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (status.current) {
      status.current.color.set(
        reduced || Math.sin(state.clock.elapsedTime * 3.2) > -0.3
          ? "#fbbf24"
          : "#60471a",
      );
    }
  });

  return (
    <group position={[-0.86, 0.785, 0.16]} rotation={[0, -0.24, 0]}>
      <Block
        size={[0.15, 0.014, 0.255]}
        color="#073e36"
        radius={0.004}
        metalness={0.15}
      />
      <Block
        position={[0, 0.018, -0.024]}
        size={[0.103, 0.025, 0.12]}
        color="#8d9caa"
        radius={0.004}
        metalness={0.88}
      />
      <Block
        position={[0, 0.017, 0.105]}
        size={[0.043, 0.021, 0.035]}
        color="#aab5bf"
        radius={0.003}
        metalness={0.95}
      />

      {[-1, 1].map((side) =>
        Array.from({ length: 15 }, (_, index) => (
          <mesh
            key={`${side}-${index}`}
            position={[side * 0.065, 0.017, -0.112 + index * 0.0155]}
          >
            <boxGeometry args={[0.008, 0.012, 0.007]} />
            <meshStandardMaterial
              color="#c9ae69"
              metalness={0.9}
              roughness={0.27}
            />
          </mesh>
        )),
      )}

      {[0, 1, 2].map((index) => (
        <Tube
          key={index}
          points={[
            [-0.04 + index * 0.018, 0.016, -0.108],
            [-0.04 + index * 0.018, 0.016, -0.082],
            [-0.027 + index * 0.018, 0.016, -0.082],
            [-0.027 + index * 0.018, 0.016, -0.11],
          ]}
          radius={0.0017}
          color="#cfb87a"
        />
      ))}

      <mesh position={[0.035, 0.017, 0.062]}>
        <boxGeometry args={[0.009, 0.008, 0.009]} />
        <meshBasicMaterial ref={status} color="#fbbf24" toneMapped={false} />
      </mesh>
      <LED
        position={[-0.034, 0.017, 0.063]}
        size={[0.008, 0.008, 0.008]}
        color="#2dd4bf"
      />
    </group>
  );
}

function Keyboard() {
  const keys = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!keys.current) return;
    const dummy = new THREE.Object3D();

    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 15; column++) {
        const index = row * 15 + column;
        dummy.position.set(
          -0.264 + column * 0.0375,
          0.022,
          -0.074 + row * 0.036,
        );
        dummy.updateMatrix();
        keys.current.setMatrixAt(index, dummy.matrix);
        keys.current.setColorAt(
          index,
          new THREE.Color(
            column === 0 || row === 0 ? "#394553" : "#25313d",
          ),
        );
      }
    }

    keys.current.instanceMatrix.needsUpdate = true;
    if (keys.current.instanceColor) {
      keys.current.instanceColor.needsUpdate = true;
    }
    keys.current.computeBoundingSphere();
  }, []);

  return (
    <group position={[-0.06, 0.781, 0.27]} rotation={[0, -0.03, 0]}>
      <Block
        size={[0.6, 0.029, 0.211]}
        color="#0d151f"
        radius={0.012}
      />
      <LED
        position={[0, -0.014, 0.103]}
        size={[0.55, 0.005, 0.004]}
        color="#8b5cf6"
      />
      <instancedMesh
        ref={keys}
        args={[undefined, undefined, 75]}
        castShadow
      >
        <boxGeometry args={[0.029, 0.012, 0.026]} />
        <meshStandardMaterial roughness={0.68} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

function Workstation({ reduced }: { reduced: boolean }) {
  return (
    <group>
      <Block
        position={[0, 0.73, 0]}
        size={[2.5, 0.075, 0.95]}
        color="#111820"
        radius={0.03}
        metalness={0.25}
        roughness={0.72}
      />

      {[-1, 1].map((side) => (
        <group key={side}>
          <Block
            position={[side * 1.02, 0.36, -0.09]}
            size={[0.055, 0.7, 0.055]}
            color="#17212a"
          />
          <Block
            position={[side * 1.02, 0.035, -0.04]}
            size={[0.09, 0.05, 0.73]}
            color="#17212a"
          />
        </group>
      ))}

      <LED
        position={[0, 0.68, -0.435]}
        size={[2.27, 0.006, 0.01]}
        color="#06b6d4"
      />

      <Monitor side={-1} reduced={reduced} />
      <Monitor side={1} reduced={reduced} />
      <ComputerRig reduced={reduced} />
      <ESP32 reduced={reduced} />
      <Keyboard />

      <mesh
        position={[0.59, 0.798, 0.26]}
        scale={[0.049, 0.026, 0.081]}
        castShadow
      >
        <sphereGeometry args={[1, 24, 18]} />
        <meshStandardMaterial
          color="#263340"
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      <LED
        position={[0.59, 0.82, 0.239]}
        size={[0.004, 0.005, 0.027]}
        color="#2dd4bf"
      />

      <Tube
        points={[
          [0.59, 0.782, 0.18],
          [0.66, 0.779, 0.02],
          [0.58, 0.779, -0.23],
          [0.26, 0.779, -0.31],
        ]}
        radius={0.004}
        color="#111720"
      />

      <pointLight
        position={[0, 0.52, -0.38]}
        color="#06b6d4"
        intensity={0.5}
        distance={2}
      />
    </group>
  );
}

/* Procedural compact electric SUV.
   Overall local envelope: 4.455 m long × 1.875 m wide × 1.615 m tall. */

function makeCarBody() {
  const sections = [
    [-2.2275, 0.72, 0.63, 0.91],
    [-2.02, 0.89, 0.48, 1.035],
    [-1.55, 0.9375, 0.43, 1.09],
    [-0.85, 0.9375, 0.43, 1.065],
    [0.15, 0.9375, 0.43, 1.07],
    [1.19, 0.9375, 0.44, 1.095],
    [1.94, 0.885, 0.49, 1.06],
    [2.2275, 0.78, 0.62, 0.98],
  ];

  const vertices: number[] = [];
  const indices: number[] = [];

  sections.forEach(([z, width, bottom, top]) => {
    const ring: V3[] = [
      [-width * 0.87, bottom, z],
      [-width, bottom + 0.13, z],
      [-width, top - 0.13, z],
      [-width * 0.88, top, z],
      [width * 0.88, top, z],
      [width, top - 0.13, z],
      [width, bottom + 0.13, z],
      [width * 0.87, bottom, z],
    ];
    ring.forEach((point) => vertices.push(...point));
  });

  for (let section = 0; section < sections.length - 1; section++) {
    for (let corner = 0; corner < 8; corner++) {
      const a = section * 8 + corner;
      const b = section * 8 + (corner + 1) % 8;
      const c = (section + 1) * 8 + corner;
      const d = (section + 1) * 8 + (corner + 1) % 8;
      indices.push(a, b, c, b, d, c);
    }
  }

  for (let corner = 1; corner < 7; corner++) {
    indices.push(0, corner + 1, corner);
    const end = (sections.length - 1) * 8;
    indices.push(end, end + corner, end + corner + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function Quad({
  points,
  color = "#0b1722",
  glass = false,
}: {
  points: V3[];
  color?: string;
  glass?: boolean;
}) {
  const key = JSON.stringify(points);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        (JSON.parse(key) as V3[]).flat(),
        3,
      ),
    );
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();
    return g;
  }, [key]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial
        color={color}
        side={THREE.DoubleSide}
        metalness={glass ? 0.42 : 0.85}
        roughness={glass ? 0.08 : 0.18}
        clearcoat={1}
        clearcoatRoughness={0.12}
      />
    </mesh>
  );
}

function useTreadTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#343434";
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = "#090909";
      ctx.lineWidth = 5;

      for (let x = -128; x < 256; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 30, 64);
        ctx.lineTo(x, 128);
        ctx.stroke();
      }

      ctx.strokeStyle = "#151515";
      ctx.lineWidth = 3;
      [35, 92].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y);
        ctx.stroke();
      });
    }

    const result = new THREE.CanvasTexture(canvas);
    result.wrapS = THREE.RepeatWrapping;
    result.wrapT = THREE.RepeatWrapping;
    result.repeat.set(9, 2);
    return result;
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

function Wheel({
  position,
  side,
  tread,
}: {
  position: V3;
  side: -1 | 1;
  tread: THREE.Texture;
}) {
  return (
    <group position={position} rotation={[0, side * Math.PI / 2, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.257, 0.073, 14, 48]} />
        <meshStandardMaterial
          color="#171b20"
          roughness={0.94}
          bumpMap={tread}
          bumpScale={0.012}
        />
      </mesh>

      <mesh position={[0, 0, 0.028]}>
        <cylinderGeometry args={[0.215, 0.215, 0.08, 32]} />
        <meshStandardMaterial
          color="#1b242d"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 0.073]}>
        <torusGeometry args={[0.212, 0.012, 8, 40]} />
        <meshStandardMaterial
          color="#a9b6c2"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {Array.from({ length: 5 }, (_, index) => (
        <group key={index} rotation={[0, 0, index * Math.PI * 2 / 5]}>
          <mesh position={[0.035, 0.116, 0.076]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.052, 0.177, 0.018]} />
            <meshStandardMaterial
              color="#aabac8"
              metalness={0.95}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[-0.029, 0.12, 0.077]} rotation={[0, 0, 0.19]}>
            <boxGeometry args={[0.015, 0.173, 0.017]} />
            <meshStandardMaterial
              color="#4c6577"
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0, 0.084]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.016, 24]} />
        <meshStandardMaterial
          color="#657b8c"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}

function Vehicle() {
  const body = useMemo(makeCarBody, []);
  const tread = useTreadTexture();

  useEffect(() => () => body.dispose(), [body]);

  const paint = "#33495d";

  return (
    <group position={[0.1, 0, -2.72]} rotation={[0, -0.33, 0]} scale={0.72}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={paint}
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Block
        position={[0, 1.565, -0.03]}
        size={[1.55, 0.1, 1.69]}
        radius={0.045}
        color={paint}
        metalness={0.85}
        roughness={0.18}
      />

      <Quad
        glass
        points={[
          [-0.78, 1.52, 0.77],
          [0.78, 1.52, 0.77],
          [0.865, 1.075, 1.24],
          [-0.865, 1.075, 1.24],
        ]}
      />
      <Quad
        glass
        points={[
          [0.78, 1.52, -0.84],
          [-0.78, 1.52, -0.84],
          [-0.86, 1.08, -1.43],
          [0.86, 1.08, -1.43],
        ]}
      />

      {([-1, 1] as const).map((side) => (
        <group key={side}>
          <Quad
            glass
            points={[
              [side * 0.79, 1.5, 0.73],
              [side * 0.79, 1.5, -0.78],
              [side * 0.91, 1.09, -1.35],
              [side * 0.91, 1.09, 1.16],
            ]}
          />

          <Tube
            points={[
              [side * 0.82, 1.515, -0.84],
              [side * 0.81, 1.54, 0.15],
              [side * 0.82, 1.515, 0.78],
            ]}
            radius={0.022}
            color="#b4c2ce"
          />

          <Tube
            points={[
              [side * 0.912, 1.07, -1.37],
              [side * 0.928, 1.075, -0.1],
              [side * 0.914, 1.07, 1.2],
            ]}
            radius={0.018}
            color="#aab9c7"
          />

          <Tube
            points={[
              [side * 0.8, 1.52, 0.04],
              [side * 0.91, 1.08, 0.04],
            ]}
            radius={0.041}
            color="#101820"
          />

          <Tube
            points={[
              [side * 0.787, 1.52, 0.76],
              [side * 0.912, 1.075, 1.235],
            ]}
            radius={0.034}
            color={paint}
          />

          <Tube
            points={[
              [side * 0.79, 1.52, -0.84],
              [side * 0.916, 1.08, -1.41],
            ]}
            radius={0.045}
            color={paint}
          />

          <Block
            position={[side * 1.005, 1.08, 0.87]}
            size={[0.22, 0.095, 0.17]}
            radius={0.032}
            color={paint}
            metalness={0.85}
            roughness={0.18}
          />

          <LED
            position={[side * 1.008, 1.07, 0.961]}
            size={[0.14, 0.007, 0.007]}
            color="#e3f5ff"
          />

          {[-0.68, 0.62].map((z) => {
            const seam: V3[] = [
              [side * 0.944, 1.01, z],
              [side * 0.946, 0.79, z + 0.015],
              [side * 0.921, 0.5, z + 0.025],
            ];
            return (
              <group key={z}>
                <Tube points={seam} radius={0.0035} color="#101922" />
                <Block
                  position={[side * 0.947, 0.995, z + 0.22]}
                  size={[0.014, 0.026, 0.132]}
                  color="#b1bdc8"
                  radius={0.006}
                  metalness={0.95}
                />
              </group>
            );
          })}

          <Block
            position={[side * 0.94, 0.45, 0]}
            size={[0.035, 0.078, 2.3]}
            color="#0a1118"
            radius={0.012}
          />

          {[-1.3, 1.32].map((z) => (
            <group key={z}>
              <Wheel
                position={[side * 0.935, 0.33, z]}
                side={side}
                tread={tread}
              />
              <Tube
                points={Array.from({ length: 17 }, (_, index) => {
                  const angle = index * Math.PI / 16;
                  return [
                    side * 0.95,
                    0.33 + Math.sin(angle) * 0.355,
                    z + Math.cos(angle) * 0.355,
                  ] as V3;
                })}
                radius={0.027}
                color="#101820"
              />
            </group>
          ))}
        </group>
      ))}

      <Block
        position={[0, 0.65, 2.196]}
        size={[1.55, 0.28, 0.09]}
        color="#0b131b"
        radius={0.03}
      />

      <Tube
        points={[
          [-0.8, 0.962, 2.095],
          [-0.42, 0.987, 2.216],
          [0, 0.99, 2.247],
          [0.42, 0.987, 2.216],
          [0.8, 0.962, 2.095],
        ]}
        radius={0.012}
        color="#e5f7ff"
        emissive="#b8eaff"
      />

      {[-1, 1].map((side) => (
        <group key={side}>
          <LED
            position={[side * 0.66, 0.921, 2.18]}
            size={[0.31, 0.041, 0.018]}
            color="#d8f5ff"
          />
          <LED
            position={[side * 0.7, 0.71, 2.21]}
            size={[0.11, 0.013, 0.012]}
            color="#a4d6ff"
          />
        </group>
      ))}

      <Block
        position={[0, 0.745, 2.253]}
        size={[0.4, 0.11, 0.012]}
        color="#1e2c39"
        radius={0.008}
      />

      <Tube
        points={[
          [-0.83, 0.97, -2.07],
          [-0.4, 1.013, -2.218],
          [0, 1.02, -2.24],
          [0.4, 1.013, -2.218],
          [0.83, 0.97, -2.07],
        ]}
        radius={0.018}
        color="#fb4265"
        emissive="#f43f5e"
      />

      <Block
        position={[0, 1.535, -0.91]}
        size={[1.54, 0.055, 0.24]}
        color="#182735"
        radius={0.02}
        metalness={0.85}
        roughness={0.18}
      />
    </group>
  );
}

/* Atmosphere */

const PARTICLE_VERTEX = `
uniform float uTime;
uniform float uDpr;
attribute float aSeed;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.12 + aSeed * 20.0) * 0.15;
  p.y += sin(uTime * 0.18 + aSeed * 34.0) * 0.12;
  p.z += cos(uTime * 0.10 + aSeed * 17.0) * 0.15;
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = clamp((1.5 + aSeed * 2.0) * uDpr * 3.0 / -view.z, 1.0, 5.0);
  vAlpha = 0.2 + 0.45 * (0.5 + 0.5 * sin(uTime * 0.4 + aSeed * 29.0));
}
`;

const PARTICLE_FRAGMENT = `
varying float vAlpha;
void main() {
  float distanceToCenter = length(gl_PointCoord - vec2(0.5));
  float alpha = (1.0 - smoothstep(0.05, 0.5, distanceToCenter)) * vAlpha;
  gl_FragColor = vec4(0.23, 0.75, 0.88, alpha);
}
`;

function Particles({ reduced }: { reduced: boolean }) {
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const random = seededRandom(612);
    const positions = new Float32Array(780 * 3);
    const seeds = new Float32Array(780);

    for (let index = 0; index < 780; index++) {
      positions[index * 3] = (random() - 0.5) * 12;
      positions[index * 3 + 1] = random() * 5.5 + 0.1;
      positions[index * 3 + 2] = random() * 10 - 7;
      seeds[index] = random();
    }

    const result = new THREE.BufferGeometry();
    result.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    result.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return result;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDpr: { value: 1 },
    }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
    uniforms.uDpr.value = gl.getPixelRatio();
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={PARTICLE_VERTEX}
        fragmentShader={PARTICLE_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function StudioFloor() {
  const grid = useMemo(() => {
    const helper = new THREE.GridHelper(20, 80, "#17414a", "#10222d");
    const materials = Array.isArray(helper.material)
      ? helper.material
      : [helper.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.18;
      material.depthWrite = false;
    });
    return helper;
  }, []);

  useEffect(
    () => () => {
      grid.geometry.dispose();
      const materials = Array.isArray(grid.material)
        ? grid.material
        : [grid.material];
      materials.forEach((material) => material.dispose());
    },
    [grid],
  );

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0b1119"
          roughness={0.28}
          metalness={0.7}
        />
      </mesh>
      <primitive object={grid} position={[0, 0.003, -2]} />

      <Block
        position={[0, 2.6, -5.9]}
        size={[12, 5.2, 0.1]}
        color="#090f17"
        roughness={0.85}
        metalness={0.1}
      />

      {[-3.3, 3.3].map((x) => (
        <group key={x}>
          <Block
            position={[x, 1.8, -5.81]}
            size={[0.035, 3.6, 0.04]}
            color="#12202c"
          />
          <LED
            position={[x, 1.8, -5.77]}
            size={[0.008, 3.3, 0.006]}
            color={x < 0 ? "#06b6d4" : "#8b5cf6"}
          />
        </group>
      ))}

      <LED
        position={[0, 3.5, -5.76]}
        size={[6.6, 0.01, 0.008]}
        color="#24566d"
      />
    </>
  );
}

/* Camera and lifecycle */

function CameraController({
  view,
  reduced,
}: {
  view: View;
  reduced: boolean;
}) {
  const { camera } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const focus = useRef(new THREE.Vector3(0, 1, 0));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredFocus = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };
    const clear = () => pointer.current.set(0, 0);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", clear);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", clear);
    };
  }, []);

  useFrame((_, delta) => {
    if (view === "professional") {
      // Workstation view: positioned directly in front of desk facing dual monitors
      desiredPosition.set(
        pointer.current.x * 0.28,
        1.38 + pointer.current.y * 0.14,
        1.85 - Math.abs(pointer.current.x) * 0.05,
      );
      desiredFocus.set(
        pointer.current.x * 0.12,
        1.08 + pointer.current.y * 0.08,
        0,
      );
    } else {
      // Personal view: positioned to dramatically showcase the BYD Atto 3 SUV
      desiredPosition.set(
        2.2 + pointer.current.x * 0.35,
        1.32 + pointer.current.y * 0.16,
        -1.35 + pointer.current.x * 0.15,
      );
      desiredFocus.set(
        0.1 + pointer.current.x * 0.1,
        0.78 + pointer.current.y * 0.08,
        -2.72,
      );
    }

    const t = reduced ? 1 : Math.min(1, delta * 3.6);
    camera.position.lerp(desiredPosition, t);
    focus.current.lerp(desiredFocus, t);
    camera.lookAt(focus.current);
  });

  return null;
}

function StudioScene({
  view,
  reduced,
}: {
  view: View;
  reduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#07080c"]} />

      <ambientLight intensity={0.4} color="#0c1724" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        color="#e0f2fe"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-4, 4, -2]}
        intensity={0.6}
        color="#38bdf8"
      />
      <pointLight
        position={[0, 3, -1]}
        intensity={0.8}
        color="#06b6d4"
        distance={8}
      />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[0, 4, -2]}
          scale={[10, 4, 1]}
          target={[0, 0, -1]}
        />
        <Lightformer
          form="ring"
          intensity={1.2}
          color="#06b6d4"
          position={[-3, 2, 1]}
          scale={3}
          target={[0, 1, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.8}
          color="#8b5cf6"
          position={[3, 2, -2]}
          scale={3}
          target={[0, 1, -2]}
        />
      </Environment>

      <StudioFloor />
      <Workstation reduced={reduced} />
      <Vehicle />
      <Particles reduced={reduced} />
      <CameraController view={view} reduced={reduced} />
    </>
  );
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07080c] text-cyan-400 font-mono text-sm">
            [ WebGL Canvas fallback mode ]
          </div>
        )
      );
    }
    return this.props.children;
  }
}

function SocialFavicon({
  social,
}: {
  social: (typeof SOCIALS)[number];
}) {
  const [error, setError] = useState(false);
  const Icon = social.icon ?? Globe;

  if (social.favicon && !error) {
    return (
      <img
        src={social.favicon}
        alt=""
        className="w-4 h-4 rounded-sm object-contain"
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }

  return <Icon className="w-4 h-4 text-cyan-400" />;
}

export default function App() {
  const [view, setView] = useState<View>("professional");
  const reduced = useReducedMotion();
  useMetadata();

  const handleViewToggle = useCallback((next: View) => {
    setView(next);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* 3D Procedural Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <CanvasErrorBoundary>
          <Canvas
            shadows
            camera={{ position: [0, 1.4, 1.85], fov: 46, near: 0.1, far: 50 }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
            }}
          >
            <Suspense fallback={null}>
              <StudioScene view={view} reduced={reduced} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Foreground UI Overlay */}
      <div className="relative z-10 pointer-events-none flex flex-col min-h-screen">
        {/* Navigation Header */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-[#07080c]/85 border-b border-cyan-800/40 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 pointer-events-auto shadow-lg shadow-black/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
            <div>
              <span className="font-extrabold text-base tracking-wider text-white uppercase font-mono block">
                Saiman Sah
              </span>
              <span className="text-xs text-cyan-300 font-mono font-medium block">
                {view === "professional"
                  ? "SYSTEMS RESEARCHER & FOUNDER"
                  : "EXPLORER, EV DRIVER & TREKKER"}
              </span>
            </div>
          </div>

          {/* Perspective View Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/95 border border-cyan-500/30 shadow-inner">
            <button
              onClick={() => handleViewToggle("professional")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                view === "professional"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.5)] font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Professional &amp; Systems
            </button>
            <button
              onClick={() => handleViewToggle("personal")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                view === "personal"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.5)] font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Personal &amp; Passions
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/60">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">Kathmandu, Nepal</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10">
          {/* Hero Banner Section */}
          <section className="pointer-events-auto max-w-3xl bg-[#090f19]/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 md:p-9 shadow-2xl shadow-black/80">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-semibold mb-4 shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>
                {view === "professional"
                  ? "PERSPECTIVE: WORKSTATION & INFRASTRUCTURE"
                  : "PERSPECTIVE: PERSONAL PASSIONS & BYD ATTO 3"}
              </span>
            </div>

            {/* Replaced headline with Saiman Sah as explicitly requested */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">
              Saiman Sah
            </h1>

            <p className="text-base md:text-lg font-mono font-semibold text-cyan-300 mb-4 tracking-wide">
              {view === "professional"
                ? "Systems Researcher, Software Engineer & Founder"
                : "Himalayan Trekker, EV Enthusiast & Lifelong Explorer"}
            </p>

            <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6 font-normal">
              {view === "professional" ? DESCRIPTION : PERSONAL_BIO}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={view === "professional" ? "#projects" : "#passions"}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono transition-colors shadow-lg shadow-cyan-400/30"
              >
                <span>{view === "professional" ? "EXPLORE PROJECTS" : "EXPLORE PASSIONS"}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              {view === "professional" && (
                <a
                  href="#certifications"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold text-xs font-mono transition-colors shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>VIEW CERTIFICATIONS</span>
                </a>
              )}

              <button
                onClick={() =>
                  handleViewToggle(
                    view === "professional" ? "personal" : "professional",
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-mono font-medium transition-colors"
              >
                <span>
                  SWITCH TO {view === "professional" ? "PERSONAL VIEW" : "PROFESSIONAL VIEW"}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </section>

          {/* VIEW CONDITIONAL CONTENT */}
          {view === "professional" ? (
            /* PROFESSIONAL VIEW: Projects, Technical Disciplines, and Highlighted Certifications */
            <div className="space-y-12">
              {/* Highlighted Certifications Section (Prioritized & Emphasized) */}
              <section id="certifications" className="pointer-events-auto space-y-5">
                <div className="flex flex-wrap items-center justify-between border-b border-cyan-800/40 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                        Verified Credentials &amp; Certifications
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono font-bold lowercase">
                          7 verified
                        </span>
                      </h2>
                      <p className="text-xs text-slate-300 font-mono mt-0.5">
                        Industry-standard certifications in software engineering, AI vector search, Kubernetes, and security governance
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700">
                    // CREDENTIAL MATRIX
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#0c1322]/95 backdrop-blur-2xl border-2 border-cyan-500/30 hover:border-amber-400/80 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/40 text-amber-300 uppercase tracking-wider">
                            {cert.issuer}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-2">
                          {cert.title}
                        </h3>

                        <p className="text-xs font-mono text-cyan-300 font-semibold mb-3">
                          {cert.field}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80">
                        <span className="text-xs text-slate-200 leading-relaxed block font-sans">
                          {cert.highlight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects & Field Implementations */}
              <section id="projects" className="pointer-events-auto space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <CircuitBoard className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white font-mono">
                      Engineering Projects &amp; Frameworks
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold">
                    // PRODUCTION ARCHITECTURES
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {PROJECTS.map((project, idx) => {
                    const Icon = project.icon;
                    return (
                      <article
                        key={idx}
                        className="p-5 rounded-xl bg-[#0b121e]/95 backdrop-blur-2xl border border-cyan-500/25 hover:border-cyan-400/70 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-500/40 text-cyan-300">
                              {project.category}
                            </span>
                            <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                          </div>
                          <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-slate-200 text-xs leading-relaxed mb-4">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-700/80 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* Technical Disciplines */}
              <section className="pointer-events-auto space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white font-mono">
                      Technical Disciplines
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold">
                    // EXPERTISE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SKILLS.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[#0b121e]/95 backdrop-blur-2xl border border-cyan-500/25 flex flex-col gap-3 hover:border-cyan-400/60 transition-colors shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-sm font-bold text-white">
                            {skill.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-200 font-mono leading-relaxed">
                          {skill.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          ) : (
            /* PERSONAL VIEW: Purely Personal — Passions, EV Lifestyle, Himalayan Expeditions & Story */
            <div className="space-y-12">
              {/* Passions & Lifestyle Grid */}
              <section id="passions" className="pointer-events-auto space-y-5">
                <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-5 h-5 text-rose-400" />
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white font-mono">
                      Personal Passions &amp; Adventures
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold">
                    // LIFE OUTSIDE CODE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {PASSIONS.map((passion, idx) => {
                    const Icon = passion.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-[#0c1424]/95 backdrop-blur-2xl border border-cyan-500/30 hover:border-cyan-400/70 transition-all shadow-xl flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-500/40">
                              {passion.label}
                            </span>
                            <span className="text-[11px] font-mono text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                              {passion.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 mb-2.5">
                            <Icon className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                              {passion.title}
                            </h3>
                          </div>

                          <p className="text-slate-200 text-sm leading-relaxed mb-5">
                            {passion.text}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-cyan-300 font-semibold flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{passion.metric}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Personal Story & Journey */}
              <section className="pointer-events-auto space-y-5">
                <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white font-mono">
                      Personal Journey &amp; Principles
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold">
                    // BACKGROUND &amp; PHILOSOPHY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {PERSONAL_JOURNEY.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-[#0c1424]/95 backdrop-blur-2xl border border-cyan-500/25 flex flex-col justify-between shadow-xl"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white">
                                {item.title}
                              </h3>
                              <span className="text-[11px] font-mono text-cyan-300 font-medium">
                                {item.location}
                              </span>
                            </div>
                          </div>
                          <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </main>

        {/* Footer & Social Presence Bar */}
        <footer className="mt-12 backdrop-blur-xl bg-[#07080c]/90 border-t border-cyan-800/40 px-4 md:px-8 py-6 pointer-events-auto shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs font-mono font-medium text-slate-300">
                © {new Date().getFullYear()} Saiman Sah. Designed with procedural 3D WebGL geometry.
              </p>
              <p className="text-[11px] font-mono text-cyan-300 font-medium mt-1">
                Zero external 3D asset dependencies • Dual camera views • Kathmandu, Nepal
              </p>
            </div>

            {/* Social Links Matrix */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SOCIALS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-400 transition-all text-xs font-mono text-slate-200 hover:text-white"
                  title={social.note ? `${social.name} (${social.note})` : social.name}
                >
                  <SocialFavicon social={social} />
                  <span className="font-medium">{social.name}</span>
                  {social.note && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50 font-bold">
                      {social.note}
                    </span>
                  )}
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
