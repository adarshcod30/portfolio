import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, Callout } from "@/components/UI";
import { Reveal } from "@/components/motion";
import { CONTACT, IDENTITY } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, phone, WhatsApp, LinkedIn, GitHub and everywhere else.",
};

export default function Contact() {
  const primary = CONTACT.filter((c) => c.primary && c.href);
  const elsewhere = CONTACT.filter((c) => !c.primary && c.href);
  return (
    <>
      <PageHeader
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

      <Section title="Elsewhere">
        <ul className="flex flex-wrap gap-3">
          {elsewhere.map((c) => (
            <li key={c.id}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="card inline-flex items-baseline gap-2 px-4 py-2.5"
              >
                <span className="text-sm font-medium">{c.label}</span>
                <span className="font-mono text-[11px] text-muted">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Or take the paperwork">
        <Callout>
          Fourteen role-specific resumes are on the{" "}
          <Link href="/resume" className="font-medium text-accent link-underline">
            resume page
          </Link>
          , all one page, all generated from the same facts as this site.
        </Callout>
      </Section>
    </>
  );
}
