import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function TradesTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Archivo Black", Impact, sans-serif',
        fontBody: '"IBM Plex Sans", system-ui, sans-serif',
        bg: "#f2f4f7",
        fg: "#0f172a",
        muted: "#475569",
        accent: "#0369a1",
        accentFg: "#ffffff",
        surface: "#ffffff",
        border: "#cbd5e1",
        heroOverlay: "rgba(15, 23, 42, 0.5)",
        layout: "bold",
      }}
    />
  );
}
