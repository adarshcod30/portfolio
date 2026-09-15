import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/UI";
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
        <ul className="space-y-4">
          {COMPETITIONS.map((c) => (
            <li key={c.name} className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold tracking-tight">{c.name}</h3>
                <span className="font-mono text-[11px] text-muted">{c.when}</span>
              </div>
              <p className="text-xs text-muted">{c.kind}</p>
              <p className="mt-3 text-base font-semibold text-accent">{c.result}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink2">{c.detail}</p>
              {c.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3 text-[11px]">
                  {c.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noreferrer" className="text-accent link-underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Model United Nations"
        title="Five conferences, both sides of the table"
        blurb="Three as a delegate, two running the thing."
      >
        <ul className="divide-y divide-line">
          {MUN.map((m) => (
            <li key={m.event} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
              <div>
                <p className="text-sm font-medium">{m.event}</p>
                <p className="text-xs text-muted">{m.role}</p>
              </div>
              {m.award && <span className="text-sm font-semibold text-accent">{m.award}</span>}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
