"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EASE } from "@/components/motion";
import { DOMAINS, PROJECTS, type Project } from "@/content/projects.generated";

type View = "full" | "grid";

/**
 * The work index. Two views, because they answer different questions: FULL is for
 * reading down the list, GRID is for scanning it. The toggle is lifted from
 * JoBenEtuk, which is the one idea on that site worth taking.
 */
export default function WorkBrowser() {
  const [view, setView] = useState<View>("full");
  const [domain, setDomain] = useState<string>("all");

  const shown = useMemo(
    () => (domain === "all" ? PROJECTS : PROJECTS.filter((p) => p.domain === domain)),
    [domain],
  );

  return (
    <>
      {/* sticky control bar */}
      <div className="sticky top-0 z-30 border-y border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <FilterChip active={domain === "all"} onClick={() => setDomain("all")}>
              All <span className="opacity-50">{PROJECTS.length}</span>
            </FilterChip>
            {DOMAINS.map((d) => {
              const n = PROJECTS.filter((p) => p.domain === d.id).length;
              return (
                <FilterChip
                  key={d.id}
                  active={domain === d.id}
                  onClick={() => setDomain(d.id)}
                >
                  {d.title} <span className="opacity-50">{n}</span>
                </FilterChip>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="Layout"
            className="flex shrink-0 items-center rounded-full border border-line p-0.5"
          >
            {(["full", "grid"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`eyebrow relative rounded-full px-3 py-1.5 transition-colors ${
                  view === v ? "!text-bg" : "hover:!text-ink"
                }`}
              >
                {view === v && (
                  <motion.span
                    layoutId="viewpill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative">{v}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${domain}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {view === "full" ? (
              <ul className="border-t border-line">
                {shown.map((p, i) => (
                  <FullRow key={p.slug} p={p} i={i} />
                ))}
              </ul>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p, i) => (
                  <GridCard key={p.slug} p={p} i={i} />
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`eyebrow rounded-full px-3 py-1.5 transition-colors ${
        active ? "!text-accent" : "hover:!text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function FullRow({ p, i }: { p: Project; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035, ease: EASE }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="tile group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-7 sm:gap-8 sm:py-8"
      >
        <span className="idx">{String(i + 1).padStart(2, "0")}</span>
        <span>
          <span className="font-display block text-xl leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
            {p.name}
          </span>
          <span className="mt-1.5 block text-xs text-muted sm:text-sm">{p.tagline}</span>
          <span className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
            {p.stack.slice(0, 5).map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </span>
        </span>
        <span className="arrow text-lg text-muted group-hover:text-accent sm:text-2xl">↗</span>
      </Link>
    </motion.li>
  );
}

function GridCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: Math.min(i, 8) * 0.03, ease: EASE }}
    >
      <Link href={`/work/${p.slug}`} className="card tile group flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="idx">{String(i + 1).padStart(2, "0")}</span>
          <span className="arrow text-muted group-hover:text-accent">↗</span>
        </div>
        <h3 className="font-display mt-4 text-lg leading-tight tracking-tight group-hover:text-accent">
          {p.name}
        </h3>
        <p className="mt-1.5 text-xs text-muted">{p.tagline}</p>
        <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink2">
          {p.highlights[0]}
        </p>
        <span className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </span>
      </Link>
    </motion.li>
  );
}
