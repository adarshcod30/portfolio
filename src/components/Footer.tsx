import Link from "next/link";
import { Reveal, SplitLine } from "./motion";
import { IDENTITY, CONTACT, NAV } from "@/content/site";

/** Short marks for the profile cards, so each one is recognisable at a glance. */
const MARK: Record<string, { mark: string; note: string }> = {
  github: { mark: "GH", note: "32 public repositories" },
  linkedin: { mark: "in", note: "Experience and leadership" },
  pypi: { mark: "Py", note: "3 published packages" },
  huggingface: { mark: "HF", note: "Model spaces and demos" },
  kaggle: { mark: "Kg", note: "Competing on real datasets" },
  hackerrank: { mark: "HR", note: "Orchestrate rank #12" },
};

export default function Footer() {
  const badges = CONTACT.filter((c) => c.href && MARK[c.id]);
  const direct = CONTACT.filter((c) => c.primary && c.href && !MARK[c.id]);

  return (
    <footer className="slab-invert">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>

        <h2 className="font-display mt-5 text-[15vw] leading-[0.84] tracking-[-0.05em] sm:text-[8.5vw]">
          <SplitLine text="Let's talk" delay={0.05} />
        </h2>

        <Reveal delay={0.3}>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink2 sm:text-lg">
            {IDENTITY.available}. Based in {IDENTITY.location}, and happy to talk across any
            timezone.
          </p>
        </Reveal>

        {/* direct lines, set large because they are the point of the page */}
        <ul className="mt-12 border-t border-line">
          {direct.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={0.06 + i * 0.04}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-5"
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

        {/* profile cards rather than a row of small grey words */}
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => (
            <li key={b.id}>
              <Reveal delay={0.05 + i * 0.03}>
                <a href={b.href} target="_blank" rel="noreferrer" className="badge group">
                  <span className="flex items-center gap-3.5">
                    <span className="badge__mark">{MARK[b.id].mark}</span>
                    <span>
                      <span className="block text-sm font-medium">{b.label}</span>
                      <span className="block text-xs text-muted">{MARK[b.id].note}</span>
                    </span>
                  </span>
                  <span className="arrow text-muted group-hover:text-accent">↗</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium">{IDENTITY.name}</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
              {IDENTITY.degree}, {IDENTITY.school}. {IDENTITY.years}.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="eyebrow hover:!text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="eyebrow mt-8 !text-muted">
          Every number on this site is reproducible from the repository it belongs to
        </p>
      </div>
    </footer>
  );
}
