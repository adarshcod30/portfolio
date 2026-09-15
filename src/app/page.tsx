import Link from "next/link";
import NodeField from "@/components/NodeField";
import { StatusStrip } from "@/components/Chrome";
import { Section, ProjectCard, Callout } from "@/components/UI";
import { IDENTITY, STATS, COMPETITIONS } from "@/content/site";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

const FEATURED = ["kadi", "agentiq", "vayu", "krishimitra"];

export default function Home() {
  const featured = FEATURED.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean);
  const headline = COMPETITIONS.filter((c) => c.highlight);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <NodeField />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 sm:px-10 sm:pb-28 sm:pt-36">
          <StatusStrip />
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            {IDENTITY.name}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            AI &amp; Product
            <br />
            <span className="text-accent">Engineer</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink2 sm:text-base">
            {IDENTITY.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                  {s.value}
                </dd>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section
        eyebrow="Selected work"
        title="Four projects that carry the rest"
        blurb="Each one shipped, deployed and measured. The full set runs to 26 across five domains."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/work" className="font-medium text-accent link-underline">
            All 26 projects, grouped by domain
          </Link>
        </p>
      </Section>

      <Section
        eyebrow="How it is organised"
        title="Five domains"
        blurb="The work is not one thing. These are the five areas it actually falls into."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => {
            const n = PROJECTS.filter((p) => p.domain === d.id).length;
            return (
              <Link key={d.id} href={`/work#${d.id}`} className="card group p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold tracking-tight group-hover:text-accent">
                    {d.title}
                  </h3>
                  <span className="font-mono text-[11px] text-muted">{n}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{d.blurb}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Measured against other people"
        title="Competitions"
        blurb="Ten and counting. These two are the ones worth leading with."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {headline.map((c) => (
            <article key={c.name} className="card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight">{c.name}</h3>
                <span className="font-mono text-[11px] text-muted">{c.when}</span>
              </div>
              <p className="mt-2 text-base font-semibold text-accent">{c.result}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink2">{c.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/competitions" className="font-medium text-accent link-underline">
            Every competition, including the ones I did not win
          </Link>
        </p>
      </Section>

      <Section eyebrow="The method" title="A model proposes. Something deterministic decides.">
        <Callout>
          That separation is the design decision repeated most across these projects,
          because it is what makes &ldquo;why did this happen?&rdquo; answerable by a
          person. Ring membership in Orbweaver comes from a peeling objective with a
          proved one-half approximation bound, so the answer is checkable arithmetic
          rather than a model&rsquo;s opinion. AGENTIQ generates test assertions with a
          language model and then evaluates them with a tool, because a model grading its
          own output is not evidence. KrishiMitra will not recommend a crop the district
          has no record of growing, whatever the model says.
        </Callout>
      </Section>
    </>
  );
}
