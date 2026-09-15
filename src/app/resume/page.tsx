import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/UI";
import { Reveal } from "@/components/motion";
import { RESUMES } from "@/content/resumes.generated";

export const metadata: Metadata = {
  title: "Resume",
  description: "Fourteen one-page resumes, one per target role, all generated from a single source of facts.",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Fourteen resumes, one set of facts"
        blurb="Every one is a single page, parses cleanly in an applicant tracking system, and is generated from the same source file this site is built from. Pick the role you are hiring for."
      />
      <Section title="Download">
        <ul className="border-t border-line">
          {RESUMES.map((r, i) => (
            <li key={r.file}>
              <Reveal delay={Math.min(i, 8) * 0.03}>
                <a
                  href={`/resume/${r.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="tile group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b border-line py-5"
                >
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {r.label}
                  </span>
                  <span className="idx">PDF · {r.kb} KB <span className="arrow">↓</span></span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Callout>
            These are generated, not hand-maintained. A number changes in one place and all
            fourteen stay consistent, which is the only way fourteen documents can avoid
            quietly disagreeing with each other six months later.
          </Callout>
        </div>
      </Section>
    </>
  );
}
