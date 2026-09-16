"use client";

import { useState } from "react";

/** Copies a value and says so for a moment. Falls back quietly where the clipboard is blocked. */
export default function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      aria-label={`${label} ${value}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard unavailable, the value is still on screen */
        }
      }}
    >
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}
