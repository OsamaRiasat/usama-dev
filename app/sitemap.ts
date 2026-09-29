import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.8 })),
  ];
}
