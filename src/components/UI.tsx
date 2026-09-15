import Link from "next/link";
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
    <section id={id} className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {blurb && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{blurb}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <header className="border-b border-line px-6 pb-12 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink2 sm:text-base">{blurb}</p>
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
