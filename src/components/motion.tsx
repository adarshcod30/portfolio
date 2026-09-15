"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/* The easing everything on this site shares. Long, heavy, slightly overshooting
   at the end, which is what the reference sites all feel like. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Wipe-up reveal driven by clip-path, so text arrives from behind a hard edge. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Children arrive one after another rather than all at once. */
export function Stagger({
  children,
  className,
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  };
  return (
    <motion.div
      ref={ref}
      variants={parent}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const stagItem: Variants = {
  hidden: { y: 26, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
};

export function StagItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={stagItem} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Per-character reveal for the display type. Characters are masked by an
 * overflow-hidden line box and pushed up individually, which is the move the
 * awarded sites use on their hero headline.
 */
export function SplitLine({
  text,
  className,
  delay = 0,
  charDelay = 0.028,
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}) {
  // Split by word first, then by character. If every character were its own
  // inline-block, the spaces between words would be inline-blocks too and the
  // line would have no break opportunity, so a long headline overflows its
  // overflow-hidden box and gets clipped instead of wrapping.
  const words = text.split(" ");
  let n = 0;
  return (
    <span className={`block ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap overflow-hidden align-bottom">
            {Array.from(word).map((c, ci) => {
              const i = n++;
              return (
                <motion.span
                  key={`${wi}-${ci}`}
                  className="inline-block will-change-transform"
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.05, delay: delay + i * charDelay, ease: EASE }}
                >
                  {c}
                </motion.span>
              );
            })}
            {wi < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Button that leans toward the cursor. Pointer-fine only, so touch is untouched. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      onPointerMove={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${
          (e.clientY - (r.top + r.height / 2)) * strength
        }px)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: "transform .45s cubic-bezier(.16,1,.3,1)" }}
    >
      {children}
    </motion.span>
  );
}

/** Seamless ticker. Two copies, one translation, no JS per frame. */
export function Marquee({
  items,
  speed = 38,
  className,
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const run = [...items, ...items];
  return (
    <div className={`marquee ${className ?? ""}`} aria-hidden>
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {run.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
            <span className="marquee__dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Thin progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}

/** Gentle parallax for media inside a scrolling section. */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Counts up once, when it first comes into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="tabular-nums">
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {inView ? <Ticker to={to} /> : 0}
      </motion.span>
      {suffix}
    </span>
  );
}

function Ticker({ to }: { to: number }) {
  const mv = useSpring(0, { stiffness: 60, damping: 18 });
  mv.set(to);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  return <motion.span>{rounded}</motion.span>;
}
