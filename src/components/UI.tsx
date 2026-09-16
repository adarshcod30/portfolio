import Link from "next/link";
import { Reveal, SplitLine } from "./motion";
import type { Project } from "@/content/projects.generated";

export function Section({
  eyebrow,
  title,
  blurb,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} data-section={eyebrow ?? title} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-3">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="font-display text-[9vw] leading-[0.92] tracking-[-0.04em] sm:text-[4.2vw]">
            {title}
          </h2>
        </Reveal>
        {blurb && (
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{blurb}</p>
          </Reveal>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  blurb,
  index,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  index?: string;
}) {
  return (
    // data-section drives the fixed marker, so a reader always knows which
    // part of the site they are in
    <header
      data-section={eyebrow}
      className="clear-rail relative overflow-hidden border-b border-line px-5 pb-14 pt-32 sm:px-8 sm:pt-40 md:pr-48"
    >
      {/* a wash unique to each page, so the tabs do not all feel identical */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--cyan), transparent 68%)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3">
            {index && <span className="idx">{index}</span>}
            <span className="h-px w-8 bg-accent" aria-hidden />
            <span className="eyebrow !text-accent">{eyebrow}</span>
          </p>
        </Reveal>
        <h1 className="font-display mt-5 text-[12vw] leading-[0.88] tracking-[-0.05em] sm:text-[6vw]">
          <SplitLine text={title} delay={0.1} charDelay={0.02} />
        </h1>
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink2 sm:text-base">{blurb}</p>
        </Reveal>
      </div>
    </header>
  );
}

export function Stack({ items, max = 4 }: { items: string[]; max?: number }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
      {rest > 0 && <li className="chip">+{rest}</li>}
    </ul>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card group flex h-full flex-col p-5">
      <Link href={`/work/${p.slug}`} className="flex-1">
        <h3 className="text-base font-semibold tracking-tight group-hover:text-accent">
          {p.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{p.tagline}</p>
        {p.highlights[0] && (
          <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-ink2">
            {p.highlights[0]}
          </p>
        )}
      </Link>
      <div className="mt-4">
        <Stack items={p.stack} />
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-[11px]">
        <Link href={`/work/${p.slug}`} className="font-medium text-accent link-underline">
          Case study
        </Link>
        {p.code && (
          <a href={p.code} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">
            GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">
            Live
          </a>
        )}
      </div>
    </article>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface2 p-4 text-[13px] leading-relaxed text-ink2">
      {children}
    </div>
  );
}
