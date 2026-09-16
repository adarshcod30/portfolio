import type { Metadata } from "next";
import { Section } from "@/components/UI";
import { Reveal, SplitLine, Stagger, StagItem } from "@/components/motion";
import ResumePicker from "@/components/ResumePicker";
import ProfileArrows from "@/components/ProfileArrows";
import CopyButton from "@/components/CopyButton";
import LocalTime from "@/components/LocalTime";
import { BrandIcon, BRANDS } from "@/components/Icons";
import { CONTACT, IDENTITY } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, phone, WhatsApp, LinkedIn, GitHub, X, Instagram, Reddit, Discord and everywhere else.",
};

export default function Contact() {
  const direct = CONTACT.filter((c) => c.kind === "direct" || c.card);
  const [lead, ...rest] = direct;

  return (
    <>
      <header data-section="Contact" className="contact-hero relative overflow-hidden border-b border-line px-5 pb-14 pt-32 sm:px-8 sm:pt-40 md:pr-48">
        <div aria-hidden className="contact-hero__glow" />
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-center gap-3">
                <span className="idx">05</span>
                <span className="h-px w-8 bg-accent" aria-hidden />
                <span className="eyebrow !text-accent">Contact</span>
              </p>
            </Reveal>
            <h1 className="font-display mt-5 text-[13vw] leading-[0.88] tracking-[-0.05em] sm:text-[6.4vw]">
              <SplitLine text="Reach me" delay={0.1} charDelay={0.03} />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink2 sm:text-base">
                Hiring, a project, or a question about something I built. Email is best for
                anything with detail, WhatsApp for anything quick.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <dl className="contact-status">
              <div>
                <dt className="eyebrow">Status</dt>
                <dd className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {IDENTITY.available}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd>{IDENTITY.location}</dd>
              </div>
              <div>
                <dt className="eyebrow">Local time</dt>
                <dd>
                  <LocalTime timeZone={IDENTITY.timezone} /> <span className="text-muted">IST, UTC+5:30</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <Section eyebrow="Direct" title="Write, call or message">
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[lead, ...rest].map((c, i) => {
            const brand = BRANDS[c.icon]?.color ?? null;
            return (
              <StagItem key={c.id} className={`h-full ${i === 0 ? "md:col-span-2" : ""}`}>
                <article
                  className={`card reach h-full ${i === 0 ? "reach--lead" : ""}`}
                  style={{ "--brand": brand ?? "var(--accent)" } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="reach__icon">
                      <BrandIcon id={c.icon} size={i === 0 ? 28 : 22} />
                    </span>
                    <span className="eyebrow text-right">{c.label}</span>
                  </div>
                  <p className={`reach__value font-display ${i === 0 ? "reach__value--lead" : ""}`}>{c.value}</p>
                  <p className="mt-1 text-[13px] text-muted">{c.note}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="reach__go group"
                    >
                      {c.action} <span className="arrow">↗</span>
                    </a>
                    <CopyButton value={c.value} className="reach__copy" />
                  </div>
                </article>
              </StagItem>
            );
          })}
        </Stagger>
      </Section>

      <section data-section="Profiles" className="slab-invert px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow mb-3">Profiles</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-[9vw] leading-[0.92] tracking-[-0.04em] sm:text-[4.2vw]">Everywhere else</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  Where the work lives, and where I do not talk about it.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-12">
            <ProfileArrows />
          </div>
        </div>
      </section>

      <Section eyebrow="Paperwork" title="Or take a resume">
        <div className="contact-resume">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink2">
            Fourteen role-specific resumes, each one page, all generated from the same facts as this
            site. Pick the one for the role you are hiring for.
          </p>
          <ResumePicker />
        </div>
      </Section>
    </>
  );
}
