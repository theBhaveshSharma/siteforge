import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function SalonTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Cormorant Garamond", Georgia, serif',
        fontBody: '"Outfit", system-ui, sans-serif',
        bg: "#141210",
        fg: "#f4efe8",
        muted: "#b7a99a",
        accent: "#c9a227",
        accentFg: "#141210",
        surface: "#1e1b18",
        border: "#2e2924",
        heroOverlay: "rgba(20, 18, 16, 0.55)",
        layout: "split",
      }}
    />
  );
}
