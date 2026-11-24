import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function PhotographyTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Playfair Display", Georgia, serif',
        fontBody: '"Inter", system-ui, sans-serif',
        bg: "#fafafa",
        fg: "#111111",
        muted: "#666666",
        accent: "#111111",
        accentFg: "#fafafa",
        surface: "#ffffff",
        border: "#e5e5e5",
        heroOverlay: "rgba(17, 17, 17, 0.35)",
        layout: "minimal",
      }}
    />
  );
}
