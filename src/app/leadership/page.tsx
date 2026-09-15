import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section } from "@/components/UI";
import { Reveal, Parallax } from "@/components/motion";
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
        <ul className="border-t border-line">
          {LEADERSHIP.map((l, i) => (
            <li key={l.org}>
              <Reveal delay={i * 0.05}>
                <div className="tile grid gap-6 border-b border-line py-10 lg:grid-cols-[auto_1fr_minmax(0,44%)] lg:gap-10">
                  <span className="idx lg:pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                      {l.org}
                    </h3>
                    <p className="mt-2 text-sm text-accent">{l.role}</p>
                    <p className="eyebrow mt-1.5">{l.dates}</p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink2">{l.detail}</p>
                    {l.roles.length > 0 && (
                      <ul className="mt-5 divide-y divide-line border-t border-line">
                        {l.roles.map((r) => (
                          <li key={r.title} className="flex items-baseline justify-between gap-4 py-2.5">
                            <span className="text-[13px] text-ink2">{r.title}</span>
                            <span className="idx">{r.dates}</span>
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
        eyebrow="LNMIIT MUN 2026"
        title="The tenth edition"
        blurb="Held in January 2026. The Debate Society runs the conference, and the secretariat is where the organising happens: delegates, committees, schedules and logistics."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Parallax distance={26}>
            <figure className="overflow-hidden rounded-2xl border border-line">
              <Image
                src="/photos/mun-venue.jpg"
                alt="The LNM MUN 26 banner above the conference venue entrance, with committee flags for each council."
                width={900}
                height={1600}
                className="h-[22rem] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <figcaption className="eyebrow bg-surface px-4 py-3">
                The venue on day one, a banner per committee
              </figcaption>
            </figure>
          </Parallax>
          <Parallax distance={-26}>
            <figure className="overflow-hidden rounded-2xl border border-line">
              <Image
                src="/photos/mun-hall.jpg"
                alt="A full lecture hall of delegates at the opening session of LNMIIT MUN 2026."
                width={1600}
                height={1067}
                className="h-[22rem] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <figcaption className="eyebrow bg-surface px-4 py-3">
                Opening session, the scale the secretariat plans for
              </figcaption>
            </figure>
          </Parallax>
        </div>
      </Section>

      <Section eyebrow="Record" title="Model United Nations">
        <ul className="border-t border-line">
          {MUN.map((m, i) => (
            <li key={m.event}>
              <Reveal delay={i * 0.04}>
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
