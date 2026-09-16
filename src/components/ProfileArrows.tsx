"use client";

import { useState } from "react";
import { Stagger, StagItem } from "./motion";
import { BrandIcon, BRANDS } from "./Icons";
import { CONTACT } from "@/content/site";

/**
 * The profiles on the contact page, as a chain of arrows pointing right. They
 * split into two rows, and every arrow grows to fill its row, so both rows run
 * the same length however the count divides. Discord has no public profile URL,
 * so its arrow copies the username instead of linking.
 */
export default function ProfileArrows() {
  const items = CONTACT.filter((c) => c.kind !== "direct");
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className="arrows">
      {rows.map((row, r) => (
        <Stagger key={r} className="arrows__row" gap={0.05}>
          {row.map((b) => {
            const style = { "--brand": BRANDS[b.icon]?.color ?? "var(--ink)" } as React.CSSProperties;
            const inner = (
              <>
                <span className="arrow-chip__icon">
                  <BrandIcon id={b.icon} size={18} />
                </span>
                <span className="arrow-chip__text">
                  <span className="arrow-chip__label">{b.label}</span>
                  <span className="arrow-chip__value">{b.value}</span>
                </span>
              </>
            );
            return (
              <StagItem key={b.id} className="arrows__cell">
                {b.href ? (
                  <a href={b.href} target="_blank" rel="noreferrer" className="arrow-chip" style={style} aria-label={`${b.label}: ${b.value}`}>
                    {inner}
                  </a>
                ) : (
                  <CopyArrow value={b.value} label={b.label} style={style}>
                    {inner}
                  </CopyArrow>
                )}
              </StagItem>
            );
          })}
        </Stagger>
      ))}
    </div>
  );
}

function CopyArrow({
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
      className="arrow-chip"
      style={style}
      data-copied={done || undefined}
      aria-label={`Copy ${label} username ${value}`}
      title={done ? "Copied" : "Click to copy"}
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
