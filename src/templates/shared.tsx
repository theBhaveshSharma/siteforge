import type { CSSProperties, ReactNode } from "react";
import type { SiteContent } from "@/lib/schema";
import {
  DAY_ORDER,
  contactMailto,
  type SiteTemplateProps,
  type TemplateTheme,
} from "./types";

function shellStyle(theme: TemplateTheme, accentOverride?: string): CSSProperties {
  const accent = accentOverride || theme.accent;
  return {
    ["--t-bg" as string]: theme.bg,
    ["--t-fg" as string]: theme.fg,
    ["--t-muted" as string]: theme.muted,
    ["--t-accent" as string]: accent,
    ["--t-accent-fg" as string]: theme.accentFg,
    ["--t-surface" as string]: theme.surface,
    ["--t-border" as string]: theme.border,
    ["--t-hero-overlay" as string]: theme.heroOverlay,
    ["--t-font-display" as string]: theme.fontDisplay,
    ["--t-font-body" as string]: theme.fontBody,
    background: "var(--t-bg)",
    color: "var(--t-fg)",
    fontFamily: "var(--t-font-body)",
    minHeight: "100%",
  };
}

function Nav({ content }: { content: SiteContent }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid var(--t-border)",
        background: "var(--t-surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {content.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.logoUrl}
            alt=""
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
        ) : null}
        <span
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {content.businessName || "Your Business"}
        </span>
      </div>
      <nav style={{ display: "flex", gap: "1.25rem", fontSize: "0.9rem" }}>
        <a href="#about" style={{ color: "var(--t-muted)", textDecoration: "none" }}>
          About
        </a>
        <a href="#services" style={{ color: "var(--t-muted)", textDecoration: "none" }}>
          Services
        </a>
        <a href="#hours" style={{ color: "var(--t-muted)", textDecoration: "none" }}>
          Hours
        </a>
        <a href="#contact" style={{ color: "var(--t-muted)", textDecoration: "none" }}>
          Contact
        </a>
      </nav>
    </header>
  );
}

function HeroClassic({ content }: { content: SiteContent }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "flex-end",
        padding: "3rem 1.5rem",
        background: content.heroImageUrl
          ? `linear-gradient(var(--t-hero-overlay), var(--t-hero-overlay)), url(${content.heroImageUrl}) center/cover`
          : "linear-gradient(135deg, var(--t-surface), var(--t-bg))",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <p
          style={{
            color: "var(--t-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          Welcome
        </p>
        <h1
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.05,
            margin: "0 0 1rem",
            letterSpacing: "-0.03em",
          }}
        >
          {content.businessName || "Your Business"}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--t-muted)", maxWidth: 520, margin: "0 0 1.75rem" }}>
          {content.tagline || "Your tagline goes here"}
        </p>
        <a
          href={contactMailto(content)}
          style={{
            display: "inline-block",
            background: "var(--t-accent)",
            color: "var(--t-accent-fg)",
            padding: "0.85rem 1.5rem",
            textDecoration: "none",
            fontWeight: 600,
            borderRadius: 4,
          }}
        >
          {content.ctaLabel || "Get in touch"}
        </a>
      </div>
    </section>
  );
}

function HeroSplit({ content }: { content: SiteContent }) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          padding: "4rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "var(--t-surface)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
            lineHeight: 1.05,
            margin: "0 0 1rem",
          }}
        >
          {content.businessName || "Your Business"}
        </h1>
        <p style={{ color: "var(--t-muted)", fontSize: "1.15rem", marginBottom: "1.5rem" }}>
          {content.tagline}
        </p>
        <a
          href={contactMailto(content)}
          style={{
            alignSelf: "flex-start",
            background: "var(--t-accent)",
            color: "var(--t-accent-fg)",
            padding: "0.85rem 1.4rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {content.ctaLabel || "Get in touch"}
        </a>
      </div>
      <div
        style={{
          minHeight: 320,
          background: content.heroImageUrl
            ? `url(${content.heroImageUrl}) center/cover`
            : "linear-gradient(160deg, var(--t-accent), var(--t-bg))",
          opacity: content.heroImageUrl ? 1 : 0.85,
        }}
      />
    </section>
  );
}

function HeroMinimal({ content }: { content: SiteContent }) {
  return (
    <section style={{ padding: "6rem 1.5rem 4rem", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
      <h1
        style={{
          fontFamily: "var(--t-font-display)",
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          lineHeight: 1,
          margin: "0 0 1.25rem",
          letterSpacing: "-0.04em",
        }}
      >
        {content.businessName || "Your Business"}
      </h1>
      <p style={{ color: "var(--t-muted)", fontSize: "1.25rem", marginBottom: "2rem" }}>{content.tagline}</p>
      <a
        href={contactMailto(content)}
        style={{
          color: "var(--t-accent)",
          borderBottom: "2px solid var(--t-accent)",
          textDecoration: "none",
          paddingBottom: 4,
          fontWeight: 600,
        }}
      >
        {content.ctaLabel || "Get in touch"}
      </a>
    </section>
  );
}

function HeroBold({ content }: { content: SiteContent }) {
  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        background: "var(--t-accent)",
        color: "var(--t-accent-fg)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--t-font-display)",
          fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          margin: "0 0 1rem",
        }}
      >
        {content.businessName || "Your Business"}
      </h1>
      <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "2rem" }}>{content.tagline}</p>
      <a
        href={contactMailto(content)}
        style={{
          display: "inline-block",
          background: "var(--t-fg)",
          color: "var(--t-bg)",
          padding: "1rem 1.75rem",
          textDecoration: "none",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "0.85rem",
        }}
      >
        {content.ctaLabel || "Get in touch"}
      </a>
    </section>
  );
}

function HeroEditorial({ content }: { content: SiteContent }) {
  return (
    <section style={{ padding: "4rem 1.5rem", borderBottom: "1px solid var(--t-border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "0.95rem",
            color: "var(--t-accent)",
            marginBottom: "1rem",
          }}
        >
          {content.tagline}
        </p>
        <h1
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 0.95,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {content.businessName || "Your Business"}
        </h1>
      </div>
    </section>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "4rem 1.5rem", borderBottom: "1px solid var(--t-border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--t-font-display)",
            fontSize: "2rem",
            margin: "0 0 1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Footer({ content }: { content: SiteContent }) {
  const socials = Object.entries(content.socials || {}).filter(([, v]) => Boolean(v));
  return (
    <footer
      style={{
        padding: "2.5rem 1.5rem",
        background: "var(--t-surface)",
        borderTop: "1px solid var(--t-border)",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong style={{ fontFamily: "var(--t-font-display)" }}>{content.businessName}</strong>
          <p style={{ color: "var(--t-muted)", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
            {content.address}
          </p>
        </div>
        {socials.length > 0 ? (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--t-accent)", textDecoration: "none", textTransform: "capitalize" }}
              >
                {key}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export function ThemedSiteTemplate({
  content,
  theme,
  embedded,
}: SiteTemplateProps & { theme: TemplateTheme }) {
  const hero =
    theme.layout === "split" ? (
      <HeroSplit content={content} />
    ) : theme.layout === "minimal" ? (
      <HeroMinimal content={content} />
    ) : theme.layout === "bold" ? (
      <HeroBold content={content} />
    ) : theme.layout === "editorial" ? (
      <HeroEditorial content={content} />
    ) : (
      <HeroClassic content={content} />
    );

  return (
    <div style={shellStyle(theme, content.accentColor || undefined)} data-embedded={embedded ? "true" : undefined}>
      <Nav content={content} />
      {hero}
      <Section id="about" title="About">
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--t-muted)", maxWidth: 680, margin: 0 }}>
          {content.about}
        </p>
      </Section>
      <Section id="services" title="Services">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {(content.services?.length ? content.services : [{ title: "Service", description: "", price: "" }]).map(
            (service, i) => (
              <article
                key={`${service.title}-${i}`}
                style={{
                  padding: "1.25rem",
                  background: "var(--t-surface)",
                  border: "1px solid var(--t-border)",
                }}
              >
                <h3 style={{ fontFamily: "var(--t-font-display)", margin: "0 0 0.5rem", fontSize: "1.2rem" }}>
                  {service.title}
                </h3>
                {service.description ? (
                  <p style={{ color: "var(--t-muted)", margin: "0 0 0.75rem", lineHeight: 1.55 }}>
                    {service.description}
                  </p>
                ) : null}
                {service.price ? (
                  <p style={{ margin: 0, color: "var(--t-accent)", fontWeight: 600 }}>{service.price}</p>
                ) : null}
              </article>
            )
          )}
        </div>
      </Section>
      <Section id="hours" title="Hours">
        <dl style={{ display: "grid", gap: "0.65rem", maxWidth: 420, margin: 0 }}>
          {DAY_ORDER.map((day) => (
            <div
              key={day}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                borderBottom: "1px solid var(--t-border)",
                paddingBottom: "0.5rem",
              }}
            >
              <dt style={{ textTransform: "capitalize", color: "var(--t-muted)" }}>{day}</dt>
              <dd style={{ margin: 0 }}>{content.hours?.[day] || "—"}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="contact" title="Contact">
        <div style={{ display: "grid", gap: "0.5rem", color: "var(--t-muted)" }}>
          {content.phone ? <p style={{ margin: 0 }}>Phone: {content.phone}</p> : null}
          {content.email ? <p style={{ margin: 0 }}>Email: {content.email}</p> : null}
          {content.address ? <p style={{ margin: 0 }}>Address: {content.address}</p> : null}
          <a
            href={contactMailto(content)}
            style={{
              marginTop: "1rem",
              alignSelf: "flex-start",
              display: "inline-block",
              background: "var(--t-accent)",
              color: "var(--t-accent-fg)",
              padding: "0.85rem 1.4rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {content.ctaLabel || "Get in touch"}
          </a>
        </div>
      </Section>
      <Footer content={content} />
    </div>
  );
}
