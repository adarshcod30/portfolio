"use client";

import { useEffect, useRef } from "react";

/**
 * The hero object: a dome built from translucent blocks, lit from inside.
 *
 * The reference is Igloo Inc, where a single material carries the whole
 * identity. Blocks are laid in rings up a hemisphere, each drawn as three
 * visible faces of a box, painter-sorted and composited additively so
 * overlapping blocks brighten where they stack, the way light behaves through
 * ice. Canvas 2D with hand-rolled projection, so it costs a few KB.
 */

type V3 = [number, number, number];

type Block = {
  /** centre in spherical terms */
  lat: number;
  lon: number;
  /** half-extents: along-ring, up, radial */
  w: number;
  h: number;
  d: number;
  /** per-block jitter so the wall is laid by hand, not stamped */
  tilt: number;
  seed: number;
};

function buildDome(): Block[] {
  const rings = [
    { lat: 0.06, n: 16, h: 0.115 },
    { lat: 0.3, n: 15, h: 0.115 },
    { lat: 0.54, n: 12, h: 0.11 },
    { lat: 0.78, n: 9, h: 0.1 },
    { lat: 1.0, n: 6, h: 0.095 },
    { lat: 1.21, n: 3, h: 0.09 },
  ];
  const out: Block[] = [];
  let s = 7;
  const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
  rings.forEach((ring, ri) => {
    const offset = ri * 0.37; // stagger the courses like real masonry
    for (let i = 0; i < ring.n; i++) {
      const lon = (i / ring.n) * Math.PI * 2 + offset;
      out.push({
        lat: ring.lat,
        lon,
        w: (Math.PI * 2) / ring.n / 2.32,
        h: ring.h,
        d: 0.1,
        tilt: rnd() * 0.16,
        seed: rnd(),
      });
    }
  });
  return out;
}

export default function IceDome({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const blocks = buildDome();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let t = reduced ? 0.9 : 0;

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
      const fill = hexToRgb(read("--accent-fill", "#1d76db"));

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h * 0.58;

      const ay = t * 0.2;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const TIP = 0.42; // fixed tilt, so we look slightly down onto the dome
      const cosX = Math.cos(TIP);
      const sinX = Math.sin(TIP);

      const rot = (p: V3): V3 => {
        let [x, y, z] = p;
        [x, z] = [x * cosY - z * sinY, x * sinY + z * cosY];
        [y, z] = [y * cosX - z * sinX, y * sinX + z * cosX];
        return [x, y, z];
      };
      const project = (p: V3) => [cx + p[0] * R, cy - p[1] * R] as const;

      type Quad = { pts: readonly (readonly [number, number])[]; z: number; shade: number };
      const quads: Quad[] = [];

      for (const b of blocks) {
        const lat = b.lat + b.tilt * 0.12;
        const lon = b.lon + t * 0.0;
        const cl = Math.cos(lat);
        const sl = Math.sin(lat);

        // local frame at the block centre
        const nrm: V3 = [cl * Math.cos(lon), sl, cl * Math.sin(lon)];
        const tang: V3 = [-Math.sin(lon), 0, Math.cos(lon)];
        const up: V3 = [
          nrm[1] * tang[2] - nrm[2] * tang[1],
          nrm[2] * tang[0] - nrm[0] * tang[2],
          nrm[0] * tang[1] - nrm[1] * tang[0],
        ];

        const corner = (su: number, sv: number, sn: number): V3 => {
          const r = 1 + sn * b.d;
          return rot([
            (nrm[0] * r + tang[0] * su * b.w * cl + up[0] * sv * b.h) * 1,
            (nrm[1] * r + tang[1] * su * b.w * cl + up[1] * sv * b.h) * 1,
            (nrm[2] * r + tang[2] * su * b.w * cl + up[2] * sv * b.h) * 1,
          ]);
        };

        // outer face, top face, one side: enough to read as a solid block
        const faces: [V3, V3, V3, V3][] = [
          [corner(-1, -1, 1), corner(1, -1, 1), corner(1, 1, 1), corner(-1, 1, 1)],
          [corner(-1, 1, 1), corner(1, 1, 1), corner(1, 1, -1), corner(-1, 1, -1)],
          [corner(1, -1, 1), corner(1, -1, -1), corner(1, 1, -1), corner(1, 1, 1)],
        ];

        faces.forEach((f, fi) => {
          const zAvg = (f[0][2] + f[1][2] + f[2][2] + f[3][2]) / 4;
          if (zAvg < -0.25) return; // drop the far wall, keep a hint of depth
          const shade =
            (fi === 1 ? 1 : fi === 2 ? 0.62 : 0.8) *
            (0.55 + Math.max(0, nrm[1]) * 0.5) *
            (0.75 + b.seed * 0.3);
          quads.push({ pts: f.map(project), z: zAvg, shade });
        });
      }

      quads.sort((a, b2) => a.z - b2.z);

      ctx.globalCompositeOperation = "lighter";
      for (const q of quads) {
        const k = Math.min(1, Math.max(0.08, q.shade));
        const r = Math.round(fill[0] + (cyan[0] - fill[0]) * k + 90 * k * k);
        const g = Math.round(fill[1] + (cyan[1] - fill[1]) * k + 70 * k * k);
        const bl = Math.round(fill[2] + (cyan[2] - fill[2]) * k + 40 * k * k);
        ctx.fillStyle = `rgba(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, bl)}, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(q.pts[0][0], q.pts[0][1]);
        for (let i = 1; i < q.pts.length; i++) ctx.lineTo(q.pts[i][0], q.pts[i][1]);
        ctx.closePath();
        ctx.fill();
        // bright rim, which is what makes it read as ice rather than glass panes
        ctx.strokeStyle = `rgba(190, 240, 255, ${0.1 + k * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      // dissolve the base so the dome sits in the page rather than on it
      const fade = ctx.createLinearGradient(0, h * 0.5, 0, h);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const step = () => {
      if (!running) return;
      t += 0.004;
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
