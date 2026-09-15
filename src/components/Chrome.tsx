"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, IDENTITY } from "@/content/site";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const el = document.documentElement;
    setTheme((el.getAttribute("data-theme") as "light" | "dark") ?? "light");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private window, or site data blocked: the toggle still works for this visit */
    }
    setTheme(next);
  };
  return { theme, toggle };
}

/** Local time in Jaipur, so a recruiter abroad knows whether they are about to call at 3am. */
function LocalTime() {
  const [now, setNow] = useState<string>("");
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
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  return (
    <span className="tabular-nums">
      {now} <span className="text-muted">IST</span>
    </span>
  );
}

export function StatusStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-wide text-ink2">
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {IDENTITY.available}
      </span>
      <span className="text-line">/</span>
      <span>{IDENTITY.location}</span>
      <span className="text-line">/</span>
      <LocalTime />
    </div>
  );
}

export function SideRail() {
  const path = usePathname();
  const { theme, toggle } = useTheme();
  return (
    <nav
      aria-label="Primary"
      className="fixed left-0 top-0 z-40 hidden h-full w-14 flex-col items-center justify-between border-r border-line bg-surface/70 py-6 backdrop-blur lg:flex"
    >
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-accent"
        aria-label="Home"
      >
        A<span className="text-ink">D</span>
      </Link>

      <ul className="flex flex-col items-center gap-7">
        {NAV.filter((n) => n.href !== "/").map((n) => {
          const active = path === n.href || path.startsWith(n.href + "/");
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`[writing-mode:vertical-rl] rotate-180 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        className="rounded-md border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {theme === "light" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
          </svg>
        )}
      </button>
    </nav>
  );
}

export function TopBar() {
  const path = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/" className="font-semibold tracking-tight text-accent">
          A<span className="text-ink">D</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="rounded-md border border-line p-2 text-muted"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="rounded-md border border-line px-3 py-1.5 text-xs uppercase tracking-widest text-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <ul className="border-t border-line px-5 pb-4 pt-2">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="block py-2 text-sm text-ink2 hover:text-accent"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
