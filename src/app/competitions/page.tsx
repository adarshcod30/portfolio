import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/UI";
import { Reveal } from "@/components/motion";
import { COMPETITIONS, MUN } from "@/content/site";

export const metadata: Metadata = {
  title: "Competitions",
  description: "Hackathons, datathons and Model United Nations, including the ones I did not win.",
};

export default function Competitions() {
  return (
    <>
      <PageHeader
        eyebrow="Competitions"
        title="Measured against other people"
        blurb="Ten and counting. Results are stated as they actually happened, which means Level 2 rather than finalist, and participant where that is the truth."
      />

      <Section eyebrow="Engineering" title="Hackathons and datathons">
        <ul className="border-t border-line">
          {COMPETITIONS.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <div className="tile grid gap-6 border-b border-line py-10 lg:grid-cols-[auto_1fr_minmax(0,42%)] lg:gap-10">
                  <span className="idx lg:pt-2">{String(i + 1).padStart(2, "0")}</span>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:justify-start lg:gap-4">
                      <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                        {c.name}
                      </h3>
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

      <Section
        eyebrow="Model United Nations"
        title="Five conferences, both sides of the table"
        blurb="Three as a delegate, two running the thing."
      >
        <ul className="border-t border-line">
          {MUN.map((m, i) => (
            <li key={m.event}>
              <Reveal delay={i * 0.05}>
                <div className="tile flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-7">
                  <div>
                    <p className="font-display text-xl leading-tight tracking-tight sm:text-2xl">
                      {m.event}
                    </p>
                    <p className="eyebrow mt-1.5">{m.role}</p>
                  </div>
                  {m.award && (
                    <span className="font-display text-lg text-accent sm:text-2xl">{m.award}</span>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
