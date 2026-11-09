import { useEffect, useRef } from "react";
import * as THREE from "three";
import { soundFx } from "../audio/soundEffects";

export function CyberHologramCore3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for mouse interaction rotation
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner glowing crystalline icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      emissive: 0x0a2540,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.88,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Outer glowing wireframe cage
    const outerGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // 3. Orbital Ring 1 (Cyan)
    const ringGeo1 = new THREE.TorusGeometry(1.58, 0.018, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Orbital Ring 2 (Violet)
    const ringGeo2 = new THREE.TorusGeometry(1.72, 0.015, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.5;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Orbiting particulate nebula
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.3 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePos[i] = radius * Math.cos(phi) * Math.cos(theta);
      particlePos[i + 1] = radius * Math.sin(phi);
      particlePos[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particlePoints);

    // Lighting
    const light1 = new THREE.PointLight(0x00f0ff, 2.5, 10);
    light1.position.set(2, 3, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 2, 10);
    light2.position.set(-2, -3, 2);
    scene.add(light2);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambLight);

    // Interactive mouse drag / pointer tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        targetRotY = nx * 0.6;
        targetRotX = -ny * 0.6;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      soundFx.playHover();
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(mount);

    // Animation loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      // Continuous autonomous idle spin
      innerMesh.rotation.y += dt * 0.45;
      innerMesh.rotation.x += dt * 0.3;
      outerMesh.rotation.y -= dt * 0.25;
      outerMesh.rotation.z += dt * 0.15;

      ring1.rotation.z += dt * 0.6;
      ring2.rotation.z -= dt * 0.5;

      particlePoints.rotation.y += dt * 0.12;

      // Smooth spring interpolation towards target tilt
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.08;
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[280px] sm:min-h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Holographic Cyber Core — Drag to spin"
      aria-label="Interactive 3D Cyber Hologram"
    />
  );
}
