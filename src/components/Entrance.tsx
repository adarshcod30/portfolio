"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./motion";

/**
 * The opening. A counter runs to 100 while the first paint settles, then the
 * curtain splits upward and the hero is already mid-reveal behind it.
 *
 * It shows once per session, not once per navigation, so clicking back to the
 * home page does not make someone sit through it again. Reduced motion skips it
 * entirely.
 */
export function Preloader() {
  const [done, setDone] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = true;
    try {
      seen = sessionStorage.getItem("entered") === "1";
    } catch {
      /* private window: just skip the intro rather than replaying it */
    }
    if (reduced || seen) return;

    setDone(false);
    document.body.style.overflow = "hidden";
    const started = performance.now();
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - started) / 1500);
      // ease-out so the count decelerates into 100 instead of running linearly
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem("entered", "1");
        } catch {
          /* nothing to do */
        }
        setTimeout(() => {
          document.body.style.overflow = "";
          setDone(true);
        }, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-6 text-bg sm:px-10 sm:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
            <span>Adarsh Dwivedi</span>
            <span>Jaipur, India</span>
          </div>

          <div className="flex items-end justify-between">
            <p className="font-display text-[15vw] font-semibold leading-[0.82] tracking-[-0.04em] sm:text-[11vw]">
              {n}
            </p>
            <p className="mb-3 max-w-[14ch] text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] opacity-70">
              AI &amp; Product Engineer
            </p>
          </div>

          <div className="h-px w-full bg-bg/25">
            <motion.div
              className="h-full bg-bg"
              style={{ width: `${n}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A dot that trails the pointer and swells over anything clickable. Only on
 * fine pointers, and it never intercepts events.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target as Element | null;
      const hot = !!t?.closest?.('a, button, [role="button"], input, summary');
      ring.current?.classList.toggle("is-hot", hot);
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
