"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./motion";

/**
 * The stack, one group at a time.
 *
 * A marquee slid the same twelve names past forever and said nothing about how
 * they fit together. This holds one layer of the stack, lets you read it, then
 * swaps the whole set out for the next one. Groups come from the skills block in
 * profile.json, so nothing here is claimed that the resumes do not also claim.
 */
const GROUPS = [
  {
    name: "Agents and LLMs",
    items: ["LangGraph", "LangChain", "MCP", "Amazon Bedrock", "Aegra", "Agent Protocol", "Playwright MCP", "Human-in-the-loop"],
  },
  {
    name: "Machine learning",
    items: ["Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Optuna", "SHAP", "Pandas", "NumPy"],
  },
  {
    name: "Deep learning",
    items: ["PyTorch", "TensorFlow", "Keras", "Transformers", "OpenCV", "ResNet50", "EfficientNetV2", "Grad-CAM"],
  },
  {
    name: "Backend and data",
    items: ["FastAPI", "Pydantic", "PostgreSQL", "MongoDB", "DuckDB", "Redis", "Node.js", "Express"],
  },
  {
    name: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite", "Recharts", "MapLibre GL", "Streamlit"],
  },
  {
    name: "Ship and run",
    items: ["AWS", "Google Cloud Run", "Vercel", "Render", "GitHub Actions", "Docker", "Linux", "Git"],
  },
] as const;

const HOLD = 4000;

export default function Stack() {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // only run while it is on screen and the tab is in front, and never for
  // someone who has asked the system for less motion
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = false;
    const sync = () => setLive(onScreen && !document.hidden);
    const io = new IntersectionObserver((e) => {
      onScreen = e[0].isIntersecting;
      sync();
    }, { threshold: 0.25 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setI((v) => (v + 1) % GROUPS.length), HOLD);
    return () => clearInterval(id);
  }, [live]);

  const g = GROUPS[i];

  return (
    <section
      ref={ref}
      data-section="Stack"
      aria-label="Technology stack"
      className="border-y border-line px-5 py-11 sm:px-8 sm:py-14"
    >
      <div className="mx-auto max-w-6xl">
        {/* label and group name share one line, which hands the whole width to
            the names below. Sharing a row with them forced the longer groups
            onto a second line that carried one word and read as a hole. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="eyebrow">
            Stack <span className="opacity-40">/</span> {String(i + 1).padStart(2, "0")} of{" "}
            {String(GROUPS.length).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={g.name}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0, transition: { duration: 0.3, ease: EASE } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-lg leading-none tracking-tight text-accent"
            >
              {g.name}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* One line from md up, spread edge to edge. The size is tied to the
            viewport rather than stepped at breakpoints: the longest group needs
            941px of the 960 available at 1024, so a fixed 20px would have run off
            the side anywhere between md and lg. */}
        <div className="mt-7 min-h-[112px] sm:min-h-[64px] md:min-h-[32px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={g.name}
              className="flex flex-wrap justify-between gap-x-5 gap-y-3 md:flex-nowrap"
            >
              {g.items.map((t, n) => (
                <motion.li
                  key={t}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0, transition: { delay: n * 0.025, duration: 0.3 } }}
                  transition={{ delay: n * 0.05, duration: 0.55, ease: EASE }}
                  className="font-display whitespace-nowrap text-[15px] font-bold leading-none tracking-tight text-ink md:text-[clamp(13px,1.55vw,21px)]"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* how long until the set changes */}
      <div className="mx-auto mt-7 h-px max-w-6xl bg-line">
        <motion.div
          key={i}
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: live ? "100%" : "0%" }}
          transition={{ duration: HOLD / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
