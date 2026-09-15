import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section } from "@/components/UI";
import { LEADERSHIP, MUN } from "@/content/site";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Debate Society, the LNMIIT Model United Nations secretariat, photography club and alumni association.",
};

export default function Leadership() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="The part that was not code"
        blurb="Three years in the Debate Society, from member to Coordinator, and the secretariat that runs the LNMIIT Model United Nations."
      />

      <Section eyebrow="Roles" title="Societies and clubs">
        <ul className="space-y-4">
          {LEADERSHIP.map((l) => (
            <li key={l.org} className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold tracking-tight">{l.org}</h3>
                <span className="font-mono text-[11px] text-muted">{l.dates}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{l.role}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink2">{l.detail}</p>
              {l.roles.length > 0 && (
                <ul className="mt-4 divide-y divide-line border-t border-line">
                  {l.roles.map((r) => (
                    <li key={r.title} className="flex items-baseline justify-between gap-4 py-2">
                      <span className="text-[13px] text-ink2">{r.title}</span>
                      <span className="font-mono text-[11px] text-muted">{r.dates}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="LNMIIT MUN 2026"
        title="The tenth edition"
        blurb="Held in January 2026. The Debate Society runs the conference, and the secretariat is where the organising happens: delegates, committees, schedules and logistics."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="card overflow-hidden">
            <Image
              src="/photos/mun-venue.jpg"
              alt="The LNM MUN 26 banner above the conference venue entrance, with committee flags for each council."
              width={900}
              height={1600}
              className="h-64 w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-muted">
              The venue on day one, with a banner per committee.
            </figcaption>
          </figure>
          <figure className="card overflow-hidden">
            <Image
              src="/photos/mun-hall.jpg"
              alt="A full lecture hall of delegates at the opening session of LNMIIT MUN 2026."
              width={1600}
              height={1067}
              className="h-64 w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-muted">
              Opening session. This is the scale the secretariat plans for.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Record" title="Model United Nations">
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
