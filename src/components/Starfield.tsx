import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StarfieldProps {
  paused: boolean;
}

const nebulaVertex = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    vec3 point = position;
    float rotation = uTime * 0.018 + point.z * 0.035;
    mat2 spin = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
    point.xy = spin * point.xy;
    point.z += sin(uTime * 0.24 + aPhase) * 0.04;

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * (190.0 / max(1.0, -viewPosition.z)), 1.0, 10.0);
    vColor = color;
    vPhase = aPhase;
  }
`;

const nebulaFragment = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vPhase;

  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float glow = 1.0 - smoothstep(0.04, 0.5, radius);
    float twinkle = 0.62 + 0.38 * sin(uTime * 0.72 + vPhase * 6.283);
    gl_FragColor = vec4(vColor, glow * twinkle * uOpacity);
  }
`;

const starVertex = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    float twinkle = 0.64 + 0.36 * sin(uTime * 0.58 + aPhase * 6.283);
    gl_PointSize = clamp(aSize * twinkle * (170.0 / max(1.0, -viewPosition.z)), 0.7, 3.0);
    vAlpha = 0.34 + twinkle * 0.55;
  }
`;

const starFragment = `
  varying float vAlpha;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float softDot = 1.0 - smoothstep(0.08, 0.5, radius);
    gl_FragColor = vec4(0.78, 0.82, 1.0, softDot * vAlpha);
  }
`;

function createNebula(count: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const colorStops = [
    new THREE.Color("#6c55ff"),
    new THREE.Color("#d755ff"),
    new THREE.Color("#ff70c7"),
    new THREE.Color("#ffad86"),
    new THREE.Color("#4c8fff"),
  ];

  for (let i = 0; i < count; i += 1) {
    const arm = i % 3;
    const radius = 0.3 + Math.pow(Math.random(), 0.62) * 8.3;
    const angle = arm * ((Math.PI * 2) / 3) + radius * 0.39 + (Math.random() - 0.5) * 0.68;
    const spread = 0.22 + radius * 0.045;
    positions[i * 3] = Math.cos(angle) * radius * 1.45 + (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = Math.sin(angle) * radius * 0.48 + (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * (0.4 + radius * 0.12);

    const palettePosition = Math.min(3.999, radius / 2.25);
    const paletteIndex = Math.floor(palettePosition);
    const color = colorStops[paletteIndex].clone().lerp(colorStops[paletteIndex + 1], palettePosition - paletteIndex);
    const brightness = 0.62 + Math.random() * 0.58;
    colors[i * 3] = color.r * brightness;
    colors[i * 3 + 1] = color.g * brightness;
    colors[i * 3 + 2] = color.b * brightness;
    sizes[i] = 0.35 + Math.random() * 1.15;
    phases[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  return geometry;
}

function createStars(count: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 56;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 32;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 32 - 8;
    sizes[i] = 0.14 + Math.random() * 0.48;
    phases[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  return geometry;
}

export function Starfield({ paused }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const sceneControlRef = useRef<((nextPaused: boolean) => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    sceneControlRef.current?.(paused);
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      canvas.classList.add("is-unavailable");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 25);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x050507, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const starUniforms = { uTime: { value: 0 } };
    const stars = new THREE.Points(
      createStars(window.innerWidth < 700 ? 850 : 1700),
      new THREE.ShaderMaterial({
        uniforms: starUniforms,
        vertexShader: starVertex,
        fragmentShader: starFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(stars);

    const nebulaUniforms = { uTime: { value: 0 }, uOpacity: { value: 0.8 } };
    const nebula = new THREE.Points(
      createNebula(window.innerWidth < 700 ? 6200 : 11800),
      new THREE.ShaderMaterial({
        uniforms: nebulaUniforms,
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    nebula.position.set(0, -0.9, 0);
    scene.add(nebula);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: "#9e57ff",
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const orbit = new THREE.Mesh(new THREE.RingGeometry(6.35, 6.37, 180), orbitMaterial);
    orbit.position.set(0, -0.9, -0.42);
    orbit.rotation.x = -0.08;
    scene.add(orbit);

    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 29 : 25;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.2 : 1.5));
      drawStatic();
    };

    const drawStatic = () => {
      nebulaUniforms.uTime.value = elapsed;
      starUniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      frameId = 0;
      if (pausedRef.current || document.hidden || reducedMotion.matches) return;
      if (now - lastFrame < 1000 / 45) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }
      const delta = Math.min(0.05, (now - (lastFrame || now)) / 1000);
      lastFrame = now;
      elapsed += delta;
      pointer.lerp(targetPointer, 0.035);
      nebula.rotation.z = elapsed * 0.017;
      nebula.rotation.x = -0.08 + pointer.y * 0.075;
      nebula.rotation.y = pointer.x * 0.11;
      stars.rotation.x = pointer.y * 0.008;
      stars.rotation.y = pointer.x * 0.01;
      const scrollMix = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      nebulaUniforms.uOpacity.value = 0.78 * (1 - scrollMix * 0.72);
      nebulaUniforms.uTime.value = elapsed;
      starUniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!pausedRef.current && !document.hidden && !reducedMotion.matches && frameId === 0) {
        lastFrame = 0;
        frameId = window.requestAnimationFrame(animate);
      } else {
        drawStatic();
      }
    };
    const stop = () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      frameId = 0;
      drawStatic();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointer = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      targetPointer.y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };
    const onScroll = () => {
      const scrollMix = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      nebulaUniforms.uOpacity.value = 0.78 * (1 - scrollMix * 0.72);
      if (pausedRef.current || reducedMotion.matches) drawStatic();
    };
    const onMotionChange = () => (reducedMotion.matches ? stop() : start());

    sceneControlRef.current = (nextPaused) => (nextPaused ? stop() : start());
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    resize();
    start();

    return () => {
      sceneControlRef.current = null;
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      scene.traverse((object) => {
        if (object instanceof THREE.Points || object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
}
