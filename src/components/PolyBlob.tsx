"use client";

import { useEffect, useRef } from "react";

/**
 * The faceted shape in the hero.
 *
 * A subdivided icosahedron, displaced radially by layered trig noise and lit by
 * a single directional light, drawn with canvas 2D and my own projection rather
 * than a 3D library. Three.js for one decorative mesh would cost roughly 150 KB
 * gzipped; this is a few KB and looks the same at this size.
 *
 * Faces are painter-sorted back to front and filled flat, which is what gives
 * the low-poly look instead of a smooth gradient ball.
 */

type V3 = [number, number, number];

function icosphere(subdivisions: number) {
  const t = (1 + Math.sqrt(5)) / 2;
  let verts: V3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const norm = (v: V3): V3 => {
    const l = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  verts = verts.map(norm);

  for (let s = 0; s < subdivisions; s++) {
    const mid = new Map<string, number>();
    const next: [number, number, number][] = [];
    const midpoint = (a: number, b: number) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      const hit = mid.get(key);
      if (hit !== undefined) return hit;
      const va = verts[a];
      const vb = verts[b];
      verts.push(norm([va[0] + vb[0], va[1] + vb[1], va[2] + vb[2]]));
      const i = verts.length - 1;
      mid.set(key, i);
      return i;
    };
    for (const [a, b, c] of faces) {
      const ab = midpoint(a, b);
      const bc = midpoint(b, c);
      const ca = midpoint(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }
  return { verts, faces };
}

/** Cheap layered trig noise. Not simplex, but smooth and stable over time. */
function wobble(v: V3, t: number) {
  return (
    Math.sin(v[0] * 1.7 + t * 0.62) * 0.62 +
    Math.sin(v[1] * 2.3 - t * 0.48) * 0.52 +
    Math.sin(v[2] * 2.9 + t * 0.4) * 0.44 +
    Math.sin((v[0] + v[1] + v[2]) * 1.4 + t * 0.85) * 0.3 +
    Math.sin((v[0] - v[2]) * 4.6 - t * 0.7) * 0.18 +
    Math.sin((v[1] + v[2]) * 5.9 + t * 0.55) * 0.12
  );
}

export default function PolyBlob({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 320 faces. Fewer, larger triangles are what make the facets legible;
    // at 1280 the shading differences are too small to read as low-poly.
    const { verts, faces } = icosphere(2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let t = reduced ? 1.4 : 0;

    const read = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const hexToRgb = (hex: string) => {
      const s = hex.replace("#", "").trim();
      const n = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
      const v = parseInt(n, 16);
      return [(v >> 16) & 255, (v >> 8) & 255, v & 255] as const;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const cyan = hexToRgb(read("--cyan", "#22d3ee"));
      const accent = hexToRgb(read("--accent-fill", "#1d76db"));
      const ground = hexToRgb(read("--bg", "#f6f9fc"));

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;

      // rotate slowly on two axes so the silhouette keeps changing
      const ay = t * 0.28;
      const ax = Math.sin(t * 0.21) * 0.45;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      // Keep world-space points and screen-space points separate. Deriving the
      // normal from pixel coordinates (x,y in hundreds, z ~1) makes every normal
      // collapse to (0,0,1), every face equally lit, and the whole thing render
      // as a smooth ball instead of facets.
      const world = verts.map((v) => {
        const d = 1 + wobble(v, t) * 0.19;
        let [x, y, z] = [v[0] * d, v[1] * d, v[2] * d];
        [x, z] = [x * cosY - z * sinY, x * sinY + z * cosY];
        [y, z] = [y * cosX - z * sinX, y * sinX + z * cosX];
        return [x, y, z] as const;
      });
      const proj = world.map((p) => [cx + p[0] * R, cy + p[1] * R] as const);

      const light: V3 = [0.42, -0.74, 0.52];

      const tris = faces.map(([a, b, c]) => {
        const wa = world[a], wb = world[b], wc = world[c];
        const ux = wb[0] - wa[0], uy = wb[1] - wa[1], uz = wb[2] - wa[2];
        const vx = wc[0] - wa[0], vy = wc[1] - wa[1], vz = wc[2] - wa[2];
        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const l = Math.hypot(nx, ny, nz) || 1;
        nx /= l; ny /= l; nz /= l;
        const lambert = Math.max(0, nx * light[0] + ny * light[1] + nz * light[2]);
        return {
          pa: proj[a], pb: proj[b], pc: proj[c],
          z: (wa[2] + wb[2] + wc[2]) / 3,
          lambert,
          facing: nz,
        };
      });

      tris.sort((p, q) => p.z - q.z);

      for (const tri of tris) {
        if (tri.facing <= 0) continue; // back-face cull, now that normals are real
        const k = Math.min(1, Math.max(0, Math.pow(tri.lambert, 0.85)));
        // specular: the few faces pointing straight at the light go almost white,
        // which is what stops the shape reading as a flat blue ball
        const spec = Math.pow(Math.max(0, tri.lambert), 9);
        const mix = (i: number) => {
          // unlit faces lift toward the page ground rather than sinking to ink,
          // so the whole form stays airy instead of reading as a rock
          const base = accent[i] + (cyan[i] - accent[i]) * k;
          const lifted = base + (ground[i] - base) * 0.3 * (1 - k);
          return Math.round(Math.min(255, lifted + 255 * spec * 0.8));
        };
        ctx.fillStyle = `rgb(${mix(0)}, ${mix(1)}, ${mix(2)})`;
        ctx.beginPath();
        ctx.moveTo(tri.pa[0], tri.pa[1]);
        ctx.lineTo(tri.pb[0], tri.pb[1]);
        ctx.lineTo(tri.pc[0], tri.pc[1]);
        ctx.closePath();
        ctx.fill();
        // hairline of the same colour closes the seams between facets
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // fade the bottom of the form into the page so it does not sit on the
      // layout like a pasted object
      const fade = ctx.createLinearGradient(0, h * 0.42, 0, h);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const step = () => {
      if (!running) return;
      t += 0.0045;
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    if (reduced) draw();
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    const setRunning = (next: boolean) => {
      if (reduced || next === running) return;
      running = next;
      if (running) raf = requestAnimationFrame(step);
      else cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver((e) => setRunning(e[0].isIntersecting), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
