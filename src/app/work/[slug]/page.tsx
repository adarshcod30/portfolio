import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StagItem, SplitLine } from "@/components/motion";
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
  return { title: p.name, description: p.tagline };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const domain = DOMAINS.find((d) => d.id === p.domain);
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const [problem, ...rest] = p.highlights;

  return (
    <article>
      {/* ---------- title ---------- */}
      <header className="px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
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

          <h1 className="font-display mt-6 text-[14vw] leading-[0.86] tracking-[-0.05em] sm:text-[7.5vw]">
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
        </div>
      </header>

      {/* ---------- body: pinned meta beside scrolling narrative ---------- */}
      <div className="border-t border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Stagger gap={0.05}>
              <StagItem>
                <p className="eyebrow">Built with</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </StagItem>
              <StagItem>
                <div className="mt-8 flex flex-col gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-between gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
                    >
                      Open the live build <span className="arrow">↗</span>
                    </a>
                  )}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-between gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      Read the source <span className="arrow">↗</span>
                    </a>
                  )}
                </div>
              </StagItem>
            </Stagger>
          </aside>

          <div>
            {problem && (
              <section>
                <Reveal>
                  <p className="eyebrow">The problem</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="font-display mt-5 text-[6vw] leading-[1.08] tracking-[-0.03em] sm:text-[2.5vw]">
                    {problem}
                  </p>
                </Reveal>
              </section>
            )}

            {rest.length > 0 && (
              <section className="mt-20">
                <Reveal>
                  <p className="eyebrow">How it works, and what it cost</p>
                </Reveal>
                <ul className="mt-8 border-t border-line">
                  {rest.map((h, i) => (
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
          </div>
        </div>
      </div>

      {/* ---------- next ---------- */}
      <section className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Next project</p>
          </Reveal>
          <Reveal delay={0.06}>
            <Link href={`/work/${next.slug}`} className="tile group mt-4 block">
              <span className="font-display block text-[11vw] leading-[0.9] tracking-[-0.045em] transition-colors group-hover:text-accent sm:text-[5vw]">
                {next.name} <span className="arrow inline-block text-[0.5em] align-middle">↗</span>
              </span>
              <span className="mt-2 block text-sm text-muted">{next.tagline}</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
