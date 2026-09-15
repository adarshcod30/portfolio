import type { Metadata } from "next";
import WorkBrowser from "./WorkBrowser";
import { Reveal } from "@/components/motion";
import { PROJECTS } from "@/content/projects.generated";

export const metadata: Metadata = {
  title: "Work",
  description: "Twenty-six shipped projects across five domains, each with a case study.",
};

export default function WorkPage() {
  return (
    <>
      <header className="px-5 pb-14 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Work</p>
          </Reveal>
          <h1 className="font-display mt-4 text-[15vw] leading-[0.86] tracking-[-0.05em] sm:text-[8vw]">
            <Reveal delay={0.06}>
              <span className="block">{PROJECTS.length} projects</span>
            </Reveal>
            <Reveal delay={0.14}>
              <span className="block">five domains<span className="text-accent">.</span></span>
            </Reveal>
          </h1>
          <Reveal delay={0.24}>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-ink2 sm:text-base">
              Most are deployed and free to use. Every number is reproducible from the
              repository it belongs to, and where a result was unflattering it is published
              anyway.
            </p>
          </Reveal>
        </div>
      </header>
      <WorkBrowser />
    </>
  );
}
