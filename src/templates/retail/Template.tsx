import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function RetailTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Bodoni Moda", Georgia, serif',
        fontBody: '"Karla", system-ui, sans-serif',
        bg: "#fff5f7",
        fg: "#2a1520",
        muted: "#7a5565",
        accent: "#be185d",
        accentFg: "#ffffff",
        surface: "#ffffff",
        border: "#f3d5e0",
        heroOverlay: "rgba(42, 21, 32, 0.4)",
        layout: "editorial",
      }}
    />
  );
}
