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
  );
}
