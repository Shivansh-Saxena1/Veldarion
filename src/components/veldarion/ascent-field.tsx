"use client";

import { useEffect, useRef, useState } from "react";

/* ================================================================
   THE ASCENT FIELD — Veldarion's signature WebGL layer
   ----------------------------------------------------------------
   A topographic ink-line terrain, drawn like an engineer's survey
   of the payer-rules landscape. Through it rises a chartreuse
   ridge — the brand's upward arrow rendered in 3D — whose height
   accelerates quadratically (the "compounding edge"). A signal
   pulse travels up the ridge: a denied claim being recovered.

   Architecture — Layered Separation (Three.js scene + Motion UI):
   - `three` is dynamically imported AFTER hydration, keeping the
     initial JS bundle light (3D loads once the page is interactive)
   - render loop pauses when the canvas is offscreen or the tab is
     hidden; DPR is capped (2 desktop / 1.5 mobile)
   - grid density degrades on mobile; pointer parallax is
     pointer:fine-only
   - prefers-reduced-motion renders a single static frame
   - every geometry / material / renderer is disposed on unmount
================================================================ */

type ThreeNS = typeof import("three");

export default function AscentField({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let THREE: ThreeNS;
      try {
        THREE = await import("three");
      } catch {
        return; // 3D here is progressive enhancement — fail silently
      }
      if (disposed || !canvasRef.current) return;
      try {
        cleanup = initAscentField(THREE, canvasRef.current, () =>
          setReady(true),
        );
      } catch {
        /* WebGL unavailable — the parchment CSS background remains */
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full transition-opacity duration-[1600ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}

/* ----------------------------------------------------------------
   Scene
---------------------------------------------------------------- */

function initAscentField(
  THREE: ThreeNS,
  canvas: HTMLCanvasElement,
  onReady: () => void,
): () => void {
  const isMobile = window.matchMedia(
    "(max-width: 767px), (pointer: coarse)",
  ).matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* Palette (matches the page tokens) */
  const PARCHMENT = new THREE.Color("#F4EFE4");
  const INK = new THREE.Color("#14110C");
  const CHARTREUSE = new THREE.Color("#C5F23D");
  const AMBER = new THREE.Color("#E8A317");

  /* Renderer — low-power preference: a background layer should not
     spin up the discrete GPU or drain mobile batteries. */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
  );

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PARCHMENT.getHex(), 9, 26);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0.6, 4.1, 10.6); // intro pose — eased in by the rig

  const group = new THREE.Group();
  group.position.y = -1.35;
  scene.add(group);

  /* ---- Terrain geometry: a warped survey grid ------------------ */
  const COLS = isMobile ? 42 : 68;
  const ROWS = isMobile ? 26 : 42;
  const X0 = -13;
  const X1 = 13;
  const Z0 = 6.5; // front (near camera)
  const Z1 = -8.5; // back
  const COUNT = COLS * ROWS;

  /* The ascent ridge — a static XZ path the terrain rises along.
     Height accelerates quadratically: the compounding edge. */
  const RIDGE_SAMPLES = 96;
  const ridgeXZ: { x: number; z: number; h: number }[] = [];
  for (let s = 0; s < RIDGE_SAMPLES; s++) {
    const t = s / (RIDGE_SAMPLES - 1);
    ridgeXZ.push({
      x: -8.5 + t * 11.9 - Math.sin(t * Math.PI) * 1.6,
      z: 6.0 - t * 14.5,
      h: 0.3 + t * t * 3.1,
    });
  }

  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const waveA = new Float32Array(COUNT); // prebaked wave coefficients
  const waveB = new Float32Array(COUNT);
  const waveC = new Float32Array(COUNT);
  const gAuss = new Float32Array(COUNT); // ridge proximity per vertex
  const rHeight = new Float32Array(COUNT); // ridge height at that proximity

  const smoothstep = (a: number, b: number, v: number) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  const tmp = new THREE.Color();
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const idx = i * COLS + j;
      const x = X0 + (j / (COLS - 1)) * (X1 - X0);
      const z = Z0 + (i / (ROWS - 1)) * (Z1 - Z0);
      pos[idx * 3] = x;
      pos[idx * 3 + 1] = 0;
      pos[idx * 3 + 2] = z;

      /* Nearest ridge point (XZ distance) */
      let best = Infinity;
      let bestT = 0;
      for (let s = 0; s < RIDGE_SAMPLES; s++) {
        const r = ridgeXZ[s];
        const dx = x - r.x;
        const dz = z - r.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < best) {
          best = d2;
          bestT = s / (RIDGE_SAMPLES - 1);
        }
      }
      const gauss = Math.exp(-best / (2 * 1.15 * 1.15));
      gAuss[idx] = gauss;
      rHeight[idx] = 0.3 + bestT * bestT * 3.1;

      waveA[idx] = x * 0.5;
      waveB[idx] = z * 0.42;
      waveC[idx] = (x + z) * 0.27;

      /* Vertex colour — ink everywhere, an amber→chartreuse accent
         that brightens toward the ridge, dissolving to parchment at
         the frame edges so the terrain bleeds into the page. */
      const edge = Math.max(
        smoothstep(9, 13.5, Math.abs(x)),
        smoothstep(3.2, 6.8, z),
      );
      tmp.copy(INK).lerp(
        AMBER.clone().lerp(CHARTREUSE, bestT),
        Math.min(1, gauss * 1.15),
      );
      tmp.lerp(PARCHMENT, edge);
      col[idx * 3] = tmp.r;
      col[idx * 3 + 1] = tmp.g;
      col[idx * 3 + 2] = tmp.b;
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS - 1; j++) {
      indices.push(i * COLS + j, i * COLS + j + 1);
    }
  }
  for (let j = 0; j < COLS; j++) {
    for (let i = 0; i < ROWS - 1; i++) {
      indices.push(i * COLS + j, (i + 1) * COLS + j);
    }
  }

  const terrainGeo = new THREE.BufferGeometry();
  terrainGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  terrainGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  terrainGeo.setIndex(indices);
  const terrainMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
  });
  const terrain = new THREE.LineSegments(terrainGeo, terrainMat);
  group.add(terrain);

  /* ---- Ridge spine — the bright path rising through the field -- */
  const SPINE_N = 90;
  const spinePos = new Float32Array(SPINE_N * 3);
  const spineT: number[] = [];
  for (let s = 0; s < SPINE_N; s++) {
    const t = s / (SPINE_N - 1);
    spineT.push(t);
    const r = ridgeXZ[Math.round(t * (RIDGE_SAMPLES - 1))];
    spinePos[s * 3] = r.x;
    spinePos[s * 3 + 1] = 0;
    spinePos[s * 3 + 2] = r.z;
  }
  const spineGeo = new THREE.BufferGeometry();
  spineGeo.setAttribute("position", new THREE.BufferAttribute(spinePos, 3));
  const spineMat = new THREE.LineBasicMaterial({
    color: CHARTREUSE.getHex(),
    transparent: true,
    opacity: 0.9,
  });
  group.add(new THREE.Line(spineGeo, spineMat));

  /* ---- Ridge nodes — recovered-claim markers along the path ---- */
  const NODE_N = 9;
  const nodePos = new Float32Array(NODE_N * 3);
  const nodeT: number[] = [];
  for (let n = 0; n < NODE_N; n++) {
    const t = 0.12 + (n / (NODE_N - 1)) * 0.88;
    nodeT.push(t);
    const r = ridgeXZ[Math.round(t * (RIDGE_SAMPLES - 1))];
    nodePos[n * 3] = r.x;
    nodePos[n * 3 + 1] = 0;
    nodePos[n * 3 + 2] = r.z;
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: CHARTREUSE.getHex(),
    size: 0.17,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
  });
  group.add(new THREE.Points(nodeGeo, nodeMat));

  /* ---- Signal pulse — a claim travelling up the ridge ----------- */
  const pulseCoreGeo = new THREE.BufferGeometry();
  pulseCoreGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(3), 3),
  );
  const pulseCoreMat = new THREE.PointsMaterial({
    color: INK.getHex(),
    size: 0.2,
    sizeAttenuation: true,
  });
  group.add(new THREE.Points(pulseCoreGeo, pulseCoreMat));

  const pulseHaloGeo = new THREE.BufferGeometry();
  pulseHaloGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(3), 3),
  );
  const pulseHaloMat = new THREE.PointsMaterial({
    color: CHARTREUSE.getHex(),
    size: 0.52,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
  });
  group.add(new THREE.Points(pulseHaloGeo, pulseHaloMat));

  /* ---- Floating seals — octahedra hovering above the ridge ------
     Desktop only: on narrow viewports the stacked copy occupies
     the ridge's screen space, so a high-floating seal would sit on
     top of body text. */
  const sealDefs = [
    { t: 0.55, color: "#A8D11C", phase: 0 },
    { t: 0.78, color: "#B8800E", phase: 2.1 },
    { t: 0.97, color: "#14110C", phase: 4.2 },
  ];
  const seals = isMobile
    ? []
    : sealDefs.map((d) => {
        const geo = new THREE.OctahedronGeometry(0.19);
        const mat = new THREE.MeshBasicMaterial({ color: d.color });
        const mesh = new THREE.Mesh(geo, mat);
        const r = ridgeXZ[Math.round(d.t * (RIDGE_SAMPLES - 1))];
        mesh.position.set(r.x, 0.3 + d.t * d.t * 3.1 + 0.6, r.z);
        group.add(mesh);
        return { mesh, ...d };
      });

  /* ---- Shared height field -------------------------------------- */
  const heightAt = (
    a: number,
    b: number,
    c: number,
    gauss: number,
    rh: number,
    t: number,
  ) => {
    const wave =
      Math.sin(a + t * 0.45) * 0.3 +
      Math.cos(b - t * 0.32) * 0.26 +
      Math.sin(c + t * 0.21) * 0.2;
    return wave * (1 - 0.65 * gauss) + gauss * rh;
  };

  const ridgePointAt = (t: number) =>
    ridgeXZ[Math.round(t * (RIDGE_SAMPLES - 1))];

  const updateScene = (elapsed: number) => {
    const t = elapsed;
    const terrainPos = terrainGeo.getAttribute("position")
      .array as Float32Array;
    for (let idx = 0; idx < COUNT; idx++) {
      terrainPos[idx * 3 + 1] = heightAt(
        waveA[idx],
        waveB[idx],
        waveC[idx],
        gAuss[idx],
        rHeight[idx],
        t,
      );
    }
    terrainGeo.getAttribute("position").needsUpdate = true;

    for (let s = 0; s < SPINE_N; s++) {
      const rt = spineT[s];
      const r = ridgePointAt(rt);
      spinePos[s * 3 + 1] =
        heightAt(r.x * 0.5, r.z * 0.42, (r.x + r.z) * 0.27, 1, 0.3 + rt * rt * 3.1, t) + 0.05;
    }
    spineGeo.getAttribute("position").needsUpdate = true;

    for (let n = 0; n < NODE_N; n++) {
      const nt = nodeT[n];
      const r = ridgePointAt(nt);
      nodePos[n * 3 + 1] =
        heightAt(r.x * 0.5, r.z * 0.42, (r.x + r.z) * 0.27, 1, 0.3 + nt * nt * 3.1, t) + 0.05;
    }
    nodeGeo.getAttribute("position").needsUpdate = true;

    /* Pulse loops up the ridge with smooth ease */
    const cycle = (t / 4.2) % 1;
    const eased = cycle * cycle * (3 - 2 * cycle);
    const pr = ridgePointAt(eased);
    const py =
      heightAt(pr.x * 0.5, pr.z * 0.42, (pr.x + pr.z) * 0.27, 1, 0.3 + eased * eased * 3.1, t) + 0.06;
    (pulseCoreGeo.getAttribute("position").array as Float32Array).set([
      pr.x,
      py,
      pr.z,
    ]);
    pulseCoreGeo.getAttribute("position").needsUpdate = true;
    (pulseHaloGeo.getAttribute("position").array as Float32Array).set([
      pr.x,
      py,
      pr.z,
    ]);
    pulseHaloGeo.getAttribute("position").needsUpdate = true;
    const pulse = 1 + Math.sin(t * 6) * 0.18;
    pulseCoreMat.size = 0.2 * pulse;
    pulseHaloMat.size = 0.52 * pulse;

    for (const s of seals) {
      s.mesh.position.y =
        0.3 + s.t * s.t * 3.1 + 0.6 + Math.sin(t * 1.2 + s.phase) * 0.12;
      s.mesh.rotation.y = t * 0.4 + s.phase;
      s.mesh.rotation.x = Math.sin(t * 0.5 + s.phase) * 0.25;
    }
  };

  /* ---- Rig: parallax + scroll + intro ---------------------------- */
  let mx = 0;
  let my = 0;
  let scrollP = 0;
  let heroH = 800;

  const onPointerMove = (e: PointerEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    scrollP = Math.min(1, Math.max(0, window.scrollY / (heroH * 0.9)));
  };
  const onResize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || 600;
    heroH = h || 800;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    if (reduce) renderOnce();
  };

  const renderOnce = () => {
    updateScene(0);
    camera.position.set(0, 3.1, 8.2);
    camera.lookAt(0, 0.7, -2.5);
    renderer.render(scene, camera);
  };

  /* ---- Loop with visibility gating -------------------------------- */
  /* performance.now() timing (THREE.Clock is deprecated) */
  const t0 = performance.now();
  let raf = 0;
  let inView = true;
  let tabVisible = !document.hidden;

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 },
  );
  io.observe(canvas);

  const onVisibility = () => {
    tabVisible = !document.hidden;
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!inView || !tabVisible) return;

    const t = (performance.now() - t0) / 1000;

    /* Camera rig — intro glide, pointer parallax, idle sway, scroll drift */
    const targetX = (finePointer ? mx * 0.75 : 0) + Math.sin(t * 0.07) * 0.3;
    const targetY = 3.1 - (finePointer ? my * 0.35 : 0) + scrollP * 0.55;
    const targetZ = 8.2;
    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0.7 + scrollP * 0.25, -2.5);

    /* Parallax between terrain and camera as the page scrolls */
    group.position.y = -1.35 - scrollP * 1.4;
    const fade = 1 - scrollP * 0.5;
    terrainMat.opacity = 0.55 * fade;
    spineMat.opacity = 0.9 * fade;
    nodeMat.opacity = 0.95 * fade;

    updateScene(t);
    renderer.render(scene, camera);
  };

  /* ---- Boot -------------------------------------------------------- */
  onResize();
  if (reduce) {
    renderOnce();
    window.addEventListener("resize", onResize);
    onReady();
  } else {
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);
    /* Reveal after the first rendered frame so the canvas always
       fades in over a finished picture, never a blank one. */
    requestAnimationFrame(() => requestAnimationFrame(onReady));
  }

  /* ---- Teardown — dispose everything (no leaked GPU memory) -------- */
  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    terrainGeo.dispose();
    terrainMat.dispose();
    spineGeo.dispose();
    spineMat.dispose();
    nodeGeo.dispose();
    nodeMat.dispose();
    pulseCoreGeo.dispose();
    pulseCoreMat.dispose();
    pulseHaloGeo.dispose();
    pulseHaloMat.dispose();
    for (const s of seals) {
      s.mesh.geometry.dispose();
      s.mesh.material.dispose();
    }
    renderer.dispose();
  };
}
