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

  const RAIL = ["github", "hackerrank", "hackerearth", "kaggle", "pypi", "huggingface"];
  const socials = RAIL.map((id) => CONTACT.find((c) => c.id === id)).filter(
    (c): c is (typeof CONTACT)[number] => !!c?.href,
  );

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
          <Link href={current.href} aria-current="page" className="navlink">
            {current.label}
          </Link>
        )}
      </div>

      {/* in the page, so it scrolls away: theme control and the full list */}
      <div className="absolute right-5 top-5 z-40 flex flex-col items-end gap-3 sm:right-8 sm:top-7">
        <ThemeButton />

        <nav aria-label="Primary" className="-mr-3.5 hidden flex-col items-end gap-0.5 text-right md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="navlink"
            >
              {n.label}
            </Link>
          ))}
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

      {/* social rail: sits in the page under the wordmark and scrolls away with
          the rest of the top matter, rather than following you down the page */}
      <ul className="socialrail absolute left-8 top-[92px] z-40 hidden flex-col lg:flex">
        {socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="railchev"
              aria-label={`${s.label} profile`}
            >
              <svg
                className="railchev__edge"
                viewBox="0 0 32 96"
                aria-hidden="true"
                focusable="false"
              >
                <polygon points="0.6,13.4 16,0.6 31.4,13.4 31.4,95.4 16,82.6 0.6,95.4" />
              </svg>
              <span className="railchev__label">{s.label}</span>
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
