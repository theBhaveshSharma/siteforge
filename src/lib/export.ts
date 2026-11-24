import JSZip from "jszip";
import type { SiteContent } from "@/lib/schema";
import type { TemplateTheme } from "@/templates/types";
import { DAY_ORDER } from "@/templates/types";

const THEMES: Record<string, TemplateTheme> = {
  cafe: {
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
  },
  salon: {
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
  },
  trades: {
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
  },
  consulting: {
    fontDisplay: '"Libre Baskerville", Georgia, serif',
    fontBody: '"Source Sans 3", system-ui, sans-serif',
    bg: "#f8fafc",
    fg: "#0b1f33",
    muted: "#52637a",
    accent: "#1e3a5f",
    accentFg: "#f8fafc",
    surface: "#ffffff",
    border: "#dbe3ec",
    heroOverlay: "rgba(11, 31, 51, 0.4)",
    layout: "editorial",
  },
  fitness: {
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
  },
  photography: {
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontBody: "system-ui, sans-serif",
    bg: "#fafafa",
    fg: "#111111",
    muted: "#666666",
    accent: "#111111",
    accentFg: "#fafafa",
    surface: "#ffffff",
    border: "#e5e5e5",
    heroOverlay: "rgba(17, 17, 17, 0.35)",
    layout: "minimal",
  },
  realestate: {
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
  },
  tutoring: {
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
  },
  clinic: {
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
  },
  retail: {
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
  },
  landscaping: {
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
  },
  autorepair: {
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
  },
};

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bebas+Neue&family=Bodoni+Moda:opsz@6..96&family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@400;600&family=DM+Serif+Display&family=Fraunces:opsz,wght@9..144,600&family=Fredoka:wght@500;600&family=IBM+Plex+Sans:wght@400;600&family=Josefin+Sans:wght@600&family=Karla:wght@400;600&family=Libre+Baskerville:wght@400;700&family=Lora:wght@600&family=Manrope:wght@400;600&family=Mulish:wght@400;600&family=Nunito:wght@400;600&family=Nunito+Sans:wght@400;600&family=Oswald:wght@500;600&family=Outfit:wght@400;600&family=Playfair+Display:wght@600&family=Roboto+Condensed:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function contactHref(content: SiteContent) {
  if (content.email) return `mailto:${content.email}`;
  if (content.phone) return `tel:${content.phone}`;
  return "#contact";
}

export function renderSiteHtml(templateKey: string, content: SiteContent): string {
  const theme = THEMES[templateKey] ?? THEMES.cafe;
  const accent = content.accentColor || theme.accent;
  const name = escapeHtml(content.businessName || "Your Business");
  const tagline = escapeHtml(content.tagline || "");
  const about = escapeHtml(content.about || "");
  const cta = escapeHtml(content.ctaLabel || "Get in touch");
  const href = contactHref(content);

  const services = (content.services?.length
    ? content.services
    : [{ title: "Service", description: "", price: "" }]
  )
    .map(
      (s) => `
      <article style="padding:1.25rem;background:var(--t-surface);border:1px solid var(--t-border)">
        <h3 style="font-family:var(--t-font-display);margin:0 0 0.5rem;font-size:1.2rem">${escapeHtml(s.title)}</h3>
        ${s.description ? `<p style="color:var(--t-muted);margin:0 0 0.75rem;line-height:1.55">${escapeHtml(s.description)}</p>` : ""}
        ${s.price ? `<p style="margin:0;color:var(--t-accent);font-weight:600">${escapeHtml(s.price)}</p>` : ""}
      </article>`
    )
    .join("");

  const hours = DAY_ORDER.map(
    (day) => `
      <div style="display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--t-border);padding-bottom:0.5rem">
        <dt style="text-transform:capitalize;color:var(--t-muted)">${day}</dt>
        <dd style="margin:0">${escapeHtml(content.hours?.[day] || "—")}</dd>
      </div>`
  ).join("");

  const socials = Object.entries(content.socials || {})
    .filter(([, v]) => Boolean(v))
    .map(
      ([key, url]) =>
        `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" style="color:var(--t-accent);text-decoration:none;text-transform:capitalize">${escapeHtml(key)}</a>`
    )
    .join("");

  let hero = "";
  if (theme.layout === "split") {
    hero = `
    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));min-height:70vh">
      <div style="padding:4rem 2rem;display:flex;flex-direction:column;justify-content:center;background:var(--t-surface)">
        <h1 style="font-family:var(--t-font-display);font-size:clamp(2.25rem,5vw,3.75rem);line-height:1.05;margin:0 0 1rem">${name}</h1>
        <p style="color:var(--t-muted);font-size:1.15rem;margin-bottom:1.5rem">${tagline}</p>
        <a href="${href}" style="align-self:flex-start;background:var(--t-accent);color:var(--t-accent-fg);padding:0.85rem 1.4rem;text-decoration:none;font-weight:600">${cta}</a>
      </div>
      <div style="min-height:320px;background:${
        content.heroImageUrl
          ? `url(${escapeHtml(content.heroImageUrl)}) center/cover`
          : "linear-gradient(160deg, var(--t-accent), var(--t-bg))"
      }"></div>
    </section>`;
  } else if (theme.layout === "minimal") {
    hero = `
    <section style="padding:6rem 1.5rem 4rem;text-align:center;max-width:800px;margin:0 auto">
      <h1 style="font-family:var(--t-font-display);font-size:clamp(2.5rem,7vw,5rem);line-height:1;margin:0 0 1.25rem;letter-spacing:-0.04em">${name}</h1>
      <p style="color:var(--t-muted);font-size:1.25rem;margin-bottom:2rem">${tagline}</p>
      <a href="${href}" style="color:var(--t-accent);border-bottom:2px solid var(--t-accent);text-decoration:none;padding-bottom:4px;font-weight:600">${cta}</a>
    </section>`;
  } else if (theme.layout === "bold") {
    hero = `
    <section style="padding:5rem 1.5rem;background:var(--t-accent);color:var(--t-accent-fg);text-align:center">
      <h1 style="font-family:var(--t-font-display);font-size:clamp(2.75rem,8vw,5.5rem);text-transform:uppercase;letter-spacing:-0.02em;margin:0 0 1rem">${name}</h1>
      <p style="font-size:1.25rem;opacity:0.9;margin-bottom:2rem">${tagline}</p>
      <a href="${href}" style="display:inline-block;background:var(--t-fg);color:var(--t-bg);padding:1rem 1.75rem;text-decoration:none;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;font-size:0.85rem">${cta}</a>
    </section>`;
  } else if (theme.layout === "editorial") {
    hero = `
    <section style="padding:4rem 1.5rem;border-bottom:1px solid var(--t-border)">
      <div style="max-width:960px;margin:0 auto">
        <p style="font-family:var(--t-font-display);font-size:0.95rem;color:var(--t-accent);margin-bottom:1rem">${tagline}</p>
        <h1 style="font-family:var(--t-font-display);font-size:clamp(3rem,8vw,6rem);line-height:0.95;margin:0;max-width:900px">${name}</h1>
      </div>
    </section>`;
  } else {
    hero = `
    <section style="position:relative;min-height:70vh;display:flex;align-items:flex-end;padding:3rem 1.5rem;background:${
      content.heroImageUrl
        ? `linear-gradient(var(--t-hero-overlay), var(--t-hero-overlay)), url(${escapeHtml(content.heroImageUrl)}) center/cover`
        : "linear-gradient(135deg, var(--t-surface), var(--t-bg))"
    }">
      <div style="max-width:720px">
        <p style="color:var(--t-accent);text-transform:uppercase;letter-spacing:0.14em;font-size:0.75rem;margin-bottom:0.75rem">Welcome</p>
        <h1 style="font-family:var(--t-font-display);font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.05;margin:0 0 1rem;letter-spacing:-0.03em">${name}</h1>
        <p style="font-size:1.2rem;color:var(--t-muted);max-width:520px;margin:0 0 1.75rem">${tagline}</p>
        <a href="${href}" style="display:inline-block;background:var(--t-accent);color:var(--t-accent-fg);padding:0.85rem 1.5rem;text-decoration:none;font-weight:600;border-radius:4px">${cta}</a>
      </div>
    </section>`;
  }

  const logo = content.logoUrl
    ? `<img src="${escapeHtml(content.logoUrl)}" alt="" style="height:36px;width:auto;object-fit:contain" />`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${name}</title>
  <meta name="description" content="${tagline}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONT_LINK}" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
<div style="--t-bg:${theme.bg};--t-fg:${theme.fg};--t-muted:${theme.muted};--t-accent:${accent};--t-accent-fg:${theme.accentFg};--t-surface:${theme.surface};--t-border:${theme.border};--t-hero-overlay:${theme.heroOverlay};--t-font-display:${theme.fontDisplay};--t-font-body:${theme.fontBody};background:var(--t-bg);color:var(--t-fg);font-family:var(--t-font-body);min-height:100%">
  <header style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--t-border);background:var(--t-surface)">
    <div style="display:flex;align-items:center;gap:0.75rem">
      ${logo}
      <span style="font-family:var(--t-font-display);font-size:1.25rem;font-weight:600;letter-spacing:-0.02em">${name}</span>
    </div>
    <nav style="display:flex;gap:1.25rem;font-size:0.9rem">
      <a href="#about" style="color:var(--t-muted);text-decoration:none">About</a>
      <a href="#services" style="color:var(--t-muted);text-decoration:none">Services</a>
      <a href="#hours" style="color:var(--t-muted);text-decoration:none">Hours</a>
      <a href="#contact" style="color:var(--t-muted);text-decoration:none">Contact</a>
    </nav>
  </header>
  ${hero}
  <section id="about" style="padding:4rem 1.5rem;border-bottom:1px solid var(--t-border)">
    <div style="max-width:960px;margin:0 auto">
      <h2 style="font-family:var(--t-font-display);font-size:2rem;margin:0 0 1.5rem;letter-spacing:-0.02em">About</h2>
      <p style="font-size:1.1rem;line-height:1.7;color:var(--t-muted);max-width:680px;margin:0">${about}</p>
    </div>
  </section>
  <section id="services" style="padding:4rem 1.5rem;border-bottom:1px solid var(--t-border)">
    <div style="max-width:960px;margin:0 auto">
      <h2 style="font-family:var(--t-font-display);font-size:2rem;margin:0 0 1.5rem;letter-spacing:-0.02em">Services</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem">${services}</div>
    </div>
  </section>
  <section id="hours" style="padding:4rem 1.5rem;border-bottom:1px solid var(--t-border)">
    <div style="max-width:960px;margin:0 auto">
      <h2 style="font-family:var(--t-font-display);font-size:2rem;margin:0 0 1.5rem;letter-spacing:-0.02em">Hours</h2>
      <dl style="display:grid;gap:0.65rem;max-width:420px;margin:0">${hours}</dl>
    </div>
  </section>
  <section id="contact" style="padding:4rem 1.5rem;border-bottom:1px solid var(--t-border)">
    <div style="max-width:960px;margin:0 auto">
      <h2 style="font-family:var(--t-font-display);font-size:2rem;margin:0 0 1.5rem;letter-spacing:-0.02em">Contact</h2>
      <div style="display:grid;gap:0.5rem;color:var(--t-muted)">
        ${content.phone ? `<p style="margin:0">Phone: ${escapeHtml(content.phone)}</p>` : ""}
        ${content.email ? `<p style="margin:0">Email: ${escapeHtml(content.email)}</p>` : ""}
        ${content.address ? `<p style="margin:0">Address: ${escapeHtml(content.address)}</p>` : ""}
        <a href="${href}" style="margin-top:1rem;align-self:flex-start;display:inline-block;background:var(--t-accent);color:var(--t-accent-fg);padding:0.85rem 1.4rem;text-decoration:none;font-weight:600">${cta}</a>
      </div>
    </div>
  </section>
  <footer style="padding:2.5rem 1.5rem;background:var(--t-surface);border-top:1px solid var(--t-border)">
    <div style="max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center">
      <div>
        <strong style="font-family:var(--t-font-display)">${name}</strong>
        <p style="color:var(--t-muted);margin:0.35rem 0 0;font-size:0.9rem">${escapeHtml(content.address || "")}</p>
      </div>
      ${socials ? `<div style="display:flex;gap:1rem;flex-wrap:wrap">${socials}</div>` : ""}
    </div>
  </footer>
</div>
</body>
</html>`;
}

export async function buildSiteZip(templateKey: string, content: SiteContent, slug: string) {
  const zip = new JSZip();
  const html = renderSiteHtml(templateKey, content);
  zip.file("index.html", html);
  zip.file(
    "README.txt",
    `Your SiteForge website export for "${content.businessName}" (${slug}).\n\nUpload the contents of this ZIP to any static host (Netlify, Vercel, GitHub Pages, or your own server).\n`
  );
  return zip.generateAsync({ type: "nodebuffer" });
}
