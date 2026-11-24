import type { SiteContent } from "@/lib/schema";

export type SiteTemplateProps = {
  content: SiteContent;
  /** When true, omit outer document chrome (used inside editor preview) */
  embedded?: boolean;
};

export type TemplateTheme = {
  fontDisplay: string;
  fontBody: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  surface: string;
  border: string;
  heroOverlay: string;
  layout: "classic" | "split" | "minimal" | "bold" | "editorial";
};

export const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export function contactMailto(content: SiteContent) {
  if (!content.email) return content.phone ? `tel:${content.phone}` : "#contact";
  return `mailto:${content.email}`;
}
