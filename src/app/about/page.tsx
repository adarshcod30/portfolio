import type { Metadata } from "next";
import Image from "next/image";
import { Section, Callout } from "@/components/UI";
import { Reveal, SplitLine, Stagger, StagItem } from "@/components/motion";
import { IDENTITY, EXPERIENCE, EDUCATION, INTERESTS, STATS } from "@/content/site";

export const metadata: Metadata = { title: "About", description: IDENTITY.tagline };

const FACTS = [
  { k: "Based in", v: IDENTITY.location },
  { k: "Studying", v: "B.Tech CSE, LNMIIT, final year" },
  { k: "Most recently", v: "Agentic AI intern, Deloitte India" },
  { k: "Off the clock", v: "Debate Society Coordinator, 2025 to 2026" },
];

export default function About() {
  const deloitte = EXPERIENCE[0];

  return (
    <>
      <header
        data-section="About"
        className="relative overflow-hidden border-b border-line px-5 pb-16 pt-32 sm:px-8 sm:pt-40 md:pr-48"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--cyan), transparent 68%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-center gap-3">
                <span className="idx">01</span>
                <span className="h-px w-8 bg-accent" aria-hidden />
                <span className="eyebrow !text-accent">About</span>
              </p>
            </Reveal>
            <h1 className="font-display mt-5 text-[12vw] leading-[0.88] tracking-[-0.05em] sm:text-[6vw]">
              <SplitLine text={IDENTITY.name} delay={0.1} charDelay={0.02} />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink2 sm:text-base">{IDENTITY.tagline}</p>
            </Reveal>
            <Reveal delay={0.45}>
              <dl className="about-facts mt-10">
                {FACTS.map((f) => (
                  <div key={f.k}>
                    <dt className="eyebrow">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <figure className="portrait portrait--hero">
              <Image
                src="/photos/adarsh-portrait.jpg"
                alt="Adarsh Dwivedi in a navy blazer, standing outdoors in the evening."
                width={1100}
                height={1650}
                priority
                className="portrait__img"
              />
              <figcaption className="portrait__cap">
                <span>{IDENTITY.role}</span>
                <span className="idx">{IDENTITY.available}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </header>

      <Section eyebrow="In brief" title="What I work on, and why">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-[15px] leading-relaxed text-ink2">
            <p>
              I am a final-year computer science student at {IDENTITY.school}, graduating in
              2027. Over the last two years I have shipped 32 public products and competed in
              more than twenty hackathons and datathons, and almost all of it points at the same
              kind of problem: something in the physical world that is already going wrong for
              somebody, where a model can help but cannot be trusted on its own.
            </p>
            <p>
              Crop loss. Air quality enforcement. Road capacity. Fraud rings. Misdiagnosis.
              Thin-file credit. Urban flooding. Police case linkage. The common thread is not the
              technique, it is the discipline: a model is allowed to propose, and something
              deterministic decides, so a person can always answer the question &ldquo;why did
              this happen?&rdquo;
            </p>
            <p>
              Outside the engineering I spent three years in the Debate Society, ending as one of
              its Coordinators, and helped run two editions of the LNMIIT Model United Nations.
              Running a conference for 170 delegates taught me more about shipping under a
              deadline than any side project did.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 self-start">
            {STATS.map((s) => (
              <div key={s.label} className="card p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl tracking-tight text-accent">{s.value}</dd>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section data-section="Experience" className="slab-invert px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-3">Experience</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[9vw] leading-[0.92] tracking-[-0.04em] sm:text-[4.2vw]">
              {deloitte.org}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-base text-accent sm:text-lg">{deloitte.title}</p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Reveal>
              <figure className="xp-photo">
                <Image
                  src={deloitte.photo.src}
                  alt={deloitte.photo.alt}
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
                <figcaption className="xp-photo__cap">{deloitte.photo.caption}</figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="xp-meta">
                {[
                  ["Team", deloitte.team],
                  ["Where", deloitte.location],
                  ["When", `${deloitte.dates}, ${deloitte.length}`],
                  ["Project", deloitte.project],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)] md:grid-cols-2">
            {deloitte.bullets.map((b, i) => (
              <StagItem key={i} className={`xp-point ${deloitte.bullets.length % 2 && i === deloitte.bullets.length - 1 ? "md:col-span-2" : ""}`}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-[15px] leading-relaxed text-ink2">{b}</p>
              </StagItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <ul className="flex max-w-xl flex-wrap gap-2">
              {deloitte.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
            <blockquote className="xp-quote">&ldquo;{deloitte.takeaway}&rdquo;</blockquote>
          </div>
        </div>
      </section>

      <Section eyebrow="Education" title="Where the foundations came from">
        <ol className="edu">
          {EDUCATION.map((e, i) => (
            <li key={e.level}>
              <Reveal delay={i * 0.06}>
                <article className="edu__row tile">
                  <div className="edu__when">
                    <span className="eyebrow !text-accent">{e.level}</span>
                    <span className="idx mt-2 block">{e.dates}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">{e.school}</h3>
                    <p className="mt-1 text-sm text-ink2">
                      {e.course}
                      {e.place && <span className="text-muted"> · {e.place}</span>}
                    </p>
                    <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted">{e.detail}</p>
                    {e.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {e.tags.map((t) => (
                          <li key={t} className="chip">{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="edu__score">
                    <span className="font-display text-4xl tracking-tight text-accent sm:text-5xl">{e.score}</span>
                    <span className="mt-1 text-[11px] uppercase tracking-wider text-muted">{e.scoreLabel}</span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Outside the terminal" title="Interests">
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal className="reveal-fill md:row-span-3">
            <figure className="portrait portrait--soft h-full">
              <Image
                src="/photos/adarsh-casual.jpg"
                alt="Adarsh Dwivedi smiling in a checked shirt in front of a vine-covered wall."
                width={900}
                height={1245}
                className="portrait__img"
              />
            </figure>
          </Reveal>
          {INTERESTS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.04} className="reveal-fill">
              <div className="card interest h-full p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl tracking-tight">{it.title}</h3>
                  {it.figure && <span className="font-display text-3xl text-accent">{it.figure}</span>}
                </div>
                {it.unit && <p className="eyebrow mt-1">{it.unit}</p>}
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{it.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="One rule I try not to break">
        <Callout>
          Where a result is unflattering I publish it anyway. Orbweaver reports the 0.371
          genuine customers wrongly swept in for every fraudster caught, and 36 dated failures
          beside the wins. MargaDrishti says plainly that a target was unreachable by
          construction rather than dressing it up as a near miss. The competitions page lists
          the rejections next to the medals. That is the part of this work I would most like to
          be judged on.
        </Callout>
      </Section>
    </>
  );
}
