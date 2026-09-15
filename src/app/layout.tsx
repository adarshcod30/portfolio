import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SideRail, TopBar } from "@/components/Chrome";
import { IDENTITY, CONTACT, NAV } from "@/content/site";

const sans = Geist({ variable: "--font-sans-stack", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-stack", subsets: ["latin"] });

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

// Set the theme before first paint so a dark-mode visitor never sees a white flash.
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
      className={`${sans.variable} ${mono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SideRail />
        <TopBar />
        <div className="lg:pl-14">
          <main id="main">{children}</main>
          <footer className="border-t border-line px-6 py-10 sm:px-10">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium">{IDENTITY.name}</p>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted">
                  {IDENTITY.degree}, {IDENTITY.school}. {IDENTITY.years}.
                </p>
              </div>
              <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="text-muted hover:text-accent">
                    {n.label}
                  </Link>
                ))}
              </nav>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                {social.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mx-auto mt-8 max-w-5xl text-[11px] text-muted">
              Built with Next.js. Every number on this site is reproducible from the
              repository it belongs to.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
