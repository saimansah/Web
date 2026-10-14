import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

interface HackerSequenceProps {
  paused?: boolean;
  children: ReactNode;
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

function makeDisplayTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 1280, 720);
  gradient.addColorStop(0, "#080b13");
  gradient.addColorStop(0.55, "#111026");
  gradient.addColorStop(1, "#09131a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1280, 720);
  context.strokeStyle = "rgba(171, 186, 255, .12)";
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
  context.fillStyle = "#9cf8e6";
  context.font = "600 19px monospace";
  context.fillText("SAIMAN SAH  /  PERSONAL PORTFOLIO", 76, 80);
  context.fillStyle = "#f3f3fb";
  context.font = "700 78px sans-serif";
  context.fillText("Ideas into", 76, 230);
  context.fillText("useful things.", 76, 324);
  context.fillStyle = "#a8a9bd";
  context.font = "26px sans-serif";
  context.fillText("Software · AI · Kathmandu, Nepal", 80, 382);
  context.strokeStyle = "rgba(156, 248, 230, .55)";
  context.strokeRect(80, 442, 520, 1);
  context.fillStyle = "#d8daec";
  context.font = "600 20px monospace";
  context.fillText("ABOUT     TOOLS     CERTIFICATES     OUTSIDE WORK", 80, 492);
  context.fillStyle = "#9cf8e6";
  context.fillText("17 OPENABLE DOCUMENTS", 80, 650);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addStarfield(scene: THREE.Scene) {
  const count = 950;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [new THREE.Color("#d4e6ff"), new THREE.Color("#98f4df"), new THREE.Color("#c5a7ff")];

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 64;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 38;
    positions[index * 3 + 2] = -13 - Math.random() * 20;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const glow = 0.35 + Math.random() * 0.65;
    colors[index * 3] = color.r * glow;
    colors[index * 3 + 1] = color.g * glow;
    colors[index * 3 + 2] = color.b * glow;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const stars = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.86, sizeAttenuation: true }),
  );
  scene.add(stars);
  return stars;
}

function addSpaceObjects(scene: THREE.Scene) {
  const violet = new THREE.MeshStandardMaterial({ color: "#483d86", roughness: 0.72, metalness: 0.12, emissive: "#34256f", emissiveIntensity: 0.42 });
  const cyan = new THREE.MeshStandardMaterial({ color: "#287b88", roughness: 0.6, emissive: "#12444b", emissiveIntensity: 0.45 });
  const halo = new THREE.MeshBasicMaterial({ color: "#9c82ff", transparent: true, opacity: 0.43 });

  const planet = new THREE.Group();
  planet.position.set(7, 4.6, -7.5);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 24), violet);
  planet.add(orb);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.03, 0.018, 8, 96), halo);
  ring.rotation.set(1.05, 0.2, -0.34);
  planet.add(ring);
  scene.add(planet);

  const smallWorld = new THREE.Group();
  smallWorld.position.set(-7.4, 2.5, -6.6);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.43, 24, 18), cyan);
  smallWorld.add(moon);
  const moonRing = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.012, 8, 72), new THREE.MeshBasicMaterial({ color: "#5ed7dc", transparent: true, opacity: 0.35 }));
  moonRing.rotation.set(1.18, 0.08, 0.4);
  smallWorld.add(moonRing);
  scene.add(smallWorld);
  return { planet, smallWorld };
}

function addDeskScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);

  const deskMaterial = material("#171820", 0.38, 0.36);
  const deskEdge = material("#32323d", 0.32, 0.55);
  const darkFabric = material("#111119", 0.94, 0.04);
  const hoodFabric = material("#191923", 0.9, 0.06);
  const laptopMetal = material("#333743", 0.31, 0.68);
  const keyMaterial = material("#141720", 0.48, 0.38);
  const skinMaterial = new THREE.MeshStandardMaterial({ color: "#4d454a", roughness: 0.8, metalness: 0.02 });
  const accent = new THREE.MeshStandardMaterial({ color: "#8ce7e0", roughness: 0.25, metalness: 0.25, emissive: "#2c9a9b", emissiveIntensity: 0.65 });

  // A wide, low table gives the scene a clear foreground plane.
  addBox(group, [12.4, 0.24, 6.2], [0, -0.11, 1.05], deskMaterial);
  addBox(group, [12.5, 0.055, 6.25], [0, 0.025, 1.05], deskEdge);
  for (const x of [-5.3, 5.3]) {
    for (const z of [-1.4, 3.35]) addBox(group, [0.2, 2.4, 0.2], [x, -1.2, z], deskMaterial);
  }
  const deskGlow = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.018, 0.025), accent);
  deskGlow.position.set(0, -0.03, 4.05);
  group.add(deskGlow);

  // Chair, shoulders and a deep hood form a readable anonymous silhouette.
  const chair = addSphere(group, [0, 1.6, -2.65], [2.25, 2.7, 0.38], material("#0c0d13", 0.78, 0.08));
  chair.rotation.z = 0.02;
  const body = addSphere(group, [0, 2.65, -1.55], [2.05, 1.85, 0.98], darkFabric, 32);
  body.rotation.z = -0.015;
  addSphere(group, [0, 3.55, -1.42], [1.47, 0.72, 0.82], hoodFabric, 32);
  addSphere(group, [0, 4.2, -1.42], [1.08, 1.22, 0.9], darkFabric, 36);
  addSphere(group, [0, 4.19, -0.75], [0.72, 0.83, 0.31], material("#05060b", 0.45, 0.15), 32);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.105, 0.1), new THREE.MeshBasicMaterial({ color: "#142d3a", transparent: true, opacity: 0.9 }));
  visor.position.set(0, 4.14, -0.43);
  group.add(visor);
  const visorGlow = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.014, 0.018), new THREE.MeshBasicMaterial({ color: "#84e9ea" }));
  visorGlow.position.set(0, 4.14, -0.375);
  group.add(visorGlow);

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

  // Open laptop with a softly lit portfolio interface on its display.
  const screenFrame = addBox(group, [5.54, 3.21, 0.18], [0, DISPLAY_Y, DISPLAY_Z - 0.08], material("#20232d", 0.28, 0.78));
  const displayTexture = makeDisplayTexture();
  const displayMaterial = displayTexture
    ? new THREE.MeshBasicMaterial({ map: displayTexture, toneMapped: false })
    : new THREE.MeshBasicMaterial({ color: "#09111b" });
  const display = new THREE.Mesh(new THREE.PlaneGeometry(DISPLAY_WIDTH, DISPLAY_HEIGHT), displayMaterial);
  display.position.set(0, DISPLAY_Y, DISPLAY_Z + 0.014);
  group.add(display);

  const webcam = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), accent);
  webcam.position.set(0, DISPLAY_Y + DISPLAY_HEIGHT / 2 - 0.055, DISPLAY_Z + 0.02);
  group.add(webcam);

  const base = addBox(group, [5.85, 0.2, 3.5], [0, 0.22, 1.03], laptopMetal);
  const keyboardDeck = addBox(group, [5.52, 0.035, 2.45], [0, 0.337, 0.75], keyMaterial);
  keyboardDeck.material = material("#252934", 0.41, 0.48);
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
  addBox(group, [1.18, 0.026, 0.7], [0, 0.35, 2.22], material("#171a23", 0.39, 0.47));
  for (const side of [-1, 1]) {
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.22, 16), deskEdge);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(side * 1.55, 0.43, -0.58);
    group.add(hinge);
  }
  base.userData.displayFrame = screenFrame;
  return { group, displayTexture };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value: number) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

export function HackerSequence({ paused = false, children }: HackerSequenceProps) {
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
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      canvas.classList.add("is-unavailable");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#05070d");
    scene.fog = new THREE.FogExp2("#05070d", 0.016);
    const camera = new THREE.PerspectiveCamera(39, 1, 0.08, 100);
    const screenCenter = new THREE.Vector3(0, DISPLAY_Y, DISPLAY_Z + 0.018);
    const initialDistance = stage.clientWidth < 740 ? 15.1 : 12.1;
    camera.position.set(0, 4.7, initialDistance);
    camera.lookAt(0, 3.9, screenCenter.z);
    const stars = addStarfield(scene);
    const spaceObjects = addSpaceObjects(scene);
    const { displayTexture } = addDeskScene(scene);

    scene.add(new THREE.AmbientLight("#9ba7ce", 1.65));
    const keyLight = new THREE.DirectionalLight("#d6d4ff", 2.4);
    keyLight.position.set(-5, 7, 8);
    scene.add(keyLight);
    const magentaLight = new THREE.PointLight("#a45cff", 155, 22, 1.65);
    magentaLight.position.set(-5.4, 4.8, -1.8);
    scene.add(magentaLight);
    const cyanLight = new THREE.PointLight("#44d5df", 135, 24, 1.55);
    cyanLight.position.set(5.2, 4.1, 1.2);
    scene.add(cyanLight);
    const screenLight = new THREE.PointLight("#7e80ff", 48, 9, 1.75);
    screenLight.position.set(0, 2.3, 0.2);
    scene.add(screenLight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.45));
    renderer.setClearColor("#05070d", 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.12 : 1.45));
      renderer.setSize(width, height, false);
      needsRender = true;
      if (reducedMotion.matches || pausedRef.current) renderFrame(performance.now());
      else requestFrame();
    };

    const readProgress = () => {
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      return clamp(-activeSection.getBoundingClientRect().top / scrollDistance, 0, 1);
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
      activePortal.style.left = `${left}px`;
      activePortal.style.top = `${top}px`;
      activePortal.style.width = `${Math.max(0, right - left)}px`;
      activePortal.style.height = `${Math.max(0, bottom - top)}px`;
    };

    function renderFrame(now: number) {
      const progress = readProgress();
      const approach = smoothstep(progress);
      const width = Math.max(1, activeStage.clientWidth);
      const startZ = width < 740 ? 15.1 : 12.1;
      const finalDistance = DISPLAY_HEIGHT / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      const finalZ = DISPLAY_Z + 0.022 + finalDistance;
      const targetZ = THREE.MathUtils.lerp(startZ, finalZ, approach);
      const mouseInfluence = 1 - approach * 0.88;
      const targetX = pointer.x * 0.12 * mouseInfluence;
      const targetY = THREE.MathUtils.lerp(4.7, DISPLAY_Y, approach) + pointer.y * 0.055 * mouseInfluence;
      const targetLookY = THREE.MathUtils.lerp(3.9, DISPLAY_Y, approach);
      const follow = reducedMotion.matches || pausedRef.current ? 1 : 0.16;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, follow);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, follow);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z || startZ, targetZ, follow);
      camera.lookAt(screenCenter.x + targetX * 0.28, targetLookY, screenCenter.z);
      camera.updateMatrixWorld();

      if (!pausedRef.current && !reducedMotion.matches) {
        const delta = Math.min(0.04, (now - (lastFrame || now)) / 1000);
        elapsed += delta;
        stars.rotation.y = Math.sin(elapsed * 0.06) * 0.035;
        spaceObjects.planet.rotation.y = elapsed * 0.09;
        spaceObjects.smallWorld.rotation.y = -elapsed * 0.055;
      }
      lastFrame = now;

      const reveal = smoothstep((progress - 0.06) / 0.38);
      activeCopy.style.opacity = String(1 - reveal);
      activeCopy.style.transform = `translate3d(0, ${-12 * reveal}px, 0)`;
      activeCopy.style.pointerEvents = reveal > 0.82 ? "none" : "auto";
      activePortal.style.borderRadius = `${Math.max(0, 13 * (1 - approach))}px`;
      activePortal.style.boxShadow = `0 0 ${8 + 38 * (1 - approach)}px rgba(104, 222, 233, ${0.12 + 0.13 * (1 - approach)})`;
      activePortal.style.setProperty("--screen-progress", String(progress));
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
      pointerTarget.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
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
    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) requestFrame();
          else if (frameId) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
          }
        }, { rootMargin: "12% 0px 12% 0px" })
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
  }, []);

  return (
    <section id="home" ref={sectionRef} className="hero-sequence" aria-label="Portfolio introduction">
      <div ref={stageRef} className="hero-stage">
        <canvas ref={canvasRef} className="sequence-canvas" aria-hidden="true" />
        <div className="hero-stage-shade" aria-hidden="true" />
        <div ref={copyRef} className="hero-stage-copy">{children}</div>
        <div ref={portalRef} className="screen-portal" aria-label="Portfolio preview on the laptop screen">
          <div className="screen-ui">
            <header className="screen-ui-header">
              <a className="screen-ui-brand" href="/" data-scroll-target="home">SAIMAN SAH<span> / KATHMANDU, NEPAL</span></a>
              <div className="screen-ui-status"><i /> LIVE PORTFOLIO</div>
            </header>
            <div className="screen-ui-body">
              <div className="screen-ui-main">
                <p className="screen-ui-kicker">SOFTWARE · AI · IDEAS</p>
                <h2>Make useful<br /><span>things happen.</span></h2>
                <p className="screen-ui-description">I’m Saiman, a software developer in Kathmandu. I build, explore AI, and learn by making.</p>
                <a className="screen-ui-cta" href="/" data-scroll-target="about">Explore the portfolio <span>↗</span></a>
              </div>
              <div className="screen-ui-aside" aria-label="Portfolio sections">
                <a href="/" data-scroll-target="about"><span>01</span><strong>About</strong><i>↗</i></a>
                <a href="/" data-scroll-target="skills"><span>02</span><strong>Tools</strong><i>↗</i></a>
                <a href="/" data-scroll-target="credentials"><span>03</span><strong>Certificates</strong><i>↗</i></a>
                <a href="/" data-scroll-target="outside"><span>04</span><strong>Outside work</strong><i>↗</i></a>
              </div>
            </div>
            <footer className="screen-ui-footer">
              <span>27.7172° N · 85.3240° E</span>
              <span>ENGLISH · नेपाली · हिंदी</span>
              <span>17 Verified Certificate</span>
            </footer>
          </div>
        </div>
      </div>
      <span className="sequence-scroll-distance" aria-hidden="true" />
    </section>
  );
}
