import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function FitnessTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Bebas Neue", Impact, sans-serif',
        fontBody: '"DM Sans", system-ui, sans-serif',
        bg: "#0a0a0a",
        fg: "#f5f5f5",
        muted: "#a3a3a3",
        accent: "#ef4444",
        accentFg: "#ffffff",
        surface: "#171717",
        border: "#262626",
        heroOverlay: "rgba(0, 0, 0, 0.55)",
        layout: "bold",
      }}
    />
  );
}
