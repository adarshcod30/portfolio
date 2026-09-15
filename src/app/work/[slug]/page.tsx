import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const domain = DOMAINS.find((d) => d.id === p.domain);
  const siblings = PROJECTS.filter((x) => x.domain === p.domain && x.slug !== p.slug).slice(0, 3);
  const [problem, ...rest] = p.highlights;

  return (
    <article>
      <header className="border-b border-line px-6 pb-12 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <Link href="/work" className="hover:text-accent">Work</Link>
            <span>/</span>
            {domain && (
              <Link href={`/work#${domain.id}`} className="hover:text-accent">
                {domain.title}
              </Link>
            )}
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{p.name}</h1>
          <p className="mt-3 text-base text-ink2 sm:text-lg">{p.tagline}</p>
          {p.note && <p className="mt-2 text-sm text-muted">{p.note}</p>}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Open the live build
              </a>
            )}
            {p.code && (
              <a
                href={p.code}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                Read the source
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-3xl">
          {problem && (
            <>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                The problem
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink sm:text-xl">{problem}</p>
            </>
          )}

          {rest.length > 0 && (
            <>
              <h2 className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                How it works, and what it cost
              </h2>
              <ul className="mt-5 space-y-5">
                {rest.map((h, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-2 h-px w-6 shrink-0 bg-accent" aria-hidden />
                    <p className="text-[15px] leading-relaxed text-ink2">{h}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Built with
          </h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {siblings.length > 0 && (
        <section className="border-t border-line px-6 py-14 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-sm font-semibold tracking-tight">
              More in {domain?.title.toLowerCase()}
            </h2>
            <ul className="mt-5 divide-y divide-line">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/work/${s.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-sm font-medium group-hover:text-accent">{s.name}</span>
                    <span className="hidden text-xs text-muted sm:block">{s.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
