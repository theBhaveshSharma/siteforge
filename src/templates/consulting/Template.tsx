import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function ConsultingTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Libre Baskerville", Georgia, serif',
        fontBody: '"Source Sans 3", system-ui, sans-serif',
        bg: "#f8fafc",
        fg: "#0b1f33",
        muted: "#52637a",
        accent: "#1e3a5f",
        accentFg: "#f8fafc",
        surface: "#ffffff",
        border: "#dbe3ec",
        heroOverlay: "rgba(11, 31, 51, 0.4)",
        layout: "editorial",
      }}
    />
  );
}
