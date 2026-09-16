import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/UI";
import { Reveal } from "@/components/motion";
import ResumePicker from "@/components/ResumePicker";
import ProfileCards from "@/components/ProfileCards";
import { CONTACT, IDENTITY } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, phone, WhatsApp, LinkedIn, GitHub and everywhere else.",
};

export default function Contact() {
  const primary = CONTACT.filter((c) => c.primary && c.href);
  return (
    <>
      <PageHeader
        index="07"
        eyebrow="Contact"
        title="Reach me"
        blurb={`${IDENTITY.available}. Based in ${IDENTITY.location}, and happy to talk across any timezone.`}
      />

      <Section title="Direct">
        <ul className="border-t border-line">
          {primary.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.04}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="tile group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-6"
                >
                  <span className="eyebrow">{c.label}</span>
                  <span className="font-display text-xl tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {c.value} <span className="arrow text-[0.6em]">↗</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Profiles"
        title="Elsewhere"
        blurb="Each one has something on it worth looking at, not just a claimed handle."
      >
        <ProfileCards />
      </Section>

      <Section title="Or take the paperwork">
        <Callout>
          <span className="flex flex-wrap items-center justify-between gap-4">
            <span>
              Fourteen role-specific resumes, all one page, all generated from the same facts as
              this site. Pick the one for the role you are hiring for.
            </span>
            <ResumePicker />
          </span>
        </Callout>
      </Section>
    </>
  );
}
