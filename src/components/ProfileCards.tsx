import { Reveal } from "./motion";
import { CONTACT } from "@/content/site";

/** Short marks, kept because the footer filters its direct lines against them. */
export const MARK: Record<string, { mark: string; note: string }> = {
  github: { mark: "GH", note: "32 public repositories" },
  linkedin: { mark: "in", note: "Experience and leadership" },
  pypi: { mark: "Py", note: "3 published packages" },
  huggingface: { mark: "HF", note: "Model spaces and demos" },
  kaggle: { mark: "Kg", note: "Competing on real datasets" },
  hackerrank: { mark: "HR", note: "Orchestrate rank #12" },
  hackerearth: { mark: "HE", note: "Challenges and contests" },
};

/**
 * The profile links, as the same upward outline chevron used to run up the left
 * edge of every page. That rail followed you down the whole site for links you
 * only ever want at the end of it, so the shape survived and the rail did not:
 * this is the one place it appears.
 */
export default function ProfileCards({ compact = false }: { compact?: boolean }) {
  const badges = CONTACT.filter((c) => c.href && MARK[c.id]);
  return (
    <ul className="flex flex-wrap gap-1">
      {badges.map((b, i) => (
        <li key={b.id}>
          <Reveal delay={0.04 + i * 0.03}>
            <a
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className={`railchev ${compact ? "" : "railchev--lg"}`}
              aria-label={`${b.label} profile`}
              title={MARK[b.id].note}
            >
              <svg
                className="railchev__edge"
                viewBox={compact ? "0 0 32 96" : "0 0 44 132"}
                aria-hidden="true"
                focusable="false"
              >
                <polygon
                  points={
                    compact
                      ? "0.6,13.4 16,0.6 31.4,13.4 31.4,95.4 16,82.6 0.6,95.4"
                      : "0.6,18.6 22,0.6 43.4,18.6 43.4,131.4 22,113.4 0.6,131.4"
                  }
                />
              </svg>
              <span className="railchev__label">{b.label}</span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
