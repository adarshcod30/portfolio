"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EASE } from "./motion";
import { RESUMES } from "@/content/resumes.generated";

const GROUP_ORDER = ["AI and agents", "Machine learning", "Engineering", "Product and analytics"];

/**
 * The resume, one click from wherever someone decides to ask for it.
 *
 * There are fourteen, one per role, so a single download link would hand
 * everyone the wrong one. This opens a picker grouped by the kind of team
 * hiring, and each role opens its own PDF. Rendered through a portal because
 * the closing block clips its overflow and would cut the panel off.
 */
export default function ResumePicker({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focus = requestAnimationFrame(() => closeBtn.current?.focus());
    const btn = trigger.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(focus);
      btn?.focus();
    };
  }, [open]);

  const groups = GROUP_ORDER.map((g) => ({ g, items: RESUMES.filter((r) => r.group === g) })).filter(
    (x) => x.items.length,
  );
  let n = 0;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`resume-trigger group ${className}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
        Resume
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="resume-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="resume-title"
                  className="resume-panel"
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="resume-panel__glow" aria-hidden />
                  <div className="relative flex items-start justify-between gap-6">
                    <div>
                      <p className="resume-eyebrow">Resume</p>
                      <h2 id="resume-title" className="resume-title">
                        Pick the role you are hiring for<span>.</span>
                      </h2>
                      <p className="resume-sub">
                        {RESUMES.length} one-page resumes, each generated from the same set of facts
                        this site is built on.
                      </p>
                    </div>
                    <button
                      ref={closeBtn}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="resume-close"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </div>

                  <div className="resume-groups">
                    {groups.map(({ g, items }) => (
                      <section key={g}>
                        <p className="resume-group">{g}</p>
                        <ul className="resume-list">
                          {items.map((r) => {
                            const i = n++;
                            return (
                              <motion.li
                                key={r.file}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + i * 0.025, duration: 0.45, ease: EASE }}
                              >
                                <a
                                  href={`/resume/${r.file}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="resume-role group"
                                >
                                  <span className="resume-role__name">{r.label}</span>
                                  <span className="resume-role__meta">
                                    PDF · {r.kb} KB
                                    <span className="arrow">↗</span>
                                  </span>
                                </a>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </section>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
