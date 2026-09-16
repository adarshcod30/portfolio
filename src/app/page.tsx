import Image from "next/image";
import Link from "next/link";
import IceDome from "@/components/IceDome";
import { StatusStrip, Cta } from "@/components/Chrome";
import Stack from "@/components/Stack";
import { Reveal, Stagger, StagItem, SplitLine, CountUp } from "@/components/motion";
import { IDENTITY, COMPETITIONS, COUNT_WORD } from "@/content/site";
import { PROJECTS, DOMAINS } from "@/content/projects.generated";

export default function Home() {
  const headline = COMPETITIONS.filter((c) => c.highlight);
  const graph = PROJECTS.find((p) => p.slug === "graphsuite");
  const pick = (s: string) => PROJECTS.find((p) => p.slug === s)!;
  // Six products, paired so each stage overlaps two frames, and every project
  // carries its own audience and note in the gutter beside its own frame.
  const stages = [
    {
      back: {
        p: pick("krishimitra"),
        who: "For smallholder farmers",
        note: "Thirteen modules in twelve Indian languages, free to use, each built around a question a farmer actually asks. A crop the district has never grown is refused whatever the model says.",
      },
      front: {
        p: pick("floodcast"),
        who: "For daily commuters",
        note: "Answers the one question a commuter asks, will my route flood and when, by matching live rainfall against 73 researched flood points instead of issuing a city-wide alert.",
      },
    },
    {
      back: {
        p: pick("vayu"),
        who: "For pollution regulators",
        note: "Enforcement usually targets the dirtiest sensor rather than the site where action pays most. Ranks interventions by Gaussian-plume modelled return, then tests whether the order actually worked.",
      },
      front: {
        p: pick("margadrishti"),
        who: "For city traffic planners",
        note: "Models where Bengaluru loses road capacity and when, over 298k violations, with strictly causal lag features so nothing leaks from the future. Publishes what the data cannot answer.",
      },
    },
    {
      back: {
        p: pick("kadi"),
        who: "For police stations and the state bureau",
        note: "A station officer gets a ranked case queue with a plain-language reason and a next action. The bureau reads state-wide analysis off the same graph of 59,985 records.",
      },
      front: {
        p: pick("agentiq"),
        who: "For the engineers who ship APIs",
        note: "Turns a URL and a plain-English intent into executable functional and security tests, with every agent action passing through 19 schema-validated tools that are granted per host and audited.",
      },
    },
  ].filter((s) => s.back.p && s.front.p);

  return (
    <>

      {/* ---------------- hero: one object, almost nothing else ---------------- */}
      <section
        data-section="Home"
        className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-28 sm:px-8 sm:pt-32"
      >
        {/* the crown sits just under the calls to action: anchored at 56% of the
            hero, the dome rises into frame from below rather than being cut off
            by the top of the window */}
        <IceDome className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[150vw] w-[150vw] max-h-[880px] max-w-[880px] -translate-x-1/2 -translate-y-[49.3%] opacity-90" />
        {/* Five points lower than it used to sit, and capped at 880px rather than
            1000, so the base clears the figure row instead of running under it.
            The dome is brightest exactly where the headline sits, so a soft scrim
            keeps the type readable without hiding the object. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: [
              // the figure row, which sits directly on the crown
              // centre: keeps the headline and tagline off the lit facets
              "radial-gradient(62% 48% at 50% 54%, color-mix(in oklab, var(--bg) 92%, transparent), color-mix(in oklab, var(--bg) 55%, transparent) 55%, transparent 78%)",
              // top left: the status block sits here and the dome is bright behind it
              "radial-gradient(44% 34% at 0% 12%, var(--bg), color-mix(in oklab, var(--bg) 80%, transparent) 58%, transparent 84%)",
              // and the figure row along the bottom, which the dome now reaches
              "linear-gradient(to top, var(--bg) 6%, color-mix(in oklab, var(--bg) 70%, transparent) 16%, transparent 27%)",
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
          <Stagger className="grid grid-cols-3 border-t border-line sm:grid-cols-6">
            {[
              { n: 32, s: "", label: "shipped products" },
              { n: 26, s: "", label: "case studies" },
              { n: 10, s: "+", label: "hackathons" },
              { n: DOMAINS.length, s: "", label: "problem domains" },
              { n: 3, s: "", label: "PyPI packages" },
              { n: 12, p: "#", s: "", label: "Orchestrate" },
            ].map((x) => (
              <StagItem
                key={x.label}
                className="border-line px-2 py-5 text-center sm:[&:not(:first-child)]:border-l"
              >
                <p className="font-display text-2xl leading-none text-accent sm:text-4xl">
                  <CountUp to={x.n} prefix={x.p} suffix={x.s} />
                </p>
                <p className="eyebrow mt-1.5">{x.label}</p>
              </StagItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Stack />

      {/* ---------------- offset frames ---------------- */}
      <section data-section="In the field" className="clear-hud px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">In the field</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              Built for people who are technical,
              <br />
              and people who are not<span className="text-accent">.</span>
            </h2>
          </Reveal>

          {stages.map((st, i) => {
            const flip = i % 2 === 1;
            const Frame = ({
              e,
              ratio,
              w,
              h,
            }: {
              e: (typeof stages)[number]["back"];
              ratio: string;
              w: number;
              h: number;
            }) => (
              <Link href={`/work/${e.p.slug}`} className={`panel block ${ratio}`}>
                {e.p.shot ? (
                  <Image
                    src={e.p.shot}
                    alt={`${e.p.name} running: ${e.p.tagline}.`}
                    width={w}
                    height={h}
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center bg-accentsoft px-6">
                    <span className="font-display text-center text-2xl tracking-tight text-accent opacity-60">
                      {e.p.name}
                    </span>
                  </span>
                )}
              </Link>
            );
            const Caption = ({
              e,
              n,
            }: {
              e: (typeof stages)[number]["back"];
              n: number;
            }) => (
              <>
                <p className="eyebrow">
                  {String(n).padStart(2, "0")} <span className="opacity-40">/</span> {e.who}
                </p>
                <p className="font-display mt-2 text-2xl leading-tight tracking-tight sm:text-[28px]">
                  {e.p.name}
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{e.note}</p>
                <Link
                  href={`/work/${e.p.slug}`}
                  className="group mt-3.5 inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  Case study <span className="arrow">↗</span>
                </Link>
              </>
            );

            return (
              <div key={st.back.p.slug} className={`stage mt-20 sm:mt-32 ${flip ? "stage--flip" : ""}`}>
                <Reveal className="stage__back">
                  <Frame e={st.back} ratio="aspect-[16/10]" w={1440} h={900} />
                </Reveal>
                <Reveal delay={0.1} className="stage__cap-a">
                  <Caption e={st.back} n={i * 2 + 1} />
                </Reveal>
                <Reveal delay={0.16} className="stage__front">
                  <Frame e={st.front} ratio="aspect-[4/3]" w={1080} h={810} />
                </Reveal>
                <Reveal delay={0.24} className="stage__cap-b">
                  <Caption e={st.front} n={i * 2 + 2} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- the engine ---------------- */}
      {graph?.shot && (
        <section data-section="Under the products" className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">Under the products</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display mt-3 text-[9vw] leading-[0.96] tracking-[-0.035em] sm:text-[3.2vw] lg:text-[2.35vw]">
                  Twelve routing algorithms, compiled
                  into the browser<span className="text-accent">.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink2">
                  {graph.name}, in C++20 over 1.7M junctions. Contraction Hierarchies reach 44x
                  faster with 460x fewer settled nodes than Dijkstra, and every route is verified
                  exact against a reference implementation rather than trusted on the speedup.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="mt-8 grid max-w-sm grid-cols-2 gap-x-6 gap-y-6">
                  {[
                    ["1.7M", "junctions"],
                    ["44x", "faster than Dijkstra"],
                    ["38 ms", "to re-cost 207k nodes"],
                    ["0", "servers to run it"],
                  ].map(([v, k]) => (
                    <div key={k}>
                      <dt className="font-display text-2xl leading-none tracking-tight text-accent sm:text-3xl">
                        {v}
                      </dt>
                      <dd className="eyebrow mt-1.5">{k}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal delay={0.26}>
                <Link
                  href={`/work/${graph.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  Read the case study <span className="arrow">↗</span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="lg:col-span-7">
              {/* the panel matches the image's own ratio, so nothing is cropped
                  and the search is readable at this size */}
              <Link
                href={`/work/${graph.slug}`}
                className="panel group block aspect-[1660/1178] overflow-hidden"
              >
                <Image
                  src="/shots/graphsuite-band.jpg"
                  alt="The Adaptive Graph Search Suite running: a bidirectional Dijkstra search across the Indian national highway network."
                  width={1660}
                  height={1178}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                />
              </Link>
              <p className="eyebrow mt-3 !text-muted">
                Bidirectional Dijkstra over the national highway grid, 30.9 ms in the tab
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- domains ---------------- */}
      <section data-section="Domains" className="clear-hud px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="eyebrow">How it is organised</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3 text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[5vw]">
              {COUNT_WORD[DOMAINS.length]} domains<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {DOMAINS.map((d) => {
              const inDomain = PROJECTS.filter((p) => p.domain === d.id);
              const names = inDomain.slice(0, 3).map((p) => p.name);
              const rest = inDomain.length - names.length;
              return (
                <StagItem key={d.id} className="h-full">
                  <Link href={`/work#${d.id}`} className="chev group">
                    {/* clip-path removes any border, so the edge is drawn as an
                        svg on top of it. preserveAspectRatio none matches the
                        polygon exactly at any tile height, and the stroke is
                        kept off the scaling so it stays a hairline. */}
                    <svg
                      className="chev__edge"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <polygon
                        points="0,11 50,0 100,11 100,100 50,89 0,100"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    <span className="chev__n">{String(inDomain.length).padStart(2, "0")}</span>
                    <span className="font-display mt-1 block text-[19px] leading-tight tracking-tight">
                      {d.title}
                    </span>
                    <span className="chev__rule" />
                    <span className="chev__blurb block text-[13px] leading-relaxed">
                      {d.blurb}
                    </span>
                    <span className="chev__names mt-auto block">
                      {names.join("  ·  ")}
                      {rest > 0 && <span className="opacity-60">{`  +${rest} more`}</span>}
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
