import type { Metadata } from "next";
import { PageHeader, ProjectCard } from "@/components/UI";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

export const metadata: Metadata = {
  title: "Work",
  description: "Twenty-six shipped projects across five domains, each with a case study.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Twenty-six projects, five domains"
        blurb="Most are deployed and free to use. Every number below is reproducible from the repository it belongs to, and where a result was unflattering it is published anyway."
      />
      {DOMAINS.map((d) => {
        const items = PROJECTS.filter((p) => p.domain === d.id);
        if (!items.length) return null;
        return (
          <section key={d.id} id={d.id} className="scroll-mt-8 px-6 py-14 sm:px-10">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{d.title}</h2>
                <span className="font-mono text-[11px] text-muted">
                  {items.length} {items.length === 1 ? "project" : "projects"}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{d.blurb}</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProjectCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
