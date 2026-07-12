import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "wfwca0w2",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: false,
});
