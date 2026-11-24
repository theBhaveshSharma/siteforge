import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function LandscapingTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Josefin Sans", system-ui, sans-serif',
        fontBody: '"Mulish", system-ui, sans-serif',
        bg: "#f2f7ef",
        fg: "#1a2e1a",
        muted: "#4d644d",
        accent: "#3f6212",
        accentFg: "#f7fee7",
        surface: "#ffffff",
        border: "#d4e3c8",
        heroOverlay: "rgba(26, 46, 26, 0.45)",
        layout: "split",
      }}
    />
  );
}
