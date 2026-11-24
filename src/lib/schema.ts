import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  description: z.string().optional().default(""),
  price: z.string().optional().default(""),
});

export const hoursSchema = z.object({
  monday: z.string().default("9:00 AM – 5:00 PM"),
  tuesday: z.string().default("9:00 AM – 5:00 PM"),
  wednesday: z.string().default("9:00 AM – 5:00 PM"),
  thursday: z.string().default("9:00 AM – 5:00 PM"),
  friday: z.string().default("9:00 AM – 5:00 PM"),
  saturday: z.string().default("Closed"),
  sunday: z.string().default("Closed"),
});

export const socialsSchema = z.object({
  website: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  twitter: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
});

export const siteContentSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  phone: z.string().optional().default(""),
  email: z
    .string()
    .optional()
    .default("")
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Valid email required"),
  address: z.string().optional().default(""),
  about: z
    .string()
    .min(10, "Tell visitors a bit about your business")
    .default(""),
  ctaLabel: z.string().optional().default("Get in touch"),
  services: z.array(serviceSchema).default([]),
  hours: hoursSchema.default({
    monday: "9:00 AM – 5:00 PM",
    tuesday: "9:00 AM – 5:00 PM",
    wednesday: "9:00 AM – 5:00 PM",
    thursday: "9:00 AM – 5:00 PM",
    friday: "9:00 AM – 5:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  }),
  socials: socialsSchema.default({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  }),
  logoUrl: z.string().optional().default(""),
  heroImageUrl: z.string().optional().default(""),
  accentColor: z.string().optional().default(""),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type ServiceItem = z.infer<typeof serviceSchema>;

export const defaultSiteContent = (): SiteContent =>
  siteContentSchema.parse({
    businessName: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    about: "We are a local business dedicated to serving our community with care and quality.",
    ctaLabel: "Get in touch",
    services: [
      { title: "Service one", description: "Describe what you offer.", price: "" },
      { title: "Service two", description: "Add another offering.", price: "" },
    ],
    hours: {
      monday: "9:00 AM – 5:00 PM",
      tuesday: "9:00 AM – 5:00 PM",
      wednesday: "9:00 AM – 5:00 PM",
      thursday: "9:00 AM – 5:00 PM",
      friday: "9:00 AM – 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    socials: {
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
    logoUrl: "",
    heroImageUrl: "",
    accentColor: "",
  });

export function parseSiteContent(raw: string | unknown): SiteContent {
  if (typeof raw === "string") {
    return siteContentSchema.parse(JSON.parse(raw));
  }
  return siteContentSchema.parse(raw);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}
