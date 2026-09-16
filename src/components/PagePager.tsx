"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/site";

/**
 * Previous page at the left edge, next page at the right edge, as two small
 * pills at the very end of each page in the navigation. Every page gets both:
 * the order wraps, so Home points back to Contact and Contact on to Home.
 * Case studies carry their own previous and next project, so they get nothing.
 */
export default function PagePager() {
  const path = usePathname();
  const i = NAV.findIndex((n) => (n.href === "/" ? path === "/" : path === n.href));
  if (i < 0) return null;
  const prev = NAV[(i - 1 + NAV.length) % NAV.length];
  const next = NAV[(i + 1) % NAV.length];

  return (
    <nav aria-label="Page" className="pager">
      <Link href={prev.href} className="pager__link pager__link--prev" aria-label={`Previous page: ${prev.label}`}>
        <span className="pager__arrow" aria-hidden>
          ←
        </span>
        <span className="pager__kicker">Prev</span>
        <span className="pager__label">{prev.label}</span>
      </Link>
      <Link href={next.href} className="pager__link pager__link--next" aria-label={`Next page: ${next.label}`}>
        <span className="pager__kicker">Next</span>
        <span className="pager__label">{next.label}</span>
        <span className="pager__arrow" aria-hidden>
          →
        </span>
      </Link>
    </nav>
  );
}
