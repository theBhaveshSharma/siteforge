import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function CafeTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Fraunces", Georgia, serif',
        fontBody: '"Source Sans 3", system-ui, sans-serif',
        bg: "#f7f1e8",
        fg: "#2c2118",
        muted: "#6b5a4a",
        accent: "#a35d3a",
        accentFg: "#fff8f0",
        surface: "#fff8f0",
        border: "#e4d5c3",
        heroOverlay: "rgba(44, 33, 24, 0.45)",
        layout: "classic",
      }}
    />
  );
}
