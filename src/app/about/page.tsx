import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/UI";
import { IDENTITY, EXPERIENCE, INTERESTS, STATS } from "@/content/site";

export const metadata: Metadata = { title: "About", description: IDENTITY.tagline };

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Adarsh Dwivedi"
        blurb={IDENTITY.tagline}
      />

      <Section title="The short version">
        <div className="space-y-4 text-[15px] leading-relaxed text-ink2">
          <p>
            I am a final-year computer science student at {IDENTITY.school}, graduating in
            2027. Over the last two years I have shipped 32 public products and competed in
            more than ten national hackathons and datathons, and almost all of it points at
            the same kind of problem: something in the physical world that is already going
            wrong for somebody, where a model can help but cannot be trusted on its own.
          </p>
          <p>
            Crop loss. Air quality enforcement. Road capacity. Fraud rings. Misdiagnosis.
            Thin-file credit. Urban flooding. Police case linkage. The common thread is not
            the technique, it is the discipline: a model is allowed to propose, and
            something deterministic decides, so a person can always answer the question
            &ldquo;why did this happen?&rdquo;
          </p>
          <p>
            Outside the engineering I spent three years in the Debate Society, ending as its
            Coordinator, and helped run the tenth edition of the LNMIIT Model United Nations.
            I shot for the campus photography club for two years. Those are not filler on a
            page. Running a conference for hundreds of delegates taught me more about
            shipping under a deadline than any side project did.
          </p>
        </div>
      </Section>

      <Section eyebrow="By the numbers" title="Where that leaves things">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card p-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-accent">{s.value}</dd>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Experience" title="Where I have worked">
        {EXPERIENCE.map((e) => (
          <article key={e.org} className="card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold tracking-tight">{e.org}</h3>
              <span className="font-mono text-[11px] text-muted">{e.dates}</span>
            </div>
            <p className="mt-1 text-sm text-accent">{e.title}</p>
            <p className="text-xs text-muted">{e.location}</p>
            <ul className="mt-5 space-y-3">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden />
                  <p className="text-[14px] leading-relaxed text-ink2">{b}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Section>

      <Section eyebrow="Education" title={IDENTITY.school}>
        <div className="card p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium">{IDENTITY.degree}</p>
            <span className="font-mono text-[11px] text-muted">{IDENTITY.years}</span>
          </div>
          <p className="mt-2 text-sm text-muted">CGPA {IDENTITY.cgpa}</p>
        </div>
      </Section>

      <Section eyebrow="Outside the terminal" title="Interests">
        <div className="grid gap-4 sm:grid-cols-2">
          {INTERESTS.map((i) => (
            <div key={i.title} className="card p-5">
              <h3 className="text-sm font-semibold tracking-tight">{i.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{i.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="One rule I try not to break">
        <Callout>
          Where a result is unflattering I publish it anyway. Orbweaver reports the 0.371
          genuine customers wrongly swept in for every fraudster caught, and 36 dated
          failures beside the wins. MargaDrishti says plainly that a target was unreachable
          by construction rather than dressing it up as a near miss. That is the part of
          this work I would most like to be judged on.
        </Callout>
      </Section>
    </>
  );
}
