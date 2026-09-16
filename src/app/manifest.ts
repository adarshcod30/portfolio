import type { MetadataRoute } from "next";
import { IDENTITY } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${IDENTITY.name} · ${IDENTITY.role}`,
    short_name: IDENTITY.name,
    description: IDENTITY.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#05070d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
