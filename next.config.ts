import type { NextConfig } from "next";
import { PROJECTS } from "./src/content/projects.generated";

// Project shots carry ?v=<hash of every shot>, written by build-content, so a
// replaced screenshot gets a new URL. Only that exact query is allowed.
const shotQuery = PROJECTS.find((p) => p.shot)?.shot.split("?")[1] ?? "";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      ...(shotQuery ? [{ pathname: "/shots/**", search: `?${shotQuery}` }] : []),
    ],
  },
};

export default nextConfig;
