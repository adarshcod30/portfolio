"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { EASE } from "@/components/motion";
import { DOMAINS, PROJECTS, type Project } from "@/content/projects.generated";

type View = "full" | "grid";

/** Tile labels. The full domain title is shown in the line beneath. */
const SHORT: Record<string, string> = {
  "public-interest": "Public interest",
  health: "Clinical",
  trust: "Trust",
  agents: "Agents",
  data: "Data",
  systems: "Systems",
};

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
  const current = DOMAINS.find((d) => d.id === domain);
  const tiles = [
    { id: "all", short: "All", n: PROJECTS.length },
    ...DOMAINS.map((d) => ({
      id: d.id as string,
      short: SHORT[d.id] ?? d.title,
      n: PROJECTS.filter((p) => p.domain === d.id).length,
    })),
  ];

  // the domain tiles on the home page link here as /work#<domain>, which used
  // to land on All every time because nothing read the hash
  const pick = (id: string) => {
    setDomain(id);
    history.replaceState(null, "", id === "all" ? "/work" : `/work#${id}`);
  };
  useEffect(() => {
    const sync = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      setDomain(DOMAINS.some((d) => d.id === h) ? h : "all");
    };
    const raf = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  return (
    <>
      {/* sticky control bar */}
      {/* docks below the pinned wordmark rather than sliding underneath it */}
      <div className="sticky top-[64px] z-30 border-y border-line bg-bg/88 backdrop-blur-md sm:top-[76px]">
        <div className="mx-auto max-w-6xl px-5 pb-3 pt-4 sm:px-8">
          {/* One tile per domain, each carrying its count and its share of the
              whole as a bar, so the filter doubles as a picture of where the
              work sits. Scrolls sideways on narrow screens rather than
              wrapping into two ragged lines. */}
          <div
            role="tablist"
            aria-label="Filter by domain"
            className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0"
          >
            {tiles.map((t) => {
              const active = domain === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => pick(t.id)}
                  className={`domtile group ${active ? "is-active" : ""}`}
                >
                  {active && (
                    <motion.span
                      layoutId="domtile"
                      className="domtile__bg"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="domtile__n">{String(t.n).padStart(2, "0")}</span>
                  <span className="domtile__label">{t.short}</span>
                  <span className="domtile__track" aria-hidden>
                    <motion.span
                      className="domtile__fill"
                      initial={false}
                      animate={{ width: `${(t.n / PROJECTS.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={domain}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="min-w-0 flex-1 truncate text-[13px] text-muted"
              >
                <span className="text-ink">
                  Showing <span className="font-semibold text-accent">{shown.length}</span> of{" "}
                  {PROJECTS.length}
                </span>
                <span className="opacity-40">{"  ·  "}</span>
                {current ? (
                  <>
                    <span className="text-ink2">{current.title}.</span> {current.blurb}
                  </>
                ) : (
                  "Every project, across all six domains."
                )}
              </motion.p>
            </AnimatePresence>

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
                  className={`eyebrow relative flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors ${
                    view === v ? "bg-ink !text-bg" : "hover:!text-ink"
                  }`}
                >
                  {view === v && (
                    <motion.span
                      layoutId="viewpill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  <svg className="relative" width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    {v === "full" ? (
                      <g fill="currentColor">
                        <rect x="0" y="1" width="12" height="2" rx="1" />
                        <rect x="0" y="5" width="12" height="2" rx="1" />
                        <rect x="0" y="9" width="12" height="2" rx="1" />
                      </g>
                    ) : (
                      <g fill="currentColor">
                        <rect x="0" y="0" width="5" height="5" rx="1" />
                        <rect x="7" y="0" width="5" height="5" rx="1" />
                        <rect x="0" y="7" width="5" height="5" rx="1" />
                        <rect x="7" y="7" width="5" height="5" rx="1" />
                      </g>
                    )}
                  </svg>
                  <span className="relative">{v}</span>
                </button>
              ))}
            </div>
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
        className="tile group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-7 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-8 sm:py-8"
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
        {p.shot ? (
          <span className="hidden h-20 w-36 shrink-0 overflow-hidden rounded-lg border border-line sm:block">
            <Image
              src={p.shot}
              alt=""
              width={720}
              height={450}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </span>
        ) : (
          <span className="hidden sm:block sm:w-36" aria-hidden />
        )}
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
      <Link href={`/work/${p.slug}`} className="card tile group flex h-full flex-col overflow-hidden">
        {p.shot ? (
          <span className="block aspect-[16/10] overflow-hidden border-b border-line bg-surface2">
            <Image
              src={p.shot}
              alt=""
              width={1080}
              height={675}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </span>
        ) : (
          // no live deployment to capture, so the slot carries the name instead
          // of an empty grey rectangle
          <span
            className="grid aspect-[16/10] place-items-center overflow-hidden border-b border-line bg-accentsoft px-4"
            aria-hidden
          >
            <span className="font-display truncate text-center text-2xl tracking-tight text-accent opacity-45">
              {p.name}
            </span>
          </span>
        )}
        <span className="flex flex-1 flex-col p-5">
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
        </span>
      </Link>
    </motion.li>
  );
}
