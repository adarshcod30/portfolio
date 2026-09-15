import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/UI";
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
        <ul className="grid gap-3 sm:grid-cols-2">
          {RESUMES.map((r) => (
            <li key={r.file}>
              <a
                href={`/resume/${r.file}`}
                target="_blank"
                rel="noreferrer"
                className="card flex items-center justify-between gap-4 p-4"
              >
                <span className="text-sm font-medium">{r.label}</span>
                <span className="font-mono text-[11px] text-muted">PDF · {r.kb} KB</span>
              </a>
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
