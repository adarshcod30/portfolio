import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section, Callout } from "@/components/UI";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from two years with Imagination, the LNMIIT photography club, and from running the MUN.",
};

// Add a file to public/photos and a row here. Kept as data so the grid stays honest
// about what each picture actually is.
const PHOTOS = [
  {
    src: "/photos/mun-venue.jpg",
    alt: "The LNM MUN 26 banner above the conference venue entrance, with a flag for each committee.",
    caption: "LNM MUN 26, day one",
    w: 900,
    h: 1600,
  },
  {
    src: "/photos/mun-hall.jpg",
    alt: "A full lecture hall of delegates at the opening session of LNMIIT MUN 2026.",
    caption: "Opening session, a full house",
    w: 1600,
    h: 1067,
  },
];

export default function Gallery() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Gallery"
        title="Through a viewfinder"
        blurb="Two years shooting for Imagination, the campus photography club, and a conference I helped run. The engineering pages are the argument; this is the other half of how I spent three years."
      />
      <Section title="Selected frames">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((p) => (
            <figure key={p.src} className="card overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                className="h-56 w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-xs text-muted">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8">
          <Callout>
            This gallery is deliberately small for now. It grows by dropping files into
            <span className="font-mono"> public/photos </span> and adding a row with a real
            caption, rather than padding it with frames that do not say anything.
          </Callout>
        </div>
      </Section>
    </>
  );
}
