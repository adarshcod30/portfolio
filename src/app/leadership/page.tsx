import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section } from "@/components/UI";
import { Reveal, Parallax, Stagger, StagItem } from "@/components/motion";
import { DEBSOC, TERM, MUN_ORGANISED, MUN, LEADERSHIP } from "@/content/site";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Coordinator of the LNMIIT Debate Society, organiser of LNMIIT MUN'25 and MUN'26, and seven Model United Nations conferences on both sides of the table.",
};

const HEADLINE = [
  { value: "3", label: "years in the Debate Society" },
  { value: "2", label: "LNMIIT MUNs organised" },
  { value: "~170", label: "delegates at MUN'26" },
  { value: "7", label: "MUN conferences" },
];

const MUN26_PHOTOS = [
  { src: "/photos/mun-venue.jpg", w: 900, h: 1600, alt: "The LNM MUN 26 banner above the conference venue entrance.", cap: "The venue" },
  { src: "/photos/mun26-10.jpg", w: 1400, h: 934, alt: "Delegates raising LNMIIT MUN'26 placards to vote in committee.", cap: "A committee vote" },
  { src: "/photos/mun26-12.jpg", w: 1400, h: 934, alt: "A full lecture hall of delegates at LNMIIT MUN'26.", cap: "A full hall" },
  { src: "/photos/mun26-9.jpg", w: 1400, h: 933, alt: "The LNMIIT MUN'26 trophies and certificates laid out behind a row of red flowers.", cap: "What was on the line" },
  { src: "/photos/mun26-3.jpg", w: 1066, h: 1600, alt: "An LNMIIT MUN'26 standee naming the partner departments.", cap: "Partners, on the standee" },
];

export default function Leadership() {
  const [mun26, mun25] = MUN_ORGANISED;

  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Leadership"
        title="The part that was not code"
        blurb="Three years in the Debate Society, from first-year member to Coordinator, two editions of the LNMIIT Model United Nations run from the inside, and the largest conference the college has hosted."
      />

      <section className="border-b border-line px-5 py-10 sm:px-8">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {HEADLINE.map((t) => (
            <div key={t.label} className="comp-tally">
              <dd className="font-display text-5xl tracking-tight text-accent sm:text-6xl">{t.value}</dd>
              <dt className="eyebrow mt-2">{t.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* The society, role by role */}
      <Section eyebrow={DEBSOC.dates} title={DEBSOC.org} blurb={DEBSOC.summary}>
        <ol className="ladder">
          {DEBSOC.roles.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.07}>
                <div className={`ladder__step ${i === 0 ? "ladder__step--top" : ""}`}>
                  <span className="ladder__dot" aria-hidden />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{r.title}</h3>
                    <span className="idx">{r.dates}</span>
                  </div>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink2">{r.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* MUN'26, the flagship */}
      <section data-section={mun26.name} className="slab-invert px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-3">
              {mun26.edition} · {mun26.dates}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[11vw] leading-[0.9] tracking-[-0.045em] sm:text-[5.4vw]">{mun26.name}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-base text-accent sm:text-lg">{mun26.role}</p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[15px] leading-relaxed text-ink2">{mun26.context}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink2">{mun26.detail}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {mun26.committees.map((c) => (
                  <li key={c} className="chip">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)]">
                {mun26.figures.map((f) => (
                  <div key={f.label} className="mun-fig">
                    <dd className="font-display text-4xl tracking-tight text-accent sm:text-5xl">{f.value}</dd>
                    <dt className="eyebrow mt-2">{f.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mun-outcome mt-4">
                <span className="eyebrow !text-accent">Result</span>
                {mun26.outcome}
              </p>
            </div>
          </div>

          <div className="mun-gallery mt-14">
            {MUN26_PHOTOS.map((p, i) => (
              <Parallax key={p.src} distance={i % 2 ? -18 : 18} className={`mun-gallery__item mun-gallery__item--${i}`}>
                <figure>
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} className="mun-gallery__img" />
                  <figcaption className="eyebrow">{p.cap}</figcaption>
                </figure>
              </Parallax>
            ))}
          </div>
        </div>
      </section>

      {/* The term, in order */}
      <Section eyebrow="Sep 2025 to May 2026" title="The year as Coordinator" blurb="What the term actually consisted of, month by month.">
        <ol className="term">
          {TERM.map((t, i) => (
            <li key={t.what}>
              <Reveal delay={Math.min(i, 6) * 0.04}>
                <div className="term__row tile">
                  <span className="term__when">{t.when}</span>
                  <span className="term__what">{t.what}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* MUN'25 */}
      <section data-section={mun25.name} className="slab-quiet border-y border-line px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-3">
                {mun25.edition} · {mun25.dates}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[11vw] leading-[0.9] tracking-[-0.045em] sm:text-[4.6vw]">{mun25.name}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-base text-accent sm:text-lg">{mun25.role}</p>
            </Reveal>
            <p className="mt-6 text-[15px] leading-relaxed text-ink2">{mun25.detail}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{mun25.context}</p>
            <dl className="mt-8 grid grid-cols-4 gap-3">
              {mun25.figures.map((f) => (
                <div key={f.label}>
                  <dd className="font-display text-2xl tracking-tight text-accent sm:text-3xl">{f.value}</dd>
                  <dt className="mt-1 text-[10.5px] uppercase tracking-wider text-muted">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow mb-4">Committees and agendas</p>
            <Stagger className="space-y-3">
              {mun25.agendas?.map((a) => (
                <StagItem key={a.committee}>
                  <div className="card agenda p-5">
                    <span className="agenda__tag">{a.committee}</span>
                    <p className="text-[14px] leading-relaxed text-ink2">{a.agenda}</p>
                  </div>
                </StagItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* The full MUN record */}
      <Section eyebrow="Record" title="Seven conferences, both sides of the table" blurb="Three as a delegate, three on the organising side, and one leading the society's delegation.">
        <ul className="border-t border-line">
          {MUN.map((m, i) => (
            <li key={m.event}>
              <Reveal delay={i * 0.04}>
                <div className="tile grid items-baseline gap-x-6 gap-y-2 border-b border-line py-6 sm:grid-cols-[4rem_1fr_auto]">
                  <span className="idx">{m.year}</span>
                  <div>
                    <p className="font-display text-xl leading-tight tracking-tight sm:text-2xl">{m.event}</p>
                    <p className="eyebrow mt-1.5">{m.role}</p>
                  </div>
                  {m.award && <span className="font-display text-lg text-accent sm:text-right sm:text-xl">{m.award}</span>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Also" title="Clubs">
        <div className="grid gap-4 md:grid-cols-2">
          {LEADERSHIP.map((l) => (
            <Reveal key={l.org} className="reveal-fill">
              <article className="card h-full p-6">
                <p className="idx">{l.dates}</p>
                <h3 className="font-display mt-3 text-2xl leading-tight tracking-tight">{l.org}</h3>
                <p className="mt-1 text-sm text-accent">{l.role}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{l.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
