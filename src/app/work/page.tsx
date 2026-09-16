import type { Metadata } from "next";
import WorkBrowser from "./WorkBrowser";
import { Reveal } from "@/components/motion";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";
import { COUNT_WORD } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: `${PROJECTS.length} shipped projects across ${DOMAINS.length} domains, each with a case study.`,
};

export default function WorkPage() {
  return (
    <>
      <header data-section="Work" className="relative overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pt-40 md:pr-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--cyan), transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="flex items-center gap-3">
              <span className="idx">02</span>
              <span className="h-px w-8 bg-accent" aria-hidden />
              <span className="eyebrow !text-accent">Work</span>
            </p>
          </Reveal>
          <h1 className="font-display mt-4 text-[15vw] leading-[0.86] tracking-[-0.05em] sm:text-[8vw]">
            <Reveal delay={0.06}>
              <span className="block">{PROJECTS.length} projects</span>
            </Reveal>
            <Reveal delay={0.14}>
              <span className="block">{COUNT_WORD[DOMAINS.length].toLowerCase()} domains<span className="text-accent">.</span></span>
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
