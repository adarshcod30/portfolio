"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV, IDENTITY, CONTACT } from "@/content/site";
import { EASE, Magnetic } from "./motion";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    setTheme((document.documentElement.getAttribute("data-theme") as "light" | "dark") ?? "dark");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private window: the toggle still works for this visit */
    }
    setTheme(next);
  };
  return { theme, toggle };
}

function LocalTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: IDENTITY.timezone,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now || "--:--"}</span>;
}

function ThemeButton() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="group flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-3.5 backdrop-blur transition-colors hover:border-accent"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-accentsoft text-[10px] leading-none text-accent">
        {theme === "light" ? "◐" : "◑"}
      </span>
      <span className="eyebrow !text-ink2 transition-colors group-hover:!text-accent">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}

export function StatusStrip() {
  return (
    <div className="eyebrow">
      <span className="flex items-center gap-2 !text-accent">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {IDENTITY.available}
      </span>
      <span className="mt-2 block">
        {IDENTITY.location} <span className="opacity-40">/</span> <LocalTime /> IST
      </span>
    </div>
  );
}

/** Corner HUD: identity top left, routes top right, socials down the left edge. */
export function Hud() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  // GitHub is flagged primary for the contact page, but it belongs on the rail
  // more than anything else does, so pick these explicitly
  const RAIL = ["github", "hackerrank", "hackerearth", "kaggle", "pypi", "huggingface"];
  const socials = RAIL.map((id) => CONTACT.find((c) => c.id === id)).filter(
    (c): c is (typeof CONTACT)[number] => !!c?.href,
  );

  return (
    <>
      {/* scrim so the fixed HUD stays readable over whatever scrolls under it */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-bg via-bg/80 to-transparent"
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
        <Link
          href="/"
          className="hud-panel pointer-events-auto group !py-2.5 !px-3.5"
          aria-label={`${IDENTITY.name}, home`}
        >
          <span className="font-display block whitespace-nowrap text-[15px] leading-none tracking-tight sm:text-[17px]">
            Adarsh Dwivedi<span className="text-accent">.</span>
          </span>
          <span className="eyebrow mt-1 block">{IDENTITY.role}</span>
        </Link>

        <div className="hud-panel pointer-events-auto flex flex-col items-end gap-2.5">
          {/* the theme control sits above the links and names the current theme */}
          <ThemeButton />

          {/* labels share a right edge; only the open route is boxed */}
          <nav aria-label="Primary" className="hidden flex-col items-end gap-0.5 text-right md:flex">
            {NAV.map((n) => {
              const active =
                n.href === "/" ? path === "/" : path === n.href || path.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className="navlink"
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="eyebrow rounded-full border border-line bg-surface/70 px-3.5 py-2 backdrop-blur md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* social rail, pinned bottom-left like the reference sites */}
      <ul className="pointer-events-none fixed bottom-6 left-5 z-50 hidden flex-col gap-3 lg:flex">
        {socials.map((s) => (
          <li key={s.id} className="pointer-events-auto">
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="eyebrow block origin-left rotate-180 [writing-mode:vertical-rl] transition-colors hover:!text-accent"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-1 bg-bg px-6 md:hidden"
          >
            {NAV.map((n, i) => (
              <motion.div
                key={n.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.14 + i * 0.05, duration: 0.6, ease: EASE }}
              >
                <Link
                  href={n.href}
                  className="font-display block py-1.5 text-[11vw] leading-[1] tracking-tight hover:text-accent"
                >
                  {n.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-10">
              <StatusStrip />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Big pill link used for the primary calls to action. */
export function Cta({
  href,
  children,
  solid = false,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
}) {
  const cls = solid
    ? "bg-ink text-bg hover:bg-accent"
    : "border border-line text-ink hover:border-accent hover:text-accent";
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${cls}`}
      >
        {children}
        <span className="arrow">↗</span>
      </Link>
    </Magnetic>
  );
}
