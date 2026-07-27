import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "wfwca0w2",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
});
