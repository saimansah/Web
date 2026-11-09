import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { soundFx } from "../audio/soundEffects";
import { credentials } from "../data";

const totalDocuments = credentials.reduce((total, credential) => total + credential.files.length, 0);

interface HackerSequenceProps {
  paused?: boolean;
  children: ReactNode;
  activeLanguage?: "en" | "ne" | "hi";
}

const DISPLAY_WIDTH = 5.2;
const DISPLAY_HEIGHT = 2.925;
const DISPLAY_Y = 2.08;
const DISPLAY_Z = -0.66;

function material(color: THREE.ColorRepresentation, roughness = 0.56, metalness = 0.12) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addBox(
  parent: THREE.Object3D,
  geometry: [number, number, number],
  position: [number, number, number],
  surface: THREE.Material,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...geometry), surface);
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

function addSphere(
  parent: THREE.Object3D,
  position: [number, number, number],
  scale: [number, number, number],
  surface: THREE.Material,
  detail = 24,
) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, detail, Math.max(12, Math.floor(detail * 0.7))), surface);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  parent.add(mesh);
  return mesh;
}

function addLimb(
  parent: THREE.Object3D,
  from: THREE.Vector3,
  to: THREE.Vector3,
  radius: number,
  surface: THREE.Material,
) {
  const direction = to.clone().sub(from);
  const limb = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.82, radius, direction.length(), 18), surface);
  limb.position.copy(from).add(to).multiplyScalar(0.5);
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  parent.add(limb);
  return limb;
}

function makeDisplayTexture(_language: "en" | "ne" | "hi" = "en") {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 1280, 720);
  gradient.addColorStop(0, "#05070e");
  gradient.addColorStop(0.55, "#0b0e1b");
  gradient.addColorStop(1, "#061017");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1280, 720);

  // Futuristic circuit grid
  context.strokeStyle = "rgba(0, 240, 255, 0.12)";
  context.lineWidth = 1;
  for (let x = 0; x < 1280; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, 720);
    context.stroke();
  }
  for (let y = 0; y < 720; y += 64) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(1280, y);
    context.stroke();
  }

  // Futuristic HUD brackets
  context.strokeStyle = "#00f0ff";
  context.lineWidth = 3;
  // Top-left bracket
  context.beginPath();
  context.moveTo(35, 75);
  context.lineTo(35, 35);
  context.lineTo(75, 35);
  context.stroke();
  // Top-right bracket
  context.beginPath();
  context.moveTo(1245, 75);
  context.lineTo(1245, 35);
  context.lineTo(1205, 35);
  context.stroke();
  // Bottom-left bracket
  context.beginPath();
  context.moveTo(35, 645);
  context.lineTo(35, 685);
  context.lineTo(75, 685);
  context.stroke();
  // Bottom-right bracket
  context.beginPath();
  context.moveTo(1245, 645);
  context.lineTo(1245, 685);
  context.lineTo(1205, 685);
  context.stroke();

  // Header Bar
  context.fillStyle = "#00f0ff";
  context.font = "600 20px monospace";
  context.textAlign = "center";
  context.fillText("SAIMAN SAH // NEURAL WORKSPACE · ABOUT PORTAL", 640, 75);

  context.fillStyle = "#8fa2ba";
  context.font = "500 15px monospace";
  context.fillText("STATUS: ACTIVE // 27.7172° N · 85.3240° E // KATHMANDU", 640, 105);

  // Main Headline inside the screen - centered
  context.fillStyle = "#ffffff";
  context.font = "700 80px sans-serif";
  context.fillText("About Saiman Sah", 640, 310);

  context.fillStyle = "#00f0ff";
  context.font = "24px sans-serif";
  context.fillText("Founder at Saiman Innovations · Chairperson at AI Alliance", 640, 375);

  context.strokeStyle = "rgba(0, 240, 255, 0.45)";
  context.beginPath();
  context.moveTo(340, 420);
  context.lineTo(940, 420);
  context.stroke();

  // Education / Bio specs inside screen - centered
  context.fillStyle = "#d8daec";
  context.font = "600 20px monospace";
  context.fillText("EDUCATION: +2 SCIENCE (3.42 GPA) · SEE NEPAL (3.86 GPA)", 640, 475);
  context.fillStyle = "#8ee7dc";
  context.fillText("LANGUAGES: ENGLISH · नेपाली · हिंदी", 640, 525);

  context.fillStyle = "#00f0ff";
  context.fillText(`[ ${totalDocuments} VERIFIED PDF CREDENTIALS INITIALIZED ]`, 640, 630);

  // CRT phosphor scanlines effect
  context.fillStyle = "rgba(0, 240, 255, 0.035)";
  for (let y = 0; y < 720; y += 4) {
    context.fillRect(0, y, 1280, 1.5);
  }

  // CRT radial vignette
  const vignette = context.createRadialGradient(640, 360, 260, 640, 360, 720);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(0.8, "rgba(2, 6, 14, 0.4)");
  vignette.addColorStop(1, "rgba(0, 240, 255, 0.16)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, 1280, 720);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addStarfield(scene: THREE.Scene) {
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color("#00f0ff"),
    new THREE.Color("#a67bff"),
    new THREE.Color("#ffffff"),
    new THREE.Color("#ff5500"),
  ];

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 80;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[index * 3 + 2] = -14 - Math.random() * 32;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const glow = 0.45 + Math.random() * 0.55;
    colors[index * 3] = color.r * glow;
    colors[index * 3 + 1] = color.g * glow;
    colors[index * 3 + 2] = color.b * glow;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const stars = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    }),
  );
  scene.add(stars);
  return stars;
}

function addSpaceObjects(scene: THREE.Scene) {
  const violet = new THREE.MeshStandardMaterial({
    color: "#281b5c",
    roughness: 0.65,
    metalness: 0.35,
    emissive: "#1b1142",
    emissiveIntensity: 0.6,
  });
  const neonCyan = new THREE.MeshBasicMaterial({ color: "#00f0ff", transparent: true, opacity: 0.75 });
  const neonViolet = new THREE.MeshBasicMaterial({ color: "#a67bff", transparent: true, opacity: 0.6 });

  // Floating Planet with concentric cyber rings (Single focal planet)
  const planet = new THREE.Group();
  planet.position.set(8.5, 4.8, -9.2);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(1.05, 36, 28), violet);
  planet.add(orb);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.022, 12, 96), neonCyan);
  ring1.rotation.set(1.05, 0.2, -0.34);
  planet.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.016, 10, 96), neonViolet);
  ring2.rotation.set(0.85, 0.3, -0.5);
  planet.add(ring2);
  scene.add(planet);

  // Floating concentric holographic cyber-telemetry rings around desk (orange ring removed)
  const cyberRings = new THREE.Group();
  cyberRings.position.set(0, DISPLAY_Y, DISPLAY_Z);

  const ringA = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.018, 8, 96), neonCyan);
  ringA.rotation.x = Math.PI / 2.2;
  cyberRings.add(ringA);

  const ringB = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.02, 8, 120), neonViolet);
  ringB.rotation.y = Math.PI / 3.8;
  ringB.rotation.x = Math.PI / 2.8;
  cyberRings.add(ringB);

  // Floating geometric cyber data crystals (clean cyan and violet palette)
  const crystalMat1 = new THREE.MeshStandardMaterial({
    color: "#00f0ff",
    wireframe: true,
    emissive: "#00b4cc",
    emissiveIntensity: 0.95,
  });
  const crystal1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.44, 0), crystalMat1);
  crystal1.position.set(-4.2, 4.4, 1.4);
  cyberRings.add(crystal1);

  const crystalMat2 = new THREE.MeshStandardMaterial({
    color: "#80eeff",
    wireframe: true,
    emissive: "#007a8c",
    emissiveIntensity: 0.85,
  });
  const crystal2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 0), crystalMat2);
  crystal2.position.set(4.6, 3.9, 0.9);
  cyberRings.add(crystal2);

  const crystalMat3 = new THREE.MeshStandardMaterial({
    color: "#a67bff",
    wireframe: true,
    emissive: "#6f41cc",
    emissiveIntensity: 0.85,
  });
  const crystal3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.34, 0), crystalMat3);
  crystal3.position.set(0, 5.8, -1.8);
  cyberRings.add(crystal3);

  scene.add(cyberRings);

  return { planet, cyberRings, ringA, ringB, crystal1, crystal2, crystal3 };
}

function addDeskScene(scene: THREE.Scene, language: "en" | "ne" | "hi" = "en") {
  const group = new THREE.Group();
  scene.add(group);

  const deskMaterial = material("#11131c", 0.38, 0.36);
  const deskEdge = material("#262832", 0.32, 0.55);
  const darkFabric = material("#0a0a10", 0.94, 0.04);
  const hoodFabric = material("#12121b", 0.9, 0.06);
  const laptopMetal = material("#292c36", 0.31, 0.68);
  const keyMaterial = material("#101217", 0.48, 0.38);
  const skinMaterial = new THREE.MeshStandardMaterial({ color: "#423c40", roughness: 0.8, metalness: 0.02 });
  const cyanAccent = new THREE.MeshStandardMaterial({
    color: "#00f0ff",
    roughness: 0.2,
    metalness: 0.4,
    emissive: "#00bcd4",
    emissiveIntensity: 0.9,
  });

  // Table
  addBox(group, [12.4, 0.24, 6.2], [0, -0.11, 1.05], deskMaterial);
  addBox(group, [12.5, 0.055, 6.25], [0, 0.025, 1.05], deskEdge);
  for (const x of [-5.3, 5.3]) {
    for (const z of [-1.4, 3.35]) addBox(group, [0.2, 2.4, 0.2], [x, -1.2, z], deskMaterial);
  }
  const deskGlow = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.02, 0.03), cyanAccent);
  deskGlow.position.set(0, -0.03, 4.05);
  group.add(deskGlow);

  // Chair and hacker silhouette
  const chair = addSphere(group, [0, 1.6, -2.65], [2.25, 2.7, 0.38], material("#08090d", 0.78, 0.08));
  chair.rotation.z = 0.02;
  const body = addSphere(group, [0, 2.65, -1.55], [2.05, 1.85, 0.98], darkFabric, 32);
  body.rotation.z = -0.015;
  addSphere(group, [0, 3.55, -1.42], [1.47, 0.72, 0.82], hoodFabric, 32);
  addSphere(group, [0, 4.2, -1.42], [1.08, 1.22, 0.9], darkFabric, 36);
  addSphere(group, [0, 4.19, -0.75], [0.72, 0.83, 0.31], material("#030406", 0.45, 0.15), 32);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.98, 0.115, 0.1),
    new THREE.MeshBasicMaterial({ color: "#003b46", transparent: true, opacity: 0.94 }),
  );
  visor.position.set(0, 4.14, -0.43);
  group.add(visor);

  const visorGlow = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.018, 0.02), new THREE.MeshBasicMaterial({ color: "#00f0ff" }));
  visorGlow.position.set(0, 4.14, -0.375);
  group.add(visorGlow);

  // Limbs
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Vector3(side * 1.4, 2.93, -0.95);
    const elbow = new THREE.Vector3(side * 2.18, 1.55, 0.15);
    const wrist = new THREE.Vector3(side * 2.05, 0.26, 1.48);
    addSphere(group, [shoulder.x, shoulder.y, shoulder.z], [0.79, 0.8, 0.75], hoodFabric);
    addLimb(group, shoulder, elbow, 0.48, hoodFabric);
    addLimb(group, elbow, wrist, 0.34, darkFabric);
    addSphere(group, [wrist.x, wrist.y - 0.03, wrist.z + 0.12], [0.27, 0.16, 0.36], skinMaterial);
    for (let finger = 0; finger < 3; finger += 1) {
      const offset = (finger - 1) * 0.13;
      addLimb(
        group,
        new THREE.Vector3(wrist.x + offset, wrist.y - 0.04, wrist.z + 0.25),
        new THREE.Vector3(wrist.x + offset, wrist.y - 0.07, wrist.z + 0.55),
        0.055,
        skinMaterial,
      );
    }
  }

  // Open laptop with display
  const screenFrame = addBox(group, [5.54, 3.21, 0.18], [0, DISPLAY_Y, DISPLAY_Z - 0.08], material("#181920", 0.28, 0.78));
  const displayTexture = makeDisplayTexture(language);
  const displayMaterial = displayTexture
    ? new THREE.MeshBasicMaterial({ map: displayTexture, toneMapped: false })
    : new THREE.MeshBasicMaterial({ color: "#05070e" });
  const display = new THREE.Mesh(new THREE.PlaneGeometry(DISPLAY_WIDTH, DISPLAY_HEIGHT), displayMaterial);
  display.position.set(0, DISPLAY_Y, DISPLAY_Z + 0.014);
  group.add(display);

  const webcam = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), cyanAccent);
  webcam.position.set(0, DISPLAY_Y + DISPLAY_HEIGHT / 2 - 0.055, DISPLAY_Z + 0.02);
  group.add(webcam);

  const base = addBox(group, [5.85, 0.2, 3.5], [0, 0.22, 1.03], laptopMetal);
  const keyboardDeck = addBox(group, [5.52, 0.035, 2.45], [0, 0.337, 0.75], keyMaterial);
  keyboardDeck.material = material("#1b1e26", 0.41, 0.48);
  for (let row = 0; row < 5; row += 1) {
    const columns = row === 4 ? 9 : 13;
    const span = row === 4 ? 3.8 : 4.95;
    for (let column = 0; column < columns; column += 1) {
      const key = addBox(
        group,
        [span / columns - 0.055, 0.034, 0.24],
        [-span / 2 + (column + 0.5) * (span / columns), 0.366, 0.05 + row * 0.31],
        keyMaterial,
      );
      key.position.y += Math.random() * 0.003;
    }
  }
  addBox(group, [1.18, 0.026, 0.7], [0, 0.35, 2.22], material("#111319", 0.39, 0.47));
  for (const side of [-1, 1]) {
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.22, 16), deskEdge);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(side * 1.55, 0.43, -0.58);
    group.add(hinge);
  }
  base.userData.displayFrame = screenFrame;
  return { group, displayTexture, display };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value: number) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

export function HackerSequence({ paused = false, children, activeLanguage = "en" }: HackerSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const sceneWakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    sceneWakeRef.current?.();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const portal = portalRef.current;
    const copy = copyRef.current;
    if (!canvas || !section || !stage || !portal || !copy) return;
    const activeSection = section as HTMLElement;
    const activeStage = stage as HTMLDivElement;
    const activePortal = portal as HTMLDivElement;
    const activeCopy = copy as HTMLDivElement;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.classList.add("is-unavailable");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#05070d");
    scene.fog = new THREE.FogExp2("#05070d", 0.015);
    const camera = new THREE.PerspectiveCamera(39, 1, 0.08, 100);
    const screenCenter = new THREE.Vector3(0, DISPLAY_Y, DISPLAY_Z + 0.018);
    const initialDistance = stage.clientWidth < 740 ? 15.1 : 12.1;
    camera.position.set(0, 4.7, initialDistance);
    camera.lookAt(0, 3.9, screenCenter.z);

    const stars = addStarfield(scene);
    const spaceObjects = addSpaceObjects(scene);
    const { displayTexture, group: deskGroup } = addDeskScene(scene, activeLanguage);

    // Atmospheric lighting
    scene.add(new THREE.AmbientLight("#8ba0c8", 1.55));
    const keyLight = new THREE.DirectionalLight("#d2d6ff", 2.6);
    keyLight.position.set(-5, 7, 8);
    scene.add(keyLight);

    const magentaLight = new THREE.PointLight("#a67bff", 160, 22, 1.7);
    magentaLight.position.set(-5.4, 4.8, -1.8);
    scene.add(magentaLight);

    const cyanLight = new THREE.PointLight("#00f0ff", 150, 24, 1.75);
    cyanLight.position.set(5.2, 4.1, 1.2);
    scene.add(cyanLight);

    const screenLight = new THREE.PointLight("#47e6ff", 55, 9, 1.95);
    screenLight.position.set(0, 2.3, 0.2);
    scene.add(screenLight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor("#05070d", 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const projected = new THREE.Vector3();
    const corners = [
      [-DISPLAY_WIDTH / 2, -DISPLAY_HEIGHT / 2],
      [DISPLAY_WIDTH / 2, -DISPLAY_HEIGHT / 2],
      [DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2],
      [-DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2],
    ] as const;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let needsRender = true;
    let inView = true;

    const resize = () => {
      const width = Math.max(1, activeStage.clientWidth);
      const height = Math.max(1, activeStage.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.12 : 1.5));
      renderer.setSize(width, height, false);
      needsRender = true;
      if (reducedMotion.matches || pausedRef.current) renderFrame(performance.now());
      else requestFrame();
    };

    const readHeroProgress = () => {
      const scrollDistance = Math.max(1, activeSection.offsetHeight - window.innerHeight);
      return clamp(-activeSection.getBoundingClientRect().top / scrollDistance, 0, 1);
    };

    const readGlobalScrollProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return clamp(window.scrollY / maxScroll, 0, 1);
    };

    const layoutPortal = () => {
      const width = Math.max(1, activeStage.clientWidth);
      const height = Math.max(1, activeStage.clientHeight);
      const bounds = corners.map(([x, y]) => {
        projected.set(x, y + DISPLAY_Y, DISPLAY_Z + 0.022).project(camera);
        return {
          x: (projected.x * 0.5 + 0.5) * width,
          y: (-projected.y * 0.5 + 0.5) * height,
        };
      });
      const left = Math.min(...bounds.map((point) => point.x));
      const right = Math.max(...bounds.map((point) => point.x));
      const top = Math.min(...bounds.map((point) => point.y));
      const bottom = Math.max(...bounds.map((point) => point.y));
      const progress = readHeroProgress();
      if (width < 740 && progress > 0.35) {
        const settle = smoothstep((progress - 0.35) / 0.45);
        const cardW = Math.min(width - 28, 440);
        const cardH = Math.min(height - 110, 560);
        const centerLeft = (width - cardW) / 2;
        const centerTop = (height - cardH) / 2;

        activePortal.style.left = `${THREE.MathUtils.lerp(left, centerLeft, settle)}px`;
        activePortal.style.top = `${THREE.MathUtils.lerp(top, centerTop, settle)}px`;
        activePortal.style.width = `${THREE.MathUtils.lerp(Math.max(0, right - left), cardW, settle)}px`;
        activePortal.style.height = `${THREE.MathUtils.lerp(Math.max(0, bottom - top), cardH, settle)}px`;
      } else {
        activePortal.style.left = `${left}px`;
        activePortal.style.top = `${top}px`;
        activePortal.style.width = `${Math.max(0, right - left)}px`;
        activePortal.style.height = `${Math.max(0, bottom - top)}px`;
      }
    };

    function renderFrame(now: number) {
      const progress = readHeroProgress();
      const globalProgress = readGlobalScrollProgress();
      const width = Math.max(1, activeStage.clientWidth);
      const isMobile = width < 740;

      // 3D SCREEN APPROACH & CENTERING CHOREOGRAPHY:
      // Stage 1 (0 -> 0.42): Approach zoom toward computer screen
      // Stage 2 (0.42 -> 0.75): Camera aligns with display glass
      // Stage 3 (0.75 -> 1.00): Settle cleanly centered on About Saiman Sah
      const approachStage = smoothstep(Math.min(1, progress / 0.42));
      const rotationStage = smoothstep(Math.max(0, Math.min(1, (progress - 0.35) / 0.45)));
      const settleCenter = smoothstep(Math.max(0, (progress - 0.7) / 0.3));

      // Calculate distance needed to fit display in both portrait (mobile) and landscape
      const vFovRad = THREE.MathUtils.degToRad(camera.fov);
      const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * camera.aspect);
      const distV = DISPLAY_HEIGHT / (2 * Math.tan(vFovRad / 2));
      const distH = DISPLAY_WIDTH / (2 * Math.tan(hFovRad / 2));
      const fitDistance = Math.max(distV, distH) * (isMobile ? 1.04 : 0.96);

      const startZ = isMobile ? 17.5 : 12.1;
      const glassZ = DISPLAY_Z + 0.022 + fitDistance;

      // Scroll-driven camera rotation logic (global spatial parallax across page)
      const globalYaw = globalProgress * (Math.PI * 0.28);
      const globalPitch = Math.sin(globalProgress * Math.PI) * 0.08;

      // Multi-axis rotation during scroll, smoothly settling back to centered
      const maxOrbitYaw = isMobile ? Math.PI * 0.12 : Math.PI * 0.45;
      const orbitYaw = THREE.MathUtils.lerp(rotationStage * maxOrbitYaw + globalYaw * 0.2, 0, settleCenter);
      const orbitPitch = THREE.MathUtils.lerp(Math.sin(rotationStage * Math.PI) * (isMobile ? 0.06 : 0.18) + globalPitch, 0, settleCenter);
      const cameraRoll = THREE.MathUtils.lerp(Math.sin(rotationStage * Math.PI) * (isMobile ? 0.04 : 0.12), 0, settleCenter);

      const baseZ = THREE.MathUtils.lerp(startZ, glassZ, approachStage);
      const mouseInfluence = reducedMotion.matches ? 0 : 1 - approachStage * 0.85;

      const targetX = Math.sin(orbitYaw) * (baseZ * 0.25) + pointer.x * 0.12 * mouseInfluence;
      const targetY = THREE.MathUtils.lerp(4.7, DISPLAY_Y, approachStage) + orbitPitch + pointer.y * 0.05 * mouseInfluence;
      const targetZ = DISPLAY_Z + Math.cos(orbitYaw) * (baseZ - DISPLAY_Z);

      // Elastic boundary stop: gently docks at the monitor glass limit without penetrating screen mesh
      const minSafeDistance = DISPLAY_Z + 0.08 + (isMobile ? fitDistance * 0.98 : fitDistance * 0.94);
      const safeTargetZ = Math.max(minSafeDistance, targetZ);
      const overProgress = Math.max(0, progress - 0.92);
      const elasticResistance = Math.sin(overProgress * Math.PI) * 0.06;
      const finalTargetZ = safeTargetZ + elasticResistance;

      const targetLookX = screenCenter.x + pointer.x * 0.18 * mouseInfluence;
      const targetLookY = THREE.MathUtils.lerp(3.9, DISPLAY_Y, approachStage);

      const followSpeed = reducedMotion.matches || pausedRef.current ? 1 : 0.2;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, followSpeed);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, followSpeed);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z || startZ, finalTargetZ, followSpeed);

      camera.lookAt(targetLookX, targetLookY, screenCenter.z);
      camera.rotation.z += (cameraRoll - camera.rotation.z) * 0.12;
      camera.updateMatrixWorld();

      if (!pausedRef.current && !reducedMotion.matches) {
        const delta = Math.min(0.04, (now - (lastFrame || now)) / 1000);
        elapsed += delta;

        // Space and cyber background continuous rotation
        stars.rotation.y = Math.sin(elapsed * 0.05) * 0.05 + rotationStage * 0.65 + globalProgress * 0.85;
        stars.rotation.x = Math.sin(elapsed * 0.03) * 0.03 + globalProgress * 0.25;
        spaceObjects.planet.rotation.y = elapsed * 0.08 + rotationStage * Math.PI * 1.6;

        // Concentric cyber rings rotation on scroll
        spaceObjects.ringA.rotation.z += delta * (0.6 + rotationStage * 2.5);
        spaceObjects.ringB.rotation.y += delta * (0.4 + rotationStage * 2.0);

        // Rotating cyber crystals
        spaceObjects.crystal1.rotation.x += delta * 0.9;
        spaceObjects.crystal1.rotation.y += delta * 0.7;
        spaceObjects.crystal2.rotation.y += delta * 0.8;
        spaceObjects.crystal2.rotation.z += delta * 0.6;
        spaceObjects.crystal3.rotation.x += delta * 0.6;
        spaceObjects.crystal3.rotation.z += delta * 0.8;

        // Kinetic desk distortion as camera passes through
        deskGroup.rotation.y = THREE.MathUtils.lerp(0, -0.22 * Math.sin(rotationStage * Math.PI), 0.2);
      }
      lastFrame = now;

      // Hero text fade-out
      const heroTextFade = smoothstep(progress / 0.25);
      activeCopy.style.opacity = String(1 - heroTextFade);
      activeCopy.style.transform = `translate3d(0, ${-22 * heroTextFade}px, 0)`;
      activeCopy.style.pointerEvents = heroTextFade > 0.85 ? "none" : "auto";

      // Screen Portal breakthrough & glass warp
      const isPortalActive = progress > 0.38;
      const portalGlow = 8 + 50 * (1 - approachStage) + 40 * Math.sin(rotationStage * Math.PI);
      activePortal.style.borderRadius = `${Math.max(0, 14 * (1 - approachStage))}px`;
      activePortal.style.boxShadow = `0 0 ${portalGlow}px rgba(0, 240, 255, ${0.18 + 0.35 * rotationStage})`;
      activePortal.style.borderColor = isPortalActive ? `rgba(0, 240, 255, ${0.6 + 0.4 * Math.sin(rotationStage * Math.PI)})` : "rgba(143, 227, 233, 0.52)";
      activePortal.style.setProperty("--screen-progress", String(progress));
      activePortal.style.setProperty("--portal-stage", String(rotationStage));
      activeStage.style.setProperty("--scene-progress", String(progress));

      layoutPortal();
      renderer.render(scene, camera);
      needsRender = false;
    }

    const animate = (now: number) => {
      frameId = 0;
      if (document.hidden || !inView) return;
      if (reducedMotion.matches || pausedRef.current) {
        if (needsRender) renderFrame(now);
        return;
      }
      if (now - lastFrame >= 1000 / 60 || needsRender) renderFrame(now);
      frameId = window.requestAnimationFrame(animate);
    };

    const requestFrame = () => {
      needsRender = true;
      if (document.hidden || !inView) return;
      if (reducedMotion.matches && frameId === 0) renderFrame(performance.now());
      else if (frameId === 0 && !document.hidden) frameId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
      pointer.lerp(pointerTarget, 0.35);
      requestFrame();
    };

    const onScroll = () => requestFrame();
    const onVisibility = () => {
      if (document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else requestFrame();
    };
    const onMotionChange = () => requestFrame();
    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              if (inView) requestFrame();
              else if (frameId) {
                window.cancelAnimationFrame(frameId);
                frameId = 0;
              }
            },
            { rootMargin: "12% 0px 12% 0px" },
          )
        : null;

    sceneWakeRef.current = requestFrame;
    visibilityObserver?.observe(activeSection);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    resize();
    requestFrame();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      sceneWakeRef.current = null;
      visibilityObserver?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) object.geometry.dispose();
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          const surfaces = Array.isArray(object.material) ? object.material : [object.material];
          surfaces.forEach((surface) => surface.dispose());
        }
      });
      displayTexture?.dispose();
      renderer.dispose();
    };
  }, [activeLanguage]);

  return (
    <section id="home" ref={sectionRef} className="hero-sequence" aria-label="Portfolio introduction">
      <div ref={stageRef} className="hero-stage">
        <canvas ref={canvasRef} className="sequence-canvas" aria-hidden="true" />
        <div className="hero-stage-shade" aria-hidden="true" />
        <div ref={copyRef} className="hero-stage-copy">
          {children}
        </div>
        <div ref={portalRef} className="screen-portal" aria-label="Portfolio preview on the laptop screen">
          <div className="screen-ui">
            <header className="screen-ui-header">
              <a className="screen-ui-brand" href="/" data-scroll-target="home">
                SAIMAN SAH<span> // ABOUT PORTAL</span>
              </a>
              <div className="screen-ui-status">
                <i /> PORTAL SYNCHRONIZED · 27.7172° N
              </div>
            </header>
            <div className="screen-ui-body">
              <div className="screen-ui-main">
                <p className="screen-ui-kicker">01 // DISCOVER THE ARCHITECT</p>
                <h2>
                  About Saiman Sah
                </h2>
                <p className="screen-ui-description">
                  {activeLanguage === "ne"
                    ? "काठमाडौंमा सफ्टवेयर विकास, एआई अनुसन्धान, र ३D प्रणालीहरूको निर्माण।"
                    : activeLanguage === "hi"
                    ? "काठमांडू में सॉफ्टवेयर निर्माण, एआई अनुसंधान और 3D सिस्टम का अन्वेषण।"
                    : "Software developer, Founder at Saiman Innovations, and Chairperson at AI Alliance in Kathmandu, Nepal."}
                </p>
                <a
                  className="screen-ui-cta"
                  href="/"
                  data-scroll-target="about"
                  onClick={() => soundFx.playClick()}
                >
                  Explore About Saiman <span>↘</span>
                </a>
              </div>
              <div className="screen-ui-aside" aria-label="Quick portal jumps">
                <a href="/" data-scroll-target="about" onClick={() => soundFx.playClick()}>
                  <span>01</span>
                  <strong>About Saiman</strong>
                  <i>↘</i>
                </a>
                <a href="/" data-scroll-target="skills" onClick={() => soundFx.playClick()}>
                  <span>02</span>
                  <strong>Workbench</strong>
                  <i>↗</i>
                </a>
                <a href="/" data-scroll-target="credentials" onClick={() => soundFx.playClick()}>
                  <span>03</span>
                  <strong>{credentials.length} Certificates</strong>
                  <i>↗</i>
                </a>
                <a href="/" data-scroll-target="outside" onClick={() => soundFx.playClick()}>
                  <span>04</span>
                  <strong>Outside Work</strong>
                  <i>↗</i>
                </a>
              </div>
            </div>
            <footer className="screen-ui-footer">
              <span>27.7172° N · 85.3240° E</span>
              <span>ENGLISH · नेपाली · हिंदी</span>
              <span>
                {totalDocuments} Verified Credentials Available
              </span>
            </footer>
          </div>
        </div>
      </div>
      <span className="sequence-scroll-distance" aria-hidden="true" />
    </section>
  );
}
