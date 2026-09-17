import { ImageResponse } from "next/og";
import { IDENTITY } from "@/content/site";

// LinkedIn, Slack and X only draw a card when the page names an image, so the
// share preview is generated here from the same identity the site renders.
export const alt = `${IDENTITY.name} · ${IDENTITY.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #05070d 0%, #0a1a2e 100%)",
          color: "#edf4ff",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#56cbf0", letterSpacing: 2 }}>
          ADARSHDWIVEDI.SITE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>{IDENTITY.name}</div>
          <div style={{ fontSize: 44, color: "#8fe3ff", marginTop: 16 }}>
            AI Engineer · Agentic AI · AI Products
          </div>
          <div style={{ fontSize: 30, color: "#b8c7dc", marginTop: 28, maxWidth: 1000, lineHeight: 1.35 }}>
            {IDENTITY.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8aa0bd" }}>
          Ex-Deloitte Agentic AI Intern · HackerRank Orchestrate #12 of 3,062 · LNMIIT
        </div>
      </div>
    ),
    size,
  );
}
