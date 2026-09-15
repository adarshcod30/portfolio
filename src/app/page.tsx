import Image from "next/image";
import Link from "next/link";
import NodeField from "@/components/NodeField";
import PolyBlob from "@/components/PolyBlob";
import { StatusStrip, Cta } from "@/components/Chrome";
import { Reveal, Stagger, StagItem, SplitLine, Marquee, CountUp } from "@/components/motion";
import { IDENTITY, COMPETITIONS } from "@/content/site";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

const FEATURED = ["kadi", "agentiq", "vayu", "krishimitra"];

const TICKER = [
  "LangGraph", "PyTorch", "FastAPI", "Next.js", "DuckDB", "CatBoost",
  "Amazon Bedrock", "MCP", "C++20", "LightGBM", "Postgres", "TypeScript",
];

export default function Home() {
  const featured = FEATURED.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean);
  const headline = COMPETITIONS.filter((c) => c.highlight);
  const kadi = PROJECTS.find((p) => p.slug === "kadi");

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pt-36">
        <NodeField />
        {/* the faceted shape, sized to collide with the headline rather than sit beside it */}
        <PolyBlob className="pointer-events-none absolute right-[-26%] top-[14%] z-0 h-[78vw] w-[78vw] max-h-[620px] max-w-[620px] opacity-95 sm:right-[-12%] sm:top-[8%]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Reveal>
            <StatusStrip />
          </Reveal>

          <h1 className="font-display mt-8 text-[14vw] leading-[0.88] tracking-[-0.045em] sm:mt-10 sm:text-[12vw]">
            <SplitLine text="AI & Product" delay={0.15} />
            <SplitLine text="Engineer" delay={0.34} className="text-accent" />
          </h1>

          <Reveal delay={0.7} className="mt-8 max-w-xl">
            <p className="text-[15px] leading-relaxed text-ink2 sm:text-lg">
              {IDENTITY.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.82}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Cta href="/work" solid>
                See the work
              </Cta>
              <Cta href="/contact">Get in touch</Cta>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto mt-14 w-full max-w-6xl">
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-7 sm:grid-cols-4">
            {[
              { n: 32, s: "", label: "shipped products" },
              { n: 10, s: "+", label: "hackathons & datathons" },
              { n: 26, s: "", label: "case studies here" },
              { n: 3, s: "", label: "packages on PyPI" },
            ].map((x) => (
              <StagItem key={x.label}>
                <p className="font-display text-4xl leading-none text-accent sm:text-6xl">
                  <CountUp to={x.n} suffix={x.s} />
                </p>
                <p className="eyebrow mt-2">{x.label}</p>
              </StagItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Marquee items={TICKER} />

      {/* ---------------- selected work ---------------- */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Selected work</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5.5vw]">
              Four that carry
              <br />
              the rest<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <ul className="mt-14 border-t border-line">
            {featured.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="tile group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-7 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-8 sm:py-9"
                  >
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-display block text-2xl leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                        {p.name}
                      </span>
                      <span className="mt-1.5 block text-xs text-muted sm:text-sm">
                        {p.tagline}
                      </span>
                      <span className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="chip">{s}</span>
                        ))}
                      </span>
                    </span>
                    {p.shot && (
                      <span className="hidden h-24 w-44 shrink-0 overflow-hidden rounded-xl border border-line sm:block">
                        <Image
                          src={p.shot}
                          alt=""
                          width={880}
                          height={550}
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                        />
                      </span>
                    )}
                    <span className="arrow text-lg text-muted group-hover:text-accent sm:text-2xl">
                      ↗
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-10">
              <Link href="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
                All 26 projects, grouped by domain
                <span className="arrow">↗</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- domains ---------------- */}
      <section className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">How it is organised</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5.5vw]">
              Five domains<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d) => {
              const n = PROJECTS.filter((p) => p.domain === d.id).length;
              return (
                <StagItem key={d.id}>
                  <Link href={`/work#${d.id}`} className="card tile group flex h-full flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg leading-tight tracking-tight group-hover:text-accent">
                        {d.title}
                      </h3>
                      <span className="idx">{String(n).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{d.blurb}</p>
                    <span className="arrow mt-5 text-muted group-hover:text-accent">↗</span>
                  </Link>
                </StagItem>
              );
            })}
          </Stagger>
        </div>
      </section>


      {/* ---------------- bento ---------------- */}
      <section className="slab-quiet border-y border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">At a glance</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5.5vw]">
              The short version<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <Stagger className="bento mt-14" gap={0.05}>
            {kadi?.shot && (
              <StagItem className="tile-frame tile-frame--media tile-frame--wide">
                <Link href="/work/kadi" className="group relative block h-full w-full">
                  <Image
                    src={kadi.shot}
                    alt="The Kadi command dashboard running, with the case-linkage graph and district map."
                    width={1440}
                    height={900}
                    className="h-full w-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-6 pt-16">
                    <span className="eyebrow !text-white/70">Flagship</span>
                    <span className="font-display mt-1 block text-2xl tracking-tight text-white sm:text-3xl">
                      Kadi <span className="arrow">↗</span>
                    </span>
                    <span className="mt-1 block text-xs text-white/75">
                      59,985 FIRs across 31 districts, deployed for the Karnataka State Police
                    </span>
                  </span>
                </Link>
              </StagItem>
            )}

            <StagItem className="tile-frame tile-frame--accent ticks">
              <p className="eyebrow !text-white/75">Best forecast</p>
              <div>
                <p className="tile-num">0.870</p>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  AUC, three months ahead, on Kadi&rsquo;s state-wide crime forecast
                </p>
              </div>
            </StagItem>

            <StagItem className="tile-frame">
              <p className="eyebrow">Cost cut</p>
              <div>
                <p className="tile-num text-accent">78%</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Lower spend at a 77% cache hit rate, with zero wrong answers on new questions
                </p>
              </div>
            </StagItem>

            <StagItem className="tile-frame tile-frame--fill ticks">
              <p className="eyebrow !text-white/70">Published</p>
              <div>
                <p className="tile-num">3</p>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  packages on PyPI: cachellm-proxy, creditsetu, medguardx-core
                </p>
              </div>
            </StagItem>

            <StagItem className="tile-frame">
              <p className="eyebrow">Largest graph</p>
              <div>
                <p className="tile-num text-accent">35.7M</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  edges in Orbweaver&rsquo;s account graph, 0.7292 ring precision against a 0.2242 base rate
                </p>
              </div>
            </StagItem>

            <StagItem className="tile-frame tile-frame--wide">
              <p className="eyebrow">The rule I keep</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink2">
                Where a result is unflattering I publish it anyway: the 0.371 genuine customers
                wrongly swept in per fraudster caught, and 36 dated failures beside the wins.
              </p>
            </StagItem>

            <StagItem className="tile-frame">
              <p className="eyebrow">Languages shipped</p>
              <div>
                <p className="tile-num text-accent">12</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Indian languages in KrishiMitra, free to use, across 13 modules
                </p>
              </div>
            </StagItem>
          </Stagger>
        </div>
      </section>

      {/* ---------------- competitions ---------------- */}
      <section className="slab-invert px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Measured against other people</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5.5vw]">
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
                  <p className="font-display mt-4 text-2xl leading-tight text-accent sm:text-3xl">
                    {c.result}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink2">{c.detail}</p>
                </article>
              </StagItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <p className="mt-10">
              <Link href="/competitions" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
                Every competition, including the ones I did not win
                <span className="arrow">↗</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- the method ---------------- */}
      <section className="slab-quiet border-t border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow">The method</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-display mt-5 text-[7vw] leading-[1.02] tracking-[-0.035em] sm:text-[3.4vw]">
              A model is allowed to <span className="text-accent">propose</span>. Something
              deterministic is what <span className="text-accent">decides</span>.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink2">
              That separation is the decision repeated most across these projects, because it
              is what makes &ldquo;why did this happen?&rdquo; answerable by a person. Ring
              membership in Orbweaver comes from a peeling objective with a proved one-half
              approximation bound, so the answer is checkable arithmetic rather than a
              model&rsquo;s opinion. AGENTIQ generates test assertions with a language model
              and then evaluates them with a tool, because a model grading its own output is
              not evidence. KrishiMitra will not recommend a crop the district has no record
              of growing, whatever the model says.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
