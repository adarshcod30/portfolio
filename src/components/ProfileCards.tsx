import { Reveal } from "./motion";
import { CONTACT } from "@/content/site";

/** Short marks and a line of substance, so each profile is worth clicking. */
export const MARK: Record<string, { mark: string; note: string }> = {
  github: { mark: "GH", note: "32 public repositories" },
  linkedin: { mark: "in", note: "Experience and leadership" },
  pypi: { mark: "Py", note: "3 published packages" },
  huggingface: { mark: "HF", note: "Model spaces and demos" },
  kaggle: { mark: "Kg", note: "Competing on real datasets" },
  hackerrank: { mark: "HR", note: "Orchestrate rank #12" },
  hackerearth: { mark: "HE", note: "Challenges and contests" },
};

export default function ProfileCards() {
  const badges = CONTACT.filter((c) => c.href && MARK[c.id]);
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((b, i) => (
        <li key={b.id}>
          <Reveal delay={0.04 + i * 0.03}>
            <a
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className="chev chev--sm group"
            >
              <span className="chev__mark">{MARK[b.id].mark}</span>
              <span className="font-display mt-4 block text-lg leading-tight tracking-tight">
                {b.label}
              </span>
              <span className="chev__blurb mt-1.5 block flex-1 text-[13px] leading-relaxed">
                {MARK[b.id].note}
              </span>
              <svg
                className="chev__arrow mt-4"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
