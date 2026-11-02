import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type GarageFocusMode = "dual" | "atto3" | "zsev";

export interface VehiclePaintOption {
  name: string;
  hex: string;
}

export interface GarageShowroom3DProps {
  focusMode: GarageFocusMode;
  onSelectFocus: (mode: GarageFocusMode) => void;
  activeCockpitCar: "atto3" | "zsev";
  onSelectCockpitCar: (car: "atto3" | "zsev") => void;
  speedKmh: number;
  braking: boolean;
  throttling: boolean;
}

const ATTO3_PAINTS: ReadonlyArray<VehiclePaintOption> = [
  { name: "Surf Blue", hex: "#1f84bd" },
  { name: "Ski White", hex: "#e6ebf4" },
  { name: "Boulder Grey", hex: "#5a6475" },
];

const ZSEV_PAINTS: ReadonlyArray<VehiclePaintOption> = [
  { name: "Dynamic Red", hex: "#c72843" },
  { name: "Arctic Silver", hex: "#d6deeb" },
  { name: "Battersea Blue", hex: "#1b5ea8" },
];

interface CarRig {
  root: THREE.Group;
  wheels: THREE.Object3D[];
  bodyMaterials: THREE.MeshPhysicalMaterial[];
  headlightMaterials: THREE.MeshStandardMaterial[];
  taillightMaterials: THREE.MeshStandardMaterial[];
  textures: THREE.Texture[];
}

function createShowroomPlateTexture(text: string, accentHex: string): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0a0d16";
  ctx.fillRect(0, 0, 256, 64);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, 250, 58);

  ctx.fillStyle = "#f4f7ff";
  ctx.font = "700 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 34);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createWheel(style: "atto3" | "zsev"): THREE.Group {
  const wheel = new THREE.Group();

  const tireMat = new THREE.MeshStandardMaterial({
    color: "#12141a",
    roughness: 0.86,
    metalness: 0.08,
  });
  const rimDarkMat = new THREE.MeshStandardMaterial({
    color: "#1b1f2b",
    roughness: 0.35,
    metalness: 0.78,
  });
  const rimAlloyMat = new THREE.MeshStandardMaterial({
    color: style === "atto3" ? "#d5dfef" : "#cad3e2",
    roughness: 0.2,
    metalness: 0.9,
  });
  const rotorMat = new THREE.MeshStandardMaterial({
    color: "#6a7182",
    roughness: 0.42,
    metalness: 0.8,
  });
  const caliperMat = new THREE.MeshStandardMaterial({
    color: style === "atto3" ? "#30d5ea" : "#ff3e5e",
    roughness: 0.3,
    metalness: 0.45,
  });

  const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.24, 32), tireMat);
  tire.rotation.x = Math.PI / 2;
  wheel.add(tire);

  for (const side of [-0.095, 0.095]) {
    const shoulder = new THREE.Mesh(new THREE.TorusGeometry(0.315, 0.055, 12, 32), tireMat);
    shoulder.position.z = side;
    wheel.add(shoulder);
  }

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.245, 28), rimDarkMat);
  barrel.rotation.x = Math.PI / 2;
  wheel.add(barrel);

  for (const side of [-1, 1]) {
    const lip = new THREE.Mesh(new THREE.RingGeometry(0.235, 0.275, 32), rimAlloyMat);
    lip.position.z = side * 0.124;
    if (side < 0) lip.rotation.y = Math.PI;
    wheel.add(lip);
  }

  const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.03, 24), rotorMat);
  rotor.rotation.x = Math.PI / 2;
  wheel.add(rotor);

  const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.16, 0.08), caliperMat);
  caliper.position.set(-0.12, 0.08, 0);
  wheel.add(caliper);

  const spokeGroup = new THREE.Group();
  spokeGroup.name = "spin-hub";
  const spokeCount = 5;
  for (let i = 0; i < spokeCount; i += 1) {
    const angle = (i / spokeCount) * Math.PI * 2;
    const pivot = new THREE.Group();
    pivot.rotation.z = angle;

    const bladeWidth = style === "atto3" ? 0.068 : 0.082;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(bladeWidth, 0.24, 0.252), rimAlloyMat);
    spoke.position.set(0.015, 0.12, 0);
    spoke.rotation.z = style === "atto3" ? 0.18 : -0.22;
    pivot.add(spoke);

    spokeGroup.add(pivot);
  }

  const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.258, 20), rimDarkMat);
  hubCap.rotation.x = Math.PI / 2;
  spokeGroup.add(hubCap);

  const centerRing = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.262, 18), rimAlloyMat);
  centerRing.rotation.x = Math.PI / 2;
  spokeGroup.add(centerRing);

  wheel.add(spokeGroup);
  return wheel;
}

function buildElectricSuv(variant: "atto3" | "zsev", initialPaintHex: string): CarRig {
  const root = new THREE.Group();
  const bodyMaterials: THREE.MeshPhysicalMaterial[] = [];
  const headlightMaterials: THREE.MeshStandardMaterial[] = [];
  const taillightMaterials: THREE.MeshStandardMaterial[] = [];
  const wheels: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: initialPaintHex,
    metalness: 0.52,
    roughness: 0.24,
    clearcoat: 1.0,
    clearcoatRoughness: 0.09,
  });
  bodyMaterials.push(bodyMat);

  const glossBlackMat = new THREE.MeshPhysicalMaterial({
    color: "#0b0d14",
    metalness: 0.35,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  });

  const claddingMat = new THREE.MeshStandardMaterial({
    color: "#141720",
    roughness: 0.72,
    metalness: 0.18,
  });

  const satinSilverMat = new THREE.MeshStandardMaterial({
    color: "#cfd8e8",
    roughness: 0.26,
    metalness: 0.86,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#09101c",
    metalness: 0.15,
    roughness: 0.07,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.92,
  });

  const drlMat = new THREE.MeshStandardMaterial({
    color: "#dffaff",
    emissive: variant === "atto3" ? "#5be7ff" : "#8ce8ff",
    emissiveIntensity: 2.1,
    roughness: 0.15,
  });
  headlightMaterials.push(drlMat);

  const tailMat = new THREE.MeshStandardMaterial({
    color: "#ff6680",
    emissive: "#ff1e48",
    emissiveIntensity: 1.85,
    roughness: 0.2,
  });
  taillightMaterials.push(tailMat);

  // 1. Lower sculpted SUV body shell
  const lowerShape = new THREE.Shape();
  if (variant === "atto3") {
    lowerShape.moveTo(-2.12, 0.34);
    lowerShape.quadraticCurveTo(-2.18, 0.62, -1.96, 0.84);
    lowerShape.quadraticCurveTo(-1.55, 0.98, -0.96, 1.03);
    lowerShape.lineTo(1.18, 1.08);
    lowerShape.quadraticCurveTo(1.88, 1.09, 2.08, 0.94);
    lowerShape.quadraticCurveTo(2.16, 0.66, 2.08, 0.36);
    lowerShape.lineTo(-2.12, 0.34);
  } else {
    lowerShape.moveTo(-2.1, 0.35);
    lowerShape.quadraticCurveTo(-2.16, 0.72, -1.98, 0.9);
    lowerShape.quadraticCurveTo(-1.48, 1.02, -0.92, 1.05);
    lowerShape.lineTo(1.25, 1.1);
    lowerShape.quadraticCurveTo(1.94, 1.1, 2.1, 0.96);
    lowerShape.quadraticCurveTo(2.15, 0.65, 2.06, 0.36);
    lowerShape.lineTo(-2.1, 0.35);
  }

  const lowerDepth = 1.56;
  const lowerGeo = new THREE.ExtrudeGeometry(lowerShape, {
    depth: lowerDepth,
    bevelEnabled: true,
    bevelThickness: 0.13,
    bevelSize: 0.1,
    bevelSegments: 5,
    curveSegments: 20,
  });
  lowerGeo.translate(0, 0, -lowerDepth / 2);
  root.add(new THREE.Mesh(lowerGeo, bodyMat));

  // 2. Upper Cabin / Greenhouse Silhouette
  const cabinShape = new THREE.Shape();
  if (variant === "atto3") {
    cabinShape.moveTo(-0.98, 1.01);
    cabinShape.quadraticCurveTo(-0.52, 1.52, -0.05, 1.58);
    cabinShape.quadraticCurveTo(0.82, 1.6, 1.48, 1.48);
    cabinShape.lineTo(1.86, 1.47);
    cabinShape.quadraticCurveTo(1.94, 1.41, 1.82, 1.37);
    cabinShape.lineTo(1.96, 1.04);
    cabinShape.lineTo(-0.98, 1.01);
  } else {
    cabinShape.moveTo(-0.92, 1.03);
    cabinShape.quadraticCurveTo(-0.46, 1.58, 0.02, 1.63);
    cabinShape.lineTo(1.38, 1.61);
    cabinShape.lineTo(1.78, 1.58);
    cabinShape.quadraticCurveTo(1.85, 1.52, 1.76, 1.46);
    cabinShape.lineTo(1.96, 1.06);
    cabinShape.lineTo(-0.92, 1.03);
  }

  const cabinDepth = 1.28;
  const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, {
    depth: cabinDepth,
    bevelEnabled: true,
    bevelThickness: 0.11,
    bevelSize: 0.08,
    bevelSegments: 4,
    curveSegments: 18,
  });
  cabinGeo.translate(0, 0, -cabinDepth / 2);
  root.add(new THREE.Mesh(cabinGeo, variant === "atto3" ? glossBlackMat : bodyMat));

  // Smoked Glass Greenhouse Wrap
  const glassShape = new THREE.Shape();
  if (variant === "atto3") {
    glassShape.moveTo(-0.88, 1.06);
    glassShape.quadraticCurveTo(-0.46, 1.47, -0.02, 1.51);
    glassShape.quadraticCurveTo(0.75, 1.52, 1.32, 1.42);
    glassShape.lineTo(1.74, 1.08);
    glassShape.lineTo(-0.88, 1.06);
  } else {
    glassShape.moveTo(-0.82, 1.08);
    glassShape.quadraticCurveTo(-0.4, 1.51, 0.04, 1.55);
    glassShape.lineTo(1.32, 1.53);
    glassShape.lineTo(1.78, 1.1);
    glassShape.lineTo(-0.82, 1.08);
  }
  const glassDepth = 1.33;
  const glassGeo = new THREE.ExtrudeGeometry(glassShape, {
    depth: glassDepth,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.04,
    bevelSegments: 3,
    curveSegments: 16,
  });
  glassGeo.translate(0, 0, -glassDepth / 2);
  root.add(new THREE.Mesh(glassGeo, glassMat));

  const sunroof = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.04, 1.02), glassMat);
  sunroof.position.set(0.38, variant === "atto3" ? 1.64 : 1.69, 0);
  root.add(sunroof);

  // 3. Variant-Specific Signature Exterior Architecture
  if (variant === "atto3") {
    for (const side of [-1, 1]) {
      const cBlade = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.34, 0.04), satinSilverMat);
      cBlade.position.set(1.42, 1.27, side * 0.71);
      cBlade.rotation.z = -0.46;
      cBlade.rotation.y = side * -0.08;
      root.add(cBlade);
    }

    const dragonBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 1.48), satinSilverMat);
    dragonBar.position.set(-2.14, 0.74, 0);
    root.add(dragonBar);

    const frontDrlBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.042, 1.56), drlMat);
    frontDrlBar.position.set(-2.17, 0.78, 0);
    root.add(frontDrlBar);

    for (const side of [-1, 1]) {
      const headlamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.34), drlMat);
      headlamp.position.set(-2.06, 0.8, side * 0.62);
      headlamp.rotation.y = side * 0.22;
      root.add(headlamp);
    }

    const rearLightBar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.065, 1.58), tailMat);
    rearLightBar.position.set(2.14, 1.02, 0);
    root.add(rearLightBar);
  } else {
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.045, 0.045), satinSilverMat);
      rail.position.set(0.45, 1.74, side * 0.54);
      root.add(rail);
      for (const rx of [-0.22, 0.45, 1.12]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.04), claddingMat);
        post.position.set(rx, 1.7, side * 0.54);
        root.add(post);
      }
    }

    const evGrille = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 1.02), bodyMat);
    evGrille.position.set(-2.14, 0.7, 0);
    root.add(evGrille);

    const grilleTrim = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.27, 1.06), glossBlackMat);
    grilleTrim.position.set(-2.125, 0.7, 0);
    root.add(grilleTrim);

    const mgOctagonBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 8), satinSilverMat);
    mgOctagonBadge.rotation.z = Math.PI / 2;
    mgOctagonBadge.position.set(-2.18, 0.73, 0);
    root.add(mgOctagonBadge);

    for (const side of [-1, 1]) {
      const drlWing = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.075, 0.34), drlMat);
      drlWing.position.set(-2.04, 0.84, side * 0.65);
      drlWing.rotation.y = side * 0.26;
      drlWing.rotation.z = -0.08;
      root.add(drlWing);
    }

    for (const side of [-1, 1]) {
      const tailCluster = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.11, 0.44), tailMat);
      tailCluster.position.set(2.11, 1.03, side * 0.57);
      root.add(tailCluster);
    }
    const rearSkid = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 1.18), satinSilverMat);
    rearSkid.position.set(2.12, 0.39, 0);
    root.add(rearSkid);
  }

  // Front & Rear Showroom License Plates ("BYD ATTO 3" / "MG ZS EV")
  const plateTex = createShowroomPlateTexture(
    variant === "atto3" ? "BYD ATTO 3" : "MG ZS EV",
    variant === "atto3" ? "#47e6ff" : "#ff5c7c",
  );
  if (plateTex) {
    textures.push(plateTex);
    const plateMat = new THREE.MeshBasicMaterial({ map: plateTex });
    const frontPlate = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.14), plateMat);
    frontPlate.position.set(-2.22, 0.49, 0);
    frontPlate.rotation.y = -Math.PI / 2;
    root.add(frontPlate);

    const rearPlate = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.14), plateMat);
    rearPlate.position.set(2.19, 0.66, 0);
    rearPlate.rotation.y = Math.PI / 2;
    root.add(rearPlate);
  }

  // Shared Lower SUV Cladding, Fender Arches, Wing Mirrors & Handles
  const underbody = new THREE.Mesh(new THREE.BoxGeometry(4.18, 0.14, 1.72), claddingMat);
  underbody.position.set(0, 0.34, 0);
  root.add(underbody);

  const frontSplitter = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 1.46), satinSilverMat);
  frontSplitter.position.set(-2.12, 0.34, 0);
  root.add(frontSplitter);

  for (const side of [-1, 1]) {
    const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.14), glossBlackMat);
    mirrorArm.position.set(-0.62, 1.11, side * 0.84);
    root.add(mirrorArm);

    const mirrorCap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.14), bodyMat);
    mirrorCap.position.set(-0.58, 1.15, side * 0.91);
    root.add(mirrorCap);

    for (const hx of [-0.18, 0.68]) {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.032, 0.03), satinSilverMat);
      handle.position.set(hx, 0.96, side * 0.89);
      root.add(handle);
    }

    for (const wx of [-1.32, 1.32]) {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 10, 24, Math.PI), claddingMat);
      arch.position.set(wx, 0.39, side * 0.82);
      root.add(arch);
    }
  }

  const wheelPositions: ReadonlyArray<[number, number, number]> = [
    [-1.32, 0.37, 0.84],
    [-1.32, 0.37, -0.84],
    [1.32, 0.37, 0.84],
    [1.32, 0.37, -0.84],
  ];

  for (const [wx, wy, wz] of wheelPositions) {
    const wheel = createWheel(variant);
    wheel.position.set(wx, wy, wz);
    const spinHub = wheel.getObjectByName("spin-hub");
    if (spinHub) wheels.push(spinHub);
    root.add(wheel);
  }

  // Showroom Turntable Ring
  const podiumMat = new THREE.MeshStandardMaterial({
    color: "#0b0d15",
    roughness: 0.32,
    metalness: 0.65,
  });
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(2.58, 2.68, 0.08, 48), podiumMat);
  podium.position.y = -0.04;
  root.add(podium);

  const underglow = new THREE.MeshBasicMaterial({
    color: variant === "atto3" ? "#47e6ff" : "#ff6b95",
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  const glowRing = new THREE.Mesh(new THREE.RingGeometry(2.52, 2.61, 64), underglow);
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.y = 0.008;
  root.add(glowRing);

  return {
    root,
    wheels,
    bodyMaterials,
    headlightMaterials,
    taillightMaterials,
    textures,
  };
}

export function GarageShowroom3D({
  focusMode,
  onSelectFocus,
  activeCockpitCar,
  onSelectCockpitCar,
  speedKmh,
  braking,
  throttling,
}: GarageShowroom3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [lightsOn, setLightsOn] = useState(true);
  const [attoPaint, setAttoPaint] = useState<string>(ATTO3_PAINTS[0].hex);
  const [zsPaint, setZsPaint] = useState<string>(ZSEV_PAINTS[0].hex);
  const [webglReady, setWebglReady] = useState(true);

  const livePropsRef = useRef({
    focusMode,
    speedKmh,
    braking,
    throttling,
    lightsOn,
    attoPaint,
    zsPaint,
  });

  useEffect(() => {
    livePropsRef.current = {
      focusMode,
      speedKmh,
      braking,
      throttling,
      lightsOn,
      attoPaint,
      zsPaint,
    };
  }, [attoPaint, braking, focusMode, lightsOn, speedKmh, throttling, zsPaint]);

  const orbitRef = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    yaw: 0.56,
    targetYaw: 0.56,
    pitch: 0.24,
    targetPitch: 0.24,
    autoSpin: true,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) orbitRef.current.autoSpin = false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#06070d");
    scene.fog = new THREE.FogExp2("#06070d", 0.042);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(5.8, 2.35, 6.8);

    const floorMat = new THREE.MeshStandardMaterial({
      color: "#070911",
      roughness: 0.22,
      metalness: 0.55,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.08;
    scene.add(floor);

    const grid = new THREE.GridHelper(26, 26, "#2c3858", "#141928");
    grid.position.y = -0.075;
    scene.add(grid);

    scene.add(new THREE.HemisphereLight("#d8e8ff", "#12101e", 1.55));

    const studioSoftbox = new THREE.DirectionalLight("#ffffff", 2.8);
    studioSoftbox.position.set(5, 9, 6);
    scene.add(studioSoftbox);

    const cyanKey = new THREE.PointLight("#4be4ff", 28, 18, 1.5);
    cyanKey.position.set(-5.2, 3.6, 4.2);
    scene.add(cyanKey);

    const violetRim = new THREE.PointLight("#b678ff", 26, 18, 1.5);
    violetRim.position.set(5.4, 3.4, -4.4);
    scene.add(violetRim);

    const attoRig = buildElectricSuv("atto3", livePropsRef.current.attoPaint);
    const zsRig = buildElectricSuv("zsev", livePropsRef.current.zsPaint);
    scene.add(attoRig.root);
    scene.add(zsRig.root);

    const streakCount = 34;
    const streakGeo = new THREE.BufferGeometry();
    const streakPositions = new Float32Array(streakCount * 6);
    const streakSeeds = Array.from({ length: streakCount }, () => ({
      x: (Math.random() - 0.5) * 9,
      y: 0.35 + Math.random() * 1.65,
      z: (Math.random() - 0.5) * 6.5,
      len: 0.6 + Math.random() * 0.9,
    }));
    streakGeo.setAttribute("position", new THREE.BufferAttribute(streakPositions, 3));
    const streakMat = new THREE.LineBasicMaterial({
      color: "#7bf0ff",
      transparent: true,
      opacity: 0,
    });
    scene.add(new THREE.LineSegments(streakGeo, streakMat));

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const resize = () => {
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(stage);

    let inView = true;
    let frameId = 0;
    let lastTime = performance.now();
    const lookTarget = new THREE.Vector3(0, 0.72, 0);
    const desiredLook = new THREE.Vector3(0, 0.72, 0);

    const animate = (now: number) => {
      frameId = 0;
      if (!inView || document.hidden) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const live = livePropsRef.current;
      const orb = orbitRef.current;

      attoRig.bodyMaterials.forEach((m) => m.color.set(live.attoPaint));
      zsRig.bodyMaterials.forEach((m) => m.color.set(live.zsPaint));

      const drlIntensity = live.lightsOn ? (live.throttling ? 2.8 : 2.1) : 0.15;
      attoRig.headlightMaterials.forEach((m) => {
        m.emissiveIntensity = drlIntensity;
      });
      zsRig.headlightMaterials.forEach((m) => {
        m.emissiveIntensity = drlIntensity;
      });

      const brakeIntensity = live.braking ? 4.4 : live.lightsOn ? 1.75 : 0.25;
      attoRig.taillightMaterials.forEach((m) => {
        m.emissiveIntensity = brakeIntensity;
      });
      zsRig.taillightMaterials.forEach((m) => {
        m.emissiveIntensity = brakeIntensity;
      });

      if (live.focusMode === "dual") {
        attoRig.root.visible = true;
        zsRig.root.visible = true;
        attoRig.root.position.lerp(new THREE.Vector3(-0.35, 0, 1.75), Math.min(1, dt * 6));
        attoRig.root.rotation.y = THREE.MathUtils.lerp(attoRig.root.rotation.y, 0.24, Math.min(1, dt * 6));
        zsRig.root.position.lerp(new THREE.Vector3(0.35, 0, -1.75), Math.min(1, dt * 6));
        zsRig.root.rotation.y = THREE.MathUtils.lerp(zsRig.root.rotation.y, -0.22, Math.min(1, dt * 6));
        desiredLook.set(0, 0.68, 0);
      } else if (live.focusMode === "atto3") {
        attoRig.root.visible = true;
        zsRig.root.visible = false;
        attoRig.root.position.lerp(new THREE.Vector3(0, 0, 0), Math.min(1, dt * 7));
        attoRig.root.rotation.y = THREE.MathUtils.lerp(attoRig.root.rotation.y, 0, Math.min(1, dt * 7));
        desiredLook.set(0, 0.72, 0);
      } else {
        attoRig.root.visible = false;
        zsRig.root.visible = true;
        zsRig.root.position.lerp(new THREE.Vector3(0, 0, 0), Math.min(1, dt * 7));
        zsRig.root.rotation.y = THREE.MathUtils.lerp(zsRig.root.rotation.y, 0, Math.min(1, dt * 7));
        desiredLook.set(0, 0.72, 0);
      }

      if (orb.autoSpin && !orb.dragging && live.speedKmh < 8) {
        orb.targetYaw += dt * 0.22;
      }

      orb.yaw = THREE.MathUtils.lerp(orb.yaw, orb.targetYaw, Math.min(1, dt * 8));
      orb.pitch = THREE.MathUtils.lerp(orb.pitch, orb.targetPitch, Math.min(1, dt * 8));

      const radius = live.focusMode === "dual" ? 8.3 : 6.15;
      const camX = Math.cos(orb.yaw) * Math.cos(orb.pitch) * radius;
      const camZ = Math.sin(orb.yaw) * Math.cos(orb.pitch) * radius;
      const camY = Math.max(0.75, Math.sin(orb.pitch) * radius + 0.55);

      lookTarget.lerp(desiredLook, Math.min(1, dt * 7));
      camera.position.set(lookTarget.x + camX, camY, lookTarget.z + camZ);
      camera.lookAt(lookTarget);

      const wheelAngularVel = (reduceMotion ? 0 : 0.55) + (live.speedKmh / 3.6) / 0.37;
      attoRig.wheels.forEach((w) => {
        w.rotation.z += wheelAngularVel * dt;
      });
      zsRig.wheels.forEach((w) => {
        w.rotation.z += wheelAngularVel * dt;
      });

      const streakOpacity = Math.max(0, Math.min(0.68, (live.speedKmh - 15) / 125));
      streakMat.opacity = streakOpacity;
      if (streakOpacity > 0.01) {
        const arr = streakGeo.attributes.position.array as Float32Array;
        const flowSpeed = 6 + (live.speedKmh / 140) * 28;
        streakSeeds.forEach((seed, idx) => {
          seed.x += flowSpeed * dt;
          if (seed.x > 4.8) seed.x = -4.8;
          const lengthScale = seed.len * (0.5 + (live.speedKmh / 140) * 1.8);
          arr[idx * 6] = seed.x;
          arr[idx * 6 + 1] = seed.y;
          arr[idx * 6 + 2] = seed.z;
          arr[idx * 6 + 3] = seed.x + lengthScale;
          arr[idx * 6 + 4] = seed.y;
          arr[idx * 6 + 5] = seed.z;
        });
        streakGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (frameId === 0 && inView && !document.hidden) {
        lastTime = performance.now();
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              if (inView) startLoop();
              else stopLoop();
            },
            { rootMargin: "15% 0px 15% 0px" },
          )
        : null;
    visibilityObserver?.observe(stage);

    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());
    document.addEventListener("visibilitychange", onVisibility);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      attoRig.textures.forEach((t) => t.dispose());
      zsRig.textures.forEach((t) => t.dispose());
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <article className="bento-card garage-3d-card">
      <div className="bento-card-topline">
        <span>MY GARAGE · KATHMANDU</span>
        <span>01 — 3D ELECTRIC SUVS</span>
      </div>

      <div className="garage-3d-header">
        <div>
          <h3>Electric SUVs in 3D.</h3>
          <p>I own and drive two electric SUVs—inspect my BYD Atto 3 &amp; MG ZS EV in 360° and sync them with the cockpit.</p>
        </div>
      </div>

      <div className="garage-mode-tabs" role="group" aria-label="Select 3D garage view">
        <button
          type="button"
          aria-pressed={focusMode === "dual"}
          className={`garage-tab${focusMode === "dual" ? " is-active" : ""}`}
          onClick={() => {
            onSelectFocus("dual");
            orbitRef.current.targetYaw = 0.56;
            orbitRef.current.targetPitch = 0.25;
          }}
        >
          Dual Garage
        </button>
        <button
          type="button"
          aria-pressed={focusMode === "atto3"}
          className={`garage-tab${focusMode === "atto3" ? " is-active" : ""}`}
          onClick={() => {
            onSelectFocus("atto3");
            onSelectCockpitCar("atto3");
            orbitRef.current.targetYaw = -0.62;
            orbitRef.current.targetPitch = 0.2;
          }}
        >
          BYD Atto 3
        </button>
        <button
          type="button"
          aria-pressed={focusMode === "zsev"}
          className={`garage-tab${focusMode === "zsev" ? " is-active" : ""}`}
          onClick={() => {
            onSelectFocus("zsev");
            onSelectCockpitCar("zsev");
            orbitRef.current.targetYaw = -0.62;
            orbitRef.current.targetPitch = 0.2;
          }}
        >
          MG ZS EV
        </button>
      </div>

      <div
        ref={stageRef}
        className="garage-3d-stage"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          orbitRef.current.dragging = true;
          orbitRef.current.autoSpin = false;
          orbitRef.current.lastX = e.clientX;
          orbitRef.current.lastY = e.clientY;
        }}
        onPointerMove={(e) => {
          if (!orbitRef.current.dragging) return;
          const dx = e.clientX - orbitRef.current.lastX;
          const dy = e.clientY - orbitRef.current.lastY;
          orbitRef.current.lastX = e.clientX;
          orbitRef.current.lastY = e.clientY;
          orbitRef.current.targetYaw += dx * 0.011;
          orbitRef.current.targetPitch = Math.max(
            0.06,
            Math.min(0.62, orbitRef.current.targetPitch + dy * 0.007),
          );
        }}
        onPointerUp={() => {
          orbitRef.current.dragging = false;
        }}
        onPointerCancel={() => {
          orbitRef.current.dragging = false;
        }}
      >
        {webglReady ? (
          <canvas
            ref={canvasRef}
            className="garage-3d-canvas"
            aria-label="Interactive 3D showroom featuring BYD Atto 3 and MG ZS EV electric SUVs"
          />
        ) : (
          <div className="garage-3d-fallback">
            <strong>BYD Atto 3 &amp; MG ZS EV</strong>
            <span>3D Showroom Preview</span>
          </div>
        )}

        <div className="garage-stage-overlay-top">
          <span className="garage-drag-hint">↻ DRAG TO ORBIT 360°</span>
          <button
            type="button"
            className={`garage-lights-btn${lightsOn ? " is-on" : ""}`}
            aria-pressed={lightsOn}
            onClick={(e) => {
              e.stopPropagation();
              setLightsOn((v) => !v);
            }}
          >
            {lightsOn ? "DRL LIGHTS: ON" : "DRL LIGHTS: OFF"}
          </button>
        </div>

        <div className="garage-stage-overlay-bottom" onPointerDown={(e) => e.stopPropagation()}>
          {focusMode !== "zsev" && (
            <div className="garage-paint-picker">
              <span className="paint-label">BYD</span>
              {ATTO3_PAINTS.map((paint) => (
                <button
                  key={paint.name}
                  type="button"
                  title={`BYD Atto 3 · ${paint.name}`}
                  aria-label={`Select BYD Atto 3 ${paint.name} finish`}
                  className={`paint-swatch${attoPaint === paint.hex ? " is-selected" : ""}`}
                  style={{ backgroundColor: paint.hex }}
                  onClick={() => setAttoPaint(paint.hex)}
                />
              ))}
            </div>
          )}

          {focusMode !== "atto3" && (
            <div className="garage-paint-picker">
              <span className="paint-label">MG</span>
              {ZSEV_PAINTS.map((paint) => (
                <button
                  key={paint.name}
                  type="button"
                  title={`MG ZS EV · ${paint.name}`}
                  aria-label={`Select MG ZS EV ${paint.name} finish`}
                  className={`paint-swatch${zsPaint === paint.hex ? " is-selected" : ""}`}
                  style={{ backgroundColor: paint.hex }}
                  onClick={() => setZsPaint(paint.hex)}
                />
              ))}
            </div>
          )}

          {speedKmh > 3 && (
            <span className="garage-live-sync">SYNC · {Math.round(speedKmh)} KM/H</span>
          )}
        </div>
      </div>

      <div className="garage-ev-cards">
        <button
          type="button"
          className={`ev-spec-card${activeCockpitCar === "atto3" ? " is-cockpit-active" : ""}`}
          onClick={() => {
            onSelectCockpitCar("atto3");
            onSelectFocus("atto3");
          }}
        >
          <div className="ev-spec-top">
            <span className="ev-brand-pill is-byd">BYD</span>
            <span className="ev-cockpit-tag">
              {activeCockpitCar === "atto3" ? "● IN COCKPIT" : "DRIVE →"}
            </span>
          </div>
          <strong>Atto 3</strong>
          <span className="ev-sub">Blade Battery · 150 kW · 310 Nm</span>
        </button>

        <button
          type="button"
          className={`ev-spec-card${activeCockpitCar === "zsev" ? " is-cockpit-active" : ""}`}
          onClick={() => {
            onSelectCockpitCar("zsev");
            onSelectFocus("zsev");
          }}
        >
          <div className="ev-spec-top">
            <span className="ev-brand-pill is-mg">MG</span>
            <span className="ev-cockpit-tag">
              {activeCockpitCar === "zsev" ? "● IN COCKPIT" : "DRIVE →"}
            </span>
          </div>
          <strong>ZS EV</strong>
          <span className="ev-sub">Pure Electric SUV · 130 kW · 280 Nm</span>
        </button>
      </div>
    </article>
  );
}
