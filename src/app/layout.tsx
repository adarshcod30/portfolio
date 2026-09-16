import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Hud } from "@/components/Chrome";
import { Preloader, Cursor } from "@/components/Entrance";
import { ScrollProgress } from "@/components/motion";
import Footer from "@/components/Footer";
import PagePager from "@/components/PagePager";
import { IDENTITY } from "@/content/site";

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
    default: `${IDENTITY.name} · ${IDENTITY.role}`,
    template: `%s · ${IDENTITY.name}`,
  },
  description: IDENTITY.tagline,
  openGraph: {
    title: `${IDENTITY.name} · ${IDENTITY.role}`,
    description: IDENTITY.tagline,
    type: "website",
  },
};

// Dark is the design now, so dark is the default. Light stays as a toggle for
// anyone who wants it; the system preference does not decide.
const THEME_BOOT = `(function(){var t='dark';try{t=localStorage.getItem('theme')||'dark';}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
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
        <PagePager />
        <Footer />
      </body>
    </html>
  );
}
