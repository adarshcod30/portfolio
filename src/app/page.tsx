import Image from "next/image";
import Link from "next/link";
import IceDome from "@/components/IceDome";
import { StatusStrip, Cta } from "@/components/Chrome";
import { HorizontalWork, SectionMarker } from "@/components/Scroller";
import { Reveal, Stagger, StagItem, SplitLine, Marquee, CountUp } from "@/components/motion";
import { IDENTITY, COMPETITIONS } from "@/content/site";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

const RAIL = [
  "kadi", "vayu", "krishimitra", "orbweaver", "agentiq",
  "cachellm", "medguardx", "floodcast", "openforensics",
];

const TICKER = [
  "LangGraph", "PyTorch", "FastAPI", "Next.js", "DuckDB", "CatBoost",
  "Amazon Bedrock", "MCP", "C++20", "LightGBM", "Postgres", "TypeScript",
];

export default function Home() {
  const rail = RAIL.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean);
  const headline = COMPETITIONS.filter((c) => c.highlight);
  const kadi = PROJECTS.find((p) => p.slug === "kadi");
  const pick = (s: string) => PROJECTS.find((p) => p.slug === s)!;
  const stages = [
    {
      label: "Farmers",
      back: pick("krishimitra"),
      front: pick("floodcast"),
      note: "Thirteen modules in twelve Indian languages, free to use, and a crop the district never grew is refused whatever the model says.",
    },
    {
      label: "Regulators",
      back: pick("vayu"),
      front: pick("margadrishti"),
      note: "Rank the intervention by modelled return, dispatch the order, then test with difference-in-differences whether it actually worked.",
    },
  ].filter((s) => s.back?.shot && s.front?.shot);

  return (
    <>
      <SectionMarker />

      {/* ---------------- hero: one object, almost nothing else ---------------- */}
      <section
        data-section="Home"
        className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-28 sm:px-8 sm:pt-32"
      >
        <IceDome className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[150vw] w-[150vw] max-h-[1000px] max-w-[1000px] -translate-x-1/2 -translate-y-[54%] opacity-90" />
        {/* the dome is brightest exactly where the headline sits, so a soft scrim
            keeps the type readable without hiding the object */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: [
              // centre: keeps the headline and tagline off the lit facets
              "radial-gradient(62% 48% at 50% 56%, color-mix(in oklab, var(--bg) 92%, transparent), color-mix(in oklab, var(--bg) 55%, transparent) 55%, transparent 78%)",
              // top-left corner: the status block sits here and the dome is bright
              // behind it, which swallowed the text entirely
              "radial-gradient(44% 34% at 0% 12%, var(--bg), color-mix(in oklab, var(--bg) 80%, transparent) 58%, transparent 84%)",
            ].join(", "),
          }}
        />

        {/* flush to the left edge of the section, not centred in the content column.
            z-[35] puts it above the fixed HUD scrim (z-30), which was painting over
            it and reading as if the text were being clipped. */}
        <div className="relative z-[35] w-full">
          <Reveal>
            <span className="on-dome inline-block">
              <StatusStrip />
            </span>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <h1 className="font-display text-[15vw] leading-[0.86] tracking-[-0.05em] sm:text-[9vw]">
            <SplitLine text="AI & Product" delay={0.2} />
            <SplitLine text="Engineer" delay={0.4} className="text-accent" />
          </h1>
          <Reveal delay={0.78}>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-ink2 sm:text-base">
              {IDENTITY.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.88}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Cta href="/work" solid>See the work</Cta>
              <Cta href="/contact">Get in touch</Cta>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Stagger className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line pt-5">
            {[
              { n: 32, s: "", label: "shipped products" },
              { n: 10, s: "+", label: "hackathons" },
              { n: 26, s: "", label: "case studies" },
              { n: 3, s: "", label: "PyPI packages" },
            ].map((x) => (
              <StagItem key={x.label}>
                <p className="font-display text-2xl leading-none text-accent sm:text-4xl">
                  <CountUp to={x.n} suffix={x.s} />
                </p>
                <p className="eyebrow mt-1.5">{x.label}</p>
              </StagItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Marquee items={TICKER} />

      {/* ---------------- work, moving sideways ---------------- */}
      <HorizontalWork items={rail} />

      {/* ---------------- offset frames ---------------- */}
      <section data-section="In the field" className="clear-hud px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">In the field</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              Built for people who
              <br />
              are not technical<span className="text-accent">.</span>
            </h2>
          </Reveal>

          {stages.map((s, i) => (
            <div key={s.back.slug} className={`stage mt-20 sm:mt-28 ${i % 2 ? "stage--flip" : ""}`}>
              <Reveal className="stage__back">
                <Link href={`/work/${s.back.slug}`} className="panel block aspect-[16/10]">
                  <Image src={s.back.shot} alt={`${s.back.name} running: ${s.back.tagline}.`} width={1440} height={900} />
                </Link>
              </Reveal>
              <Reveal delay={0.12} className="stage__front">
                <Link href={`/work/${s.front.slug}`} className="panel block aspect-[4/3]">
                  <Image src={s.front.shot} alt={`${s.front.name} running: ${s.front.tagline}.`} width={1080} height={810} />
                </Link>
              </Reveal>
              <Reveal delay={0.2} className="stage__caption">
                <p className="eyebrow">{String(i + 1).padStart(2, "0")} — {s.label}</p>
                <p className="font-display mt-2 text-2xl leading-tight tracking-tight sm:text-3xl">{s.back.name}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.note}</p>
                <Link href={`/work/${s.back.slug}`} className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  Case study <span className="arrow">↗</span>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- bento ---------------- */}
      <section data-section="At a glance" className="clear-hud slab-quiet border-y border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="eyebrow">At a glance</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              The short version<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <Stagger className="bento mt-14" gap={0.05}>
            {kadi?.shot && (
              <StagItem className="tile-frame tile-frame--media tile-frame--wide">
                <Link href="/work/kadi" className="group relative block h-full w-full">
                  <Image src={kadi.shot} alt="The Kadi command dashboard running, with the case-linkage graph and district map." width={1440} height={900}
                    className="h-full w-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
                    <span className="eyebrow !text-white/70">Flagship</span>
                    <span className="font-display mt-1 block text-2xl tracking-tight text-white sm:text-3xl">Kadi <span className="arrow">↗</span></span>
                    <span className="mt-1 block text-xs text-white/75">59,985 FIRs across 31 districts, deployed for the Karnataka State Police</span>
                  </span>
                </Link>
              </StagItem>
            )}
            <StagItem className="tile-frame tile-frame--accent ticks">
              <p className="eyebrow !text-white/75">Best forecast</p>
              <div><p className="tile-num">0.870</p>
                <p className="mt-2 text-xs leading-relaxed text-white/85">AUC, three months ahead, on Kadi&rsquo;s state-wide crime forecast</p></div>
            </StagItem>
            <StagItem className="tile-frame">
              <p className="eyebrow">Cost cut</p>
              <div><p className="tile-num text-accent">78%</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">Lower spend at a 77% cache hit rate, with zero wrong answers on new questions</p></div>
            </StagItem>
            <StagItem className="tile-frame tile-frame--fill ticks">
              <p className="eyebrow">Published</p>
              <div><p className="tile-num">3</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">packages on PyPI: cachellm-proxy, creditsetu, medguardx-core</p></div>
            </StagItem>
            <StagItem className="tile-frame">
              <p className="eyebrow">Largest graph</p>
              <div><p className="tile-num text-accent">35.7M</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">edges in Orbweaver&rsquo;s account graph, 0.7292 ring precision against a 0.2242 base rate</p></div>
            </StagItem>
            <StagItem className="tile-frame tile-frame--wide">
              <p className="eyebrow">The rule I keep</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink2">
                Where a result is unflattering I publish it anyway: the 0.371 genuine customers wrongly
                swept in per fraudster caught, and 36 dated failures beside the wins.
              </p>
            </StagItem>
            <StagItem className="tile-frame">
              <p className="eyebrow">Languages shipped</p>
              <div><p className="tile-num text-accent">12</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">Indian languages in KrishiMitra, free to use, across 13 modules</p></div>
            </StagItem>
          </Stagger>
        </div>
      </section>

      {/* ---------------- domains ---------------- */}
      <section data-section="Domains" className="clear-hud px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="eyebrow">How it is organised</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              Five domains<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {DOMAINS.map((d) => {
              const n = PROJECTS.filter((p) => p.domain === d.id).length;
              return (
                <StagItem key={d.id}>
                  <Link href={`/work#${d.id}`} className="chev group">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg leading-tight tracking-tight">
                        {d.title}
                      </span>
                      <span className="idx">{String(n).padStart(2, "0")}</span>
                    </span>
                    <span className="chev__blurb mt-3 flex-1 text-[13px] leading-relaxed">
                      {d.blurb}
                    </span>
                    <svg
                      className="chev__arrow mt-5"
                      width="22"
                      height="22"
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
                  </Link>
                </StagItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------------- competitions ---------------- */}
      <section data-section="Competitions" className="clear-hud slab-invert px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="eyebrow">Measured against other people</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              Ten and counting<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
            {headline.map((c) => (
              <StagItem key={c.name}>
                <article className="card tile h-full p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg tracking-tight">{c.name}</h3>
                    <span className="idx">{c.when}</span>
                  </div>
                  <p className="font-display mt-4 text-2xl leading-tight text-accent sm:text-3xl">{c.result}</p>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink2">{c.detail}</p>
                </article>
              </StagItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <p className="mt-10">
              <Link href="/competitions" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
                Every competition, including the ones I did not win <span className="arrow">↗</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- method ---------------- */}
      <section data-section="Method" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal><p className="eyebrow">The method</p></Reveal>
          <Reveal delay={0.06}>
            <p className="font-display mt-5 text-[7vw] leading-[1.04] tracking-[-0.035em] sm:text-[3.2vw]">
              A model is allowed to <span className="text-accent">propose</span>. Something
              deterministic is what <span className="text-accent">decides</span>.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink2">
              That separation is the decision repeated most across these projects, because it is what
              makes &ldquo;why did this happen?&rdquo; answerable by a person. Ring membership in
              Orbweaver comes from a peeling objective with a proved one-half approximation bound, so the
              answer is checkable arithmetic rather than a model&rsquo;s opinion. AGENTIQ generates test
              assertions with a language model and then evaluates them with a tool, because a model
              grading its own output is not evidence.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
