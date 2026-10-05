import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Only create a real client if a valid project ID is configured
export const client = projectId && /^[a-z0-9-]+$/.test(projectId)
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
    })
  : null;
