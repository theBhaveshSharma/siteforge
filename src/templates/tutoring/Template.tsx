import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function TutoringTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Fredoka", system-ui, sans-serif',
        fontBody: '"Nunito", system-ui, sans-serif',
        bg: "#fff9f0",
        fg: "#1f2a44",
        muted: "#5c6b86",
        accent: "#2563eb",
        accentFg: "#ffffff",
        surface: "#ffffff",
        border: "#f0e2cc",
        heroOverlay: "rgba(31, 42, 68, 0.35)",
        layout: "classic",
      }}
    />
  );
}
