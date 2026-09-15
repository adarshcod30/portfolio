"use client";

import { useEffect, useRef } from "react";

/**
 * The single moving thing on the site.
 *
 * A drifting node-and-edge field, because the work underneath it is mostly graphs:
 * link analysis in Kadi, densest-subgraph peeling in Orbweaver, routing in the graph
 * suite. Canvas 2D rather than WebGL, so it costs a few KB instead of a few hundred,
 * and it stops entirely when the tab is hidden, the section scrolls away, or the
 * visitor has asked for reduced motion.
 */
export default function NodeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const read = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const seed = () => {
      // density scales with area, capped so a big monitor does not melt
      const count = Math.min(70, Math.round((w * h) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.9 + 1.1,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let t = 0;

    const draw = () => {
      const accent = read("--accent-fill", "#1d76db");
      const cyan = read("--cyan", "#22d3ee");
      ctx.clearRect(0, 0, w, h);

      // soft wash so the field reads as one object rather than scattered dots
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const a1 = dark ? "26" : "3d";
      const a2 = dark ? "14" : "24";
      const cx = w * (0.68 + Math.sin(t * 0.00013) * 0.05);
      const cy = h * (0.34 + Math.cos(t * 0.00017) * 0.06);
      const wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.78);
      wash.addColorStop(0, `${cyan}${a1}`);
      wash.addColorStop(0.42, `${accent}${a2}`);
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      const LINK = 132;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.34;
          ctx.strokeStyle = accent;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.r > 2.4 ? cyan : accent;
        ctx.globalAlpha = 0.72;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      if (!running) return;
      t += 16;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    if (reduced) {
      draw(); // one static frame: the composition, none of the motion
    } else {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      if (reduced) draw();
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

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
