"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects.generated";

/**
 * A pinned section whose contents move sideways as the page scrolls.
 *
 * This is the one place the site breaks out of vertical reading, and it is
 * where the tall project panels live. On a narrow screen it degrades to an
 * ordinary swipeable row, because pinning on touch fights the browser.
 */
export function HorizontalWork({ items }: { items: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // travel enough to bring the last panel fully into view
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);

  return (
    <>
      {/* desktop: pinned, moves sideways */}
      <div ref={ref} className="relative hidden h-[420vh] lg:block" data-section="Work">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="px-8 md:pr-48">
            <p className="eyebrow">Selected work</p>
            <h2 className="font-display mt-2 text-[4.6vw] leading-[0.95] tracking-[-0.04em]">
              Twenty-six shipped<span className="text-accent">.</span>
            </h2>
          </div>
          <motion.ul style={{ x }} className="mt-10 flex gap-6 pl-8 will-change-transform">
            {items.map((p, i) => (
              <li key={p.slug} className="w-[30vw] shrink-0">
                <Panel p={p} i={i} />
              </li>
            ))}
            <li className="flex w-[26vw] shrink-0 items-center">
              <Link
                href="/work"
                className="group font-display text-[2.4vw] leading-tight tracking-tight hover:text-accent"
              >
                All 26
                <br />
                projects <span className="arrow">↗</span>
              </Link>
            </li>
          </motion.ul>
        </div>
      </div>

      {/* touch: a plain scroll-snapping row */}
      <div className="lg:hidden" data-section="Work">
        <div className="px-5">
          <p className="eyebrow">Selected work</p>
          <h2 className="font-display mt-2 text-[11vw] leading-[0.92] tracking-[-0.04em]">
            Twenty-six shipped<span className="text-accent">.</span>
          </h2>
        </div>
        <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
          {items.map((p, i) => (
            <li key={p.slug} className="w-[74vw] shrink-0 snap-start">
              <Panel p={p} i={i} />
            </li>
          ))}
        </ul>
        <div className="px-5">
          <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
            All 26 projects <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function Panel({ p, i }: { p: Project; i: number }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <span className="panel block aspect-[3/4] overflow-hidden">
        {p.shot ? (
          <Image
            src={p.shot}
            alt={`${p.name} running: ${p.tagline}.`}
            width={1080}
            height={1440}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <span className="grid h-full w-full place-items-center bg-accentsoft px-6">
            <span className="font-display text-center text-3xl tracking-tight text-accent opacity-60">
              {p.name}
            </span>
          </span>
        )}
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-3">
        <span>
          <span className="idx">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display mt-1 block text-xl leading-tight tracking-tight transition-colors group-hover:text-accent">
            {p.name}
          </span>
          <span className="mt-1 block text-xs text-muted">{p.tagline}</span>
        </span>
        <span className="arrow text-muted group-hover:text-accent">↗</span>
      </span>
    </Link>
  );
}

/**
 * Fixed marker telling you which section you are in, because a long dark page
 * with full-bleed sections gives no other cue. Reads `data-section` off
 * whatever is currently crossing the middle of the viewport.
 */
export function SectionMarker() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!nodes.length) return;
    const pick = () => {
      const mid = window.innerHeight / 2;
      let best: { d: number; name: string } | null = null;
      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const d = Math.abs(r.top + r.height / 2 - mid);
        const name = n.dataset.section || "";
        // the hero needs no label: the wordmark and the headline already say it,
        // and the chip collided with the stats row
        if (name === "Home") continue;
        if (!best || d < best.d) best = { d, name };
      }
      setLabel(best?.name ?? "");
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 hidden sm:block">
      <motion.span
        key={label}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: label ? 1 : 0, y: 0 }}
        transition={{ duration: 0.4 }}
        className="eyebrow rounded-full border border-line bg-surface/80 px-4 py-2 backdrop-blur"
      >
        {label || " "}
      </motion.span>
    </div>
  );
}
