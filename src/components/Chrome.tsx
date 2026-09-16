"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV, IDENTITY } from "@/content/site";
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
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={`Dark theme ${dark ? "on" : "off"}`}
      className="themeswitch group"
      data-dark={dark || undefined}
    >
      <span className="themeswitch__track" aria-hidden>
        <span className="themeswitch__icon themeswitch__icon--sun">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </span>
        <span className="themeswitch__icon themeswitch__icon--moon">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
          </svg>
        </span>
        <span className="themeswitch__knob" />
      </span>
      <span className="themeswitch__text">{dark ? "Dark" : "Light"}</span>
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

/**
 * Corner HUD.
 *
 * Only two things are pinned: the wordmark, and a chip naming the route you are
 * on. The full list of routes sits at the top of the page and scrolls away like
 * any other content, so it is not permanently occupying a corner. The chip fades
 * in once the list has gone, so the current route is never shown twice.
 */
export function Hud() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);
  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
  const current = NAV.find((n) => isActive(n.href));
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-bg via-bg/80 to-transparent"
      />

      {/* pinned: the name */}
      <div className="fixed left-5 top-5 z-50 sm:left-8 sm:top-7">
        <Link href="/" className="group block" aria-label={`${IDENTITY.name}, home`}>
          <span className="font-display block whitespace-nowrap text-[15px] leading-none tracking-tight sm:text-[17px]">
            Adarsh Dwivedi<span className="text-accent">.</span>
          </span>
          <span className="eyebrow mt-1 block">{IDENTITY.role}</span>
        </Link>
      </div>

      {/* pinned: where you are, once the list has scrolled off */}
      <div
        className={`fixed right-[6px] top-5 z-50 transition-opacity duration-500 sm:right-[18px] sm:top-7 ${
          past && current ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {current && (
          <Link href={current.href} aria-current="page" className="navchip">
            <span className="navchip__dot" aria-hidden />
            <span className="navitem__idx">{String(NAV.indexOf(current) + 1).padStart(2, "0")}</span>
            <span>{current.label}</span>
          </Link>
        )}
      </div>

      {/* in the page, so it scrolls away: the route bar, centred at the top.
          Once it has gone, the pinned chip on the right names the current page */}
      <nav
        aria-label="Primary"
        className="navbar absolute left-1/2 top-5 z-40 hidden -translate-x-1/2 lg:flex sm:top-7"
      >
        {NAV.map((n, i) => {
          const on = isActive(n.href);
          return (
            <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined} className="navitem">
              {on && (
                <motion.span
                  layoutId="navitem-active"
                  className="navitem__bg"
                  transition={{ duration: 0.5, ease: EASE }}
                  aria-hidden
                />
              )}
              <span className="navitem__idx hidden xl:inline">{String(i + 1).padStart(2, "0")}</span>
              <span className="navitem__label">{n.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* also scrolls away: the theme switch, and the menu button on small screens */}
      <div className="absolute right-5 top-5 z-40 flex flex-col items-end gap-3 sm:right-8 sm:top-7">
        <ThemeButton />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="eyebrow rounded-full border border-line bg-surface/70 px-3.5 py-2 backdrop-blur lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-1 bg-bg px-6 lg:hidden"
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
