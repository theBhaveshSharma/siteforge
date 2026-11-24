import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function AutoRepairTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Oswald", Impact, sans-serif',
        fontBody: '"Roboto Condensed", system-ui, sans-serif',
        bg: "#1c1917",
        fg: "#fafaf9",
        muted: "#a8a29e",
        accent: "#ea580c",
        accentFg: "#ffffff",
        surface: "#292524",
        border: "#44403c",
        heroOverlay: "rgba(28, 25, 23, 0.55)",
        layout: "bold",
      }}
    />
  );
}
