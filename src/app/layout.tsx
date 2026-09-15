import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Hud } from "@/components/Chrome";
import { Preloader, Cursor } from "@/components/Entrance";
import { ScrollProgress } from "@/components/motion";
import { IDENTITY, CONTACT, NAV } from "@/content/site";

const sans = Geist({ variable: "--font-sans-stack", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-stack", subsets: ["latin"] });
// a variable grotesque with real optical presence at display sizes, which is the
// one thing a system font stack cannot fake
const display = Bricolage_Grotesque({
  variable: "--font-display-stack",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adarshdwivedi.vercel.app"),
  title: {
    default: `${IDENTITY.name} — ${IDENTITY.role}`,
    template: `%s — ${IDENTITY.name}`,
  },
  description: IDENTITY.tagline,
  openGraph: {
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description: IDENTITY.tagline,
    type: "website",
  },
};

// Light is the design, so light is the default. The system preference does not
// override it; only a visitor who has actually used the toggle gets dark.
const THEME_BOOT = `(function(){var t='light';try{t=localStorage.getItem('theme')||'light';}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const social = CONTACT.filter((c) => c.href && !c.primary);
  return (
    // the boot script stamps data-theme before React hydrates, so the server HTML
    // and the client necessarily differ on that one attribute
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <Hud />
        <main id="main">{children}</main>
        <footer className="border-t border-line px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[7vw]">
              Let&rsquo;s talk<span className="text-accent">.</span>
            </p>
            <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:justify-between">
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
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {social.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="eyebrow hover:!text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="eyebrow mt-8">
              Every number on this site is reproducible from the repository it belongs to
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
