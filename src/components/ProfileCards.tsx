"use client";

import { useState } from "react";
import { Reveal } from "./motion";
import { BrandIcon, BRANDS } from "./Icons";
import { CONTACT } from "@/content/site";

/**
 * Work and social profiles as a row of hanging chevrons: brand mark at the top,
 * the name running down the banner. At rest each one is an outline with the
 * mark in its own colour; on hover the banner fills with a tint of that colour
 * and lifts. A line with no public URL (Discord) copies its username instead.
 */
export default function ProfileCards({ compact = false }: { compact?: boolean }) {
  const items = CONTACT.filter((c) => c.kind !== "direct");
  const w = compact ? 40 : 64;
  const h = compact ? 132 : 208;
  const notch = compact ? 14 : 20;
  // the banner's own outline, so the border survives the chevron shape
  const points = `0.6,${notch} ${w / 2},0.6 ${w - 0.6},${notch} ${w - 0.6},${h - 0.6} ${w / 2},${h - notch} 0.6,${h - 0.6}`;

  return (
    <ul className={`chevrow ${compact ? "chevrow--compact" : ""}`}>
      {items.map((b, i) => {
        const brand = BRANDS[b.icon]?.color ?? null;
        const style = { "--brand": brand ?? "var(--ink)" } as React.CSSProperties;
        const inner = (
          <>
            <svg className="chevban__edge" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden focusable="false">
              <polygon points={points} vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="chevban__icon">
              <BrandIcon id={b.icon} size={compact ? 15 : 22} />
            </span>
            <span className="chevban__label">{b.label}</span>
          </>
        );
        return (
          <li key={b.id}>
            <Reveal delay={0.04 + i * 0.03}>
              {b.href ? (
                <a
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="chevban"
                  style={{ ...style, width: w, height: h }}
                  aria-label={`${b.label}: ${b.value}`}
                  title={`${b.value} · ${b.note}`}
                >
                  {inner}
                </a>
              ) : (
                <CopyChevron value={b.value} label={b.label} style={{ ...style, width: w, height: h }}>
                  {inner}
                </CopyChevron>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

function CopyChevron({
  value,
  label,
  style,
  children,
}: {
  value: string;
  label: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="chevban"
      style={style}
      aria-label={`Copy ${label} username ${value}`}
      title={done ? "Copied" : `${value} · click to copy`}
      data-copied={done || undefined}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {children}
    </button>
  );
}
