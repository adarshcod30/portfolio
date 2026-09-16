"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NAV } from "@/content/site";

type Slot = { el: HTMLElement; label: string; target: HTMLElement | null };

/** What a section is called on its button: an explicit title, else its heading. */
function titleOf(section: HTMLElement) {
  const own = section.getAttribute("data-section-title");
  if (own) return own;
  const h = section.querySelector<HTMLElement>("h2, h1");
  // innerText keeps a <br> as a break, so two lines do not run together
  const text = (h?.innerText || h?.textContent)?.replace(/\s+/g, " ").trim();
  return text || section.getAttribute("data-section") || "Next";
}

/**
 * A step button at the foot of every top-level section of a page.
 *
 * Pages are written as plain server components, so rather than threading a
 * prop through each one, this finds the page's own sections after render and
 * portals a button into the end of each. Every section points at the one after
 * it; the last one points at the next page in the navigation, so the whole site
 * can be walked start to finish with one button.
 */
export default function SectionSteps() {
  const path = usePathname();
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    let made: HTMLElement[] = [];
    const raf = requestAnimationFrame(() => {
      // pages sit inside a transition wrapper, so take every section or header
      // that is not itself nested in another one
      const sections = Array.from(
        main.querySelectorAll<HTMLElement>("section[data-section], header[data-section]"),
      ).filter((el) => !el.parentElement?.closest("[data-section]"));
      if (sections.length === 0) return;
      const next: Slot[] = sections.flatMap((sec, i) => {
        // a section that already carries its own call to action (the home hero)
        // or is only a band between sections opts out with data-section-step="off"
        if (sec.getAttribute("data-section-step") === "off") return [];
        const holder = document.createElement("div");
        holder.className = "sectstep-holder";
        sec.appendChild(holder);
        made.push(holder);
        const after = sections[i + 1] ?? null;
        return [{ el: holder, label: after ? titleOf(after) : "", target: after }];
      });
      setSlots(next);
    });
    return () => {
      cancelAnimationFrame(raf);
      made.forEach((m) => m.remove());
      made = [];
      setSlots([]);
    };
  }, [path]);

  const i = NAV.findIndex((n) => (n.href === "/" ? path === "/" : path === n.href));
  const nextPage = i >= 0 ? NAV[(i + 1) % NAV.length] : null;

  return (
    <>
      {slots.map((s, k) =>
        createPortal(
          s.target ? (
            <button
              type="button"
              className="sectstep"
              onClick={() => {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                s.target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
              }}
            >
              <span className="sectstep__kicker">Next</span>
              <span className="sectstep__label">{s.label}</span>
              <span className="sectstep__arrow" aria-hidden>
                ↓
              </span>
            </button>
          ) : nextPage ? (
            <Link href={nextPage.href} className="sectstep sectstep--page">
              <span className="sectstep__kicker">{i === NAV.length - 1 ? "Back to" : "Next page"}</span>
              <span className="sectstep__label">{nextPage.label}</span>
              <span className="sectstep__arrow" aria-hidden>
                →
              </span>
            </Link>
          ) : null,
          s.el,
          `${path}-${k}`,
        ),
      )}
    </>
  );
}
