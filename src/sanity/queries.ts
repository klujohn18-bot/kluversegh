import { groq } from "next-sanity";
import { client } from "./client";

// Fetch hero section
export async function getHero() {
  if (!client) return null;
  return client.fetch(
    groq`*[_type == "hero"][0]{
      heading,
      subheading,
      ctaText,
      ctaLink,
      backgroundImage
    }`
  );
}

// Fetch all features ordered by display order
export async function getFeatures() {
  if (!client) return [];
  return client.fetch(
    groq`*[_type == "feature"] | order(order asc){
      _id,
      title,
      description,
      icon,
      order
    }`
  );
}
