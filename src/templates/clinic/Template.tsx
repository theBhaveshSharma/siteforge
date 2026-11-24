import { ThemedSiteTemplate } from "../shared";
import type { SiteTemplateProps } from "../types";

export default function ClinicTemplate(props: SiteTemplateProps) {
  return (
    <ThemedSiteTemplate
      {...props}
      theme={{
        fontDisplay: '"Lora", Georgia, serif',
        fontBody: '"Nunito Sans", system-ui, sans-serif',
        bg: "#f3faf8",
        fg: "#14353a",
        muted: "#4d6b70",
        accent: "#0d9488",
        accentFg: "#ffffff",
        surface: "#ffffff",
        border: "#d5ebe6",
        heroOverlay: "rgba(20, 53, 58, 0.4)",
        layout: "classic",
      }}
    />
  );
}
