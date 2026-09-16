import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/UI";
import { Reveal, Stagger, StagItem } from "@/components/motion";
import { COMPETITIONS, TIERS } from "@/content/site";

export const metadata: Metadata = {
  title: "Competitions",
  description: "Every hackathon and datathon I have entered, with the result as it actually happened, including the ones I did not win.",
};

const MISS = /not selected|not shortlisted|did not/;

export default function Competitions() {
  const byTier = (t: string) => COMPETITIONS.filter((c) => c.tier === t);
  const top = byTier("top");
  const advanced = byTier("advanced");
  const entered = byTier("entered");

  const tally = [
    { value: COMPETITIONS.length, label: "competitions entered" },
    { value: top.length, label: "ranked, placed or hired" },
    { value: advanced.length, label: "cleared a round" },
    { value: COMPETITIONS.filter((c) => MISS.test(c.result)).length, label: "rejections, listed" },
  ];

  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Competitions"
        title="Measured against other people"
        blurb={`${COMPETITIONS.length} hackathons, datathons and ranked challenges since 2025. Each result is stated as it actually happened, which means the rejections are here too.`}
      />

      <section className="border-b border-line px-5 py-10 sm:px-8">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {tally.map((t) => (
            <div key={t.label} className="comp-tally">
              <dd className="font-display text-5xl tracking-tight text-accent sm:text-6xl">{t.value}</dd>
              <dt className="eyebrow mt-2">{t.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Section eyebrow={TIERS[0].title} title="The ones that went furthest">
        <ul className="border-t border-line">
          {top.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <div className="tile grid gap-6 border-b border-line py-10 lg:grid-cols-[auto_1fr_minmax(0,42%)] lg:gap-10">
                  <span className="idx lg:pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:justify-start lg:gap-4">
                      <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">{c.name}</h3>
                      <span className="idx">{c.when}</span>
                    </div>
                    <p className="eyebrow mt-2">{c.kind}</p>
                    <p className="font-display mt-5 text-[7vw] leading-[1] tracking-[-0.035em] text-accent sm:text-[2.6vw]">
                      {c.result}
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink2">{c.detail}</p>
                    {c.links.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                        {c.links.map((l) => (
                          <li key={l.url}>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-accent"
                            >
                              {l.label}
                              <span className="arrow">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <section data-section={TIERS[1].title} className="slab-invert px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-3">{TIERS[1].title}</p>
          <h2 className="font-display text-[9vw] leading-[0.92] tracking-[-0.04em] sm:text-[4.2vw]">
            Past the first cut
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{TIERS[1].blurb}</p>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {advanced.map((c) => (
              <StagItem key={c.name} className="h-full">
                <CompCard c={c} />
              </StagItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Section eyebrow={TIERS[2].title} title="Everything else I entered" blurb={TIERS[2].blurb}>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.04}>
          {entered.map((c, i) => (
            <StagItem
              key={c.name}
              // a lone card on the last row spans it, so the grid never ends on a gap
              className={`h-full ${entered.length % 3 === 1 && i === entered.length - 1 ? "lg:col-span-3" : ""}`}
            >
              <CompCard c={c} />
            </StagItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}

function CompCard({ c }: { c: (typeof COMPETITIONS)[number] }) {
  const miss = MISS.test(c.result);
  return (
    <article className="card comp-card flex h-full flex-col p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="eyebrow">{c.kind}</span>
        <span className="idx shrink-0">{c.when}</span>
      </div>
      <h3 className="font-display mt-3 text-xl leading-tight tracking-tight">{c.name}</h3>
      {c.project && <p className="mt-1 text-[12px] text-ink2">with {c.project}</p>}
      <p className={`comp-result mt-4 ${miss ? "comp-result--miss" : ""}`}>{c.result}</p>
      {c.detail && <p className="mt-4 text-[13px] leading-relaxed text-muted">{c.detail}</p>}
      {c.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5">
          {c.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-accent"
            >
              {l.label}
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
