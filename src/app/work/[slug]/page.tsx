import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StagItem, SplitLine, Parallax } from "@/components/motion";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

type Params = { slug: string };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    openGraph: p.shot ? { images: [{ url: p.shot }] } : undefined,
  };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const domain = DOMAINS.find((d) => d.id === p.domain);
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  // The bullets were written in one order: what and why, then how, then the
  // measured result. Split on that rather than inventing new copy.
  const hs = p.highlights;
  const problem = hs[0];
  const approach = hs.length >= 3 ? hs.slice(1, -1) : hs.slice(1);
  const result = hs.length >= 3 ? hs[hs.length - 1] : "";

  return (
    <article>
      {/* ---------- title ---------- */}
      <header className="px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <nav className="eyebrow flex items-center gap-2">
              <Link href="/work" className="hover:!text-accent">Work</Link>
              <span className="opacity-40">/</span>
              {domain && (
                <Link href={`/work#${domain.id}`} className="hover:!text-accent">
                  {domain.title}
                </Link>
              )}
            </nav>
          </Reveal>

          <h1 className="font-display mt-6 text-[13vw] leading-[0.88] tracking-[-0.05em] sm:text-[7vw]">
            <SplitLine text={p.name} delay={0.1} charDelay={0.022} />
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-5 max-w-2xl text-base text-ink2 sm:text-xl">{p.tagline}</p>
          </Reveal>
          {p.note && (
            <Reveal delay={0.46}>
              <p className="eyebrow mt-3">{p.note}</p>
            </Reveal>
          )}

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  Open the live build <span className="arrow">↗</span>
                </a>
              )}
              {p.code && (
                <a
                  href={p.code}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Read the source <span className="arrow">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- the running product ---------- */}
      {p.shot && (
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Parallax distance={18}>
                <a
                  href={p.live || p.code}
                  target="_blank"
                  rel="noreferrer"
                  className="shot block aspect-[16/10] sm:aspect-[16/9]"
                >
                  <Image
                    src={p.shot}
                    alt={`${p.name} running: ${p.tagline}.`}
                    width={2160}
                    height={1350}
                    priority
                    className="h-full w-full"
                  />
                </a>
              </Parallax>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow mt-3 !text-muted">
                Captured from the live deployment, not a mockup
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- body ---------- */}
      <div className="slab-quiet border-y border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Stagger gap={0.05}>
              <StagItem>
                <p className="eyebrow">Domain</p>
                <p className="mt-2 text-sm font-medium">{domain?.title}</p>
              </StagItem>
              <StagItem>
                <p className="eyebrow mt-7">Built with</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </StagItem>
            </Stagger>
          </aside>

          <div>
            <section>
              <Reveal>
                <p className="eyebrow">01 — The problem</p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="font-display mt-5 text-[6vw] leading-[1.08] tracking-[-0.03em] sm:text-[2.4vw]">
                  {problem}
                </p>
              </Reveal>
            </section>

            {approach.length > 0 && (
              <section className="mt-20">
                <Reveal>
                  <p className="eyebrow">02 — How it works</p>
                </Reveal>
                <ul className="mt-8 border-t border-line">
                  {approach.map((h, i) => (
                    <li key={i}>
                      <Reveal delay={i * 0.05}>
                        <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-7 sm:gap-8">
                          <span className="idx pt-1">{String(i + 1).padStart(2, "0")}</span>
                          <p className="text-[15px] leading-relaxed text-ink2 sm:text-base">{h}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {result && (
              <section className="mt-20">
                <Reveal>
                  <p className="eyebrow">03 — What it cost, and what it returned</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="font-display mt-5 text-[5.5vw] leading-[1.1] tracking-[-0.03em] text-accent sm:text-[2.1vw]">
                    {result}
                  </p>
                </Reveal>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* ---------- prev / next ---------- */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          <Reveal>
            <Link href={`/work/${prev.slug}`} className="tile group block">
              <span className="eyebrow">← Previous</span>
              <span className="font-display mt-2 block text-2xl leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {prev.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{prev.tagline}</span>
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Link href={`/work/${next.slug}`} className="tile group block sm:text-right">
              <span className="eyebrow">Next →</span>
              <span className="font-display mt-2 block text-2xl leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {next.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{next.tagline}</span>
            </Link>
          </Reveal>
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
            All 26 projects <span className="arrow">↗</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
