import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function RealEstateTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"DM Serif Display", Georgia, serif',
        fontBody: '"Manrope", system-ui, sans-serif',
        bg: "#eef3f7",
        fg: "#132033",
        muted: "#5b6b7c",
        accent: "#0e7490",
        accentFg: "#ffffff",
        surface: "#ffffff",
        border: "#d0dde8",
        heroOverlay: "rgba(19, 32, 51, 0.45)",
        layout: "split",
      }}
    />
  );
}
