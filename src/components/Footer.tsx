import Link from "next/link";
import { Reveal } from "./motion";
import ProfileCards from "./ProfileCards";
import { IDENTITY, CONTACT, NAV } from "@/content/site";

/**
 * The closing block.
 *
 * It used to restate the whole contact page: three large contact rows, seven
 * full-size chevrons and a long sign-off, running to 865px. There is a contact
 * page for that. This is a door to it at roughly half the height, on a stated
 * near-black ground so it reads as the end of the site in either theme.
 */
export default function Footer() {
  const email = CONTACT.find((c) => c.id === "email-college" && c.href);

  return (
    <footer data-section="Contact" className="closing">
      <div className="closing__glow" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* the same live status the hero opens with, so the page closes on the
            one fact a visitor is here to check */}
        <div className="closing__status">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {IDENTITY.available}
          </span>
          <span className="opacity-70">
            {IDENTITY.location} <span className="opacity-40">/</span> IST
          </span>
        </div>

        <div className="grid gap-9 py-11 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[5.5vw] lg:text-[3.1vw]">
                Let&rsquo;s talk<span className="text-accent">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link href="/contact" className="closing__cta group">
                  Every way to reach me <span className="arrow">↗</span>
                </Link>
                {email && (
                  <a href={email.href} className="closing__mail group">
                    {email.value} <span className="arrow text-[0.7em]">↗</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:col-span-7 lg:justify-self-end">
            <ProfileCards compact />
          </Reveal>
        </div>

        <div className="closing__base">
          <p className="text-[13px]">
            <span className="font-medium">{IDENTITY.name}</span>
            <span className="text-muted">
              {"  ·  "}
              {IDENTITY.degree}, {IDENTITY.school}, {IDENTITY.years}
            </span>
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1.5">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="eyebrow hover:!text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="eyebrow pb-9 pt-5 !text-muted">
          Every number on this site is reproducible from the repository it belongs to
        </p>
      </div>
    </footer>
  );
}
