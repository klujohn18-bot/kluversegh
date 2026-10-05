// Hero section schema — editable headline, subtext, and CTA
const hero = {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    },
    {
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    },
    {
      name: "ctaLink",
      title: "CTA Button Link",
      type: "url",
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default hero;
