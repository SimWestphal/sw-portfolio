import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "2025-07-09" }), // Live needs a recent API version
  //  serverToken: process.env.SANITY_API_READ_TOKEN,
  // browserToken: process.env.SANITY_API_READ_TOKEN,
});
