"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  publishSite,
  saveUploadedImage,
  unpublishSite,
  updateSiteContent,
  updateSiteMeta,
} from "@/app/actions/sites";
import type { SiteContent, ServiceItem } from "@/lib/schema";
import { getTemplateComponent } from "@/templates/registry";
import { cn } from "@/lib/utils";

type TemplateOption = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
};

type SiteMeta = {
  id: string;
  name: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  templateId: string;
};

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export function SiteEditor({
  site,
  initialContent,
  templates,
}: {
  site: SiteMeta;
  initialContent: SiteContent;
  templates: TemplateOption[];
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [templateId, setTemplateId] = useState(site.templateId);
  const [slug, setSlug] = useState(site.slug);
  const [status, setStatus] = useState(site.status);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const Preview = useMemo(() => getTemplateComponent(templateId), [templateId]);

  function patch(partial: Partial<SiteContent>) {
    setContent((c) => ({ ...c, ...partial }));
  }

  function patchService(index: number, partial: Partial<ServiceItem>) {
    setContent((c) => {
      const services = [...(c.services || [])];
      services[index] = { ...services[index], ...partial };
      return { ...c, services };
    });
  }

  function save() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await updateSiteContent(site.id, content);
        if (slug !== site.slug || templateId !== site.templateId) {
          const result = await updateSiteMeta(site.id, { slug, templateId });
          setSlug(result.slug);
        }
        setMessage("Saved");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function publish() {
    setError(null);
    startTransition(async () => {
      try {
        await updateSiteContent(site.id, content);
        await updateSiteMeta(site.id, { slug, templateId });
        const result = await publishSite(site.id);
        setStatus("PUBLISHED");
        setSlug(result.slug);
        setMessage(`Published at /s/${result.slug}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Publish failed");
      }
    });
  }

  function unpublish() {
    startTransition(async () => {
      await unpublishSite(site.id);
      setStatus("DRAFT");
      setMessage("Unpublished");
    });
  }

  async function onUpload(
    field: "logoUrl" | "heroImageUrl",
    file: File | null
  ) {
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    const { url } = await saveUploadedImage(fd);
    patch({ [field]: url });
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-muted hover:text-sand">
            ← Dashboard
          </Link>
          <h1 className="font-display text-xl text-sand">{content.businessName || "Untitled"}</h1>
          <span
            className={cn(
              "rounded px-2 py-0.5 text-xs uppercase tracking-wide",
              status === "PUBLISHED" ? "bg-accent/20 text-accent" : "bg-border text-muted"
            )}
          >
            {status === "PUBLISHED" ? "Published" : "Draft"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {status === "PUBLISHED" ? (
            <>
              <Link
                href={`/s/${slug}`}
                target="_blank"
                className="rounded-md border border-border px-3 py-1.5 text-sm"
              >
                View live
              </Link>
              <a
                href={`/api/sites/${site.id}/export`}
                className="rounded-md border border-border px-3 py-1.5 text-sm"
              >
                Download ZIP
              </a>
              <button
                type="button"
                onClick={unpublish}
                disabled={pending}
                className="rounded-md border border-border px-3 py-1.5 text-sm"
              >
                Unpublish
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={pending}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-background disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </header>

      {(message || error) && (
        <div
          className={cn(
            "border-b px-4 py-2 text-sm md:px-6",
            error ? "border-red-900/40 bg-red-950/30 text-red-200" : "border-border bg-surface text-accent"
          )}
        >
          {error || message}
        </div>
      )}

      <div className="grid flex-1 lg:grid-cols-2">
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-r border-border p-4 md:p-6">
          <section className="space-y-4">
            <h2 className="font-display text-lg text-sand">Business details</h2>
            <label className="block text-sm text-muted">
              Business name
              <input
                className={inputClass}
                value={content.businessName}
                onChange={(e) => patch({ businessName: e.target.value })}
              />
            </label>
            <label className="block text-sm text-muted">
              Tagline
              <input
                className={inputClass}
                value={content.tagline}
                onChange={(e) => patch({ tagline: e.target.value })}
              />
            </label>
            <label className="block text-sm text-muted">
              About
              <textarea
                className={cn(inputClass, "min-h-28")}
                value={content.about}
                onChange={(e) => patch({ about: e.target.value })}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm text-muted">
                Phone
                <input
                  className={inputClass}
                  value={content.phone}
                  onChange={(e) => patch({ phone: e.target.value })}
                />
              </label>
              <label className="block text-sm text-muted">
                Email
                <input
                  className={inputClass}
                  value={content.email}
                  onChange={(e) => patch({ email: e.target.value })}
                />
              </label>
            </div>
            <label className="block text-sm text-muted">
              Address
              <input
                className={inputClass}
                value={content.address}
                onChange={(e) => patch({ address: e.target.value })}
              />
            </label>
            <label className="block text-sm text-muted">
              CTA button label
              <input
                className={inputClass}
                value={content.ctaLabel}
                onChange={(e) => patch({ ctaLabel: e.target.value })}
              />
            </label>
            <label className="block text-sm text-muted">
              Accent color (optional hex)
              <input
                className={inputClass}
                value={content.accentColor || ""}
                onChange={(e) => patch({ accentColor: e.target.value })}
                placeholder="#a35d3a"
              />
            </label>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-lg text-sand">Images</h2>
            <label className="block text-sm text-muted">
              Logo URL or upload
              <input
                className={inputClass}
                value={content.logoUrl || ""}
                onChange={(e) => patch({ logoUrl: e.target.value })}
                placeholder="https://… or upload below"
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 block text-xs"
                onChange={(e) => onUpload("logoUrl", e.target.files?.[0] ?? null)}
              />
            </label>
            <label className="block text-sm text-muted">
              Hero image URL or upload
              <input
                className={inputClass}
                value={content.heroImageUrl || ""}
                onChange={(e) => patch({ heroImageUrl: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 block text-xs"
                onChange={(e) => onUpload("heroImageUrl", e.target.files?.[0] ?? null)}
              />
            </label>
          </section>

          <section className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg text-sand">Services</h2>
              <button
                type="button"
                className="text-sm text-accent"
                onClick={() =>
                  patch({
                    services: [
                      ...(content.services || []),
                      { title: "New service", description: "", price: "" },
                    ],
                  })
                }
              >
                Add
              </button>
            </div>
            {(content.services || []).map((service, i) => (
              <div key={i} className="space-y-2 border border-border p-3">
                <input
                  className={inputClass}
                  value={service.title}
                  onChange={(e) => patchService(i, { title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  className={cn(inputClass, "min-h-16")}
                  value={service.description || ""}
                  onChange={(e) => patchService(i, { description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  className={inputClass}
                  value={service.price || ""}
                  onChange={(e) => patchService(i, { price: e.target.value })}
                  placeholder="Price (optional)"
                />
                <button
                  type="button"
                  className="text-xs text-red-300"
                  onClick={() =>
                    patch({
                      services: (content.services || []).filter((_, idx) => idx !== i),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-lg text-sand">Hours</h2>
            {DAYS.map((day) => (
              <label key={day} className="grid grid-cols-[100px_1fr] items-center gap-2 text-sm text-muted">
                <span className="capitalize">{day}</span>
                <input
                  className={inputClass}
                  value={content.hours?.[day] || ""}
                  onChange={(e) =>
                    patch({
                      hours: { ...content.hours, [day]: e.target.value },
                    })
                  }
                />
              </label>
            ))}
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-lg text-sand">Socials</h2>
            {(["website", "facebook", "instagram", "twitter", "linkedin"] as const).map((key) => (
              <label key={key} className="block text-sm capitalize text-muted">
                {key}
                <input
                  className={inputClass}
                  value={content.socials?.[key] || ""}
                  onChange={(e) =>
                    patch({
                      socials: { ...content.socials, [key]: e.target.value },
                    })
                  }
                />
              </label>
            ))}
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-lg text-sand">URL & template</h2>
            <label className="block text-sm text-muted">
              Public slug
              <div className="mt-1 flex items-center gap-2">
                <span className="text-muted">/s/</span>
                <input
                  className={cn(inputClass, "mt-0")}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplateId(t.id)}
                  className={cn(
                    "border p-2 text-left text-sm",
                    templateId === t.id ? "border-accent" : "border-border"
                  )}
                >
                  <p className="font-medium text-sand">{t.name}</p>
                  <p className="text-xs text-muted">{t.category}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-neutral-200">
          <div className="sticky top-0 z-10 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-xs text-neutral-600">
            Live preview
          </div>
          <Preview content={content} embedded />
        </div>
      </div>
    </div>
  );
}
