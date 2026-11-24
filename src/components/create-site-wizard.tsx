"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSite } from "@/app/actions/sites";
import { cn } from "@/lib/utils";

type TemplateOption = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
};

export function CreateSiteWizard({ templates }: { templates: TemplateOption[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "cafe");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    setError(null);
    startTransition(async () => {
      try {
        const { id } = await createSite({ businessName, tagline, templateId });
        router.push(`/sites/${id}/edit`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="border border-border bg-surface/40 p-6 md:p-8">
      <div className="mb-6 flex gap-2 text-sm text-muted">
        <span className={cn(step === 1 && "text-accent")}>1. Details</span>
        <span>/</span>
        <span className={cn(step === 2 && "text-accent")}>2. Template</span>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted">Business name</span>
            <input
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Harbor Cafe"
            />
          </label>
          <label className="block">
            <span className="text-sm text-muted">Tagline</span>
            <input
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Coffee, community, and warm mornings"
            />
          </label>
          <button
            type="button"
            disabled={!businessName.trim() || !tagline.trim()}
            onClick={() => setStep(2)}
            className="rounded-md bg-accent px-4 py-2.5 font-semibold text-background disabled:opacity-40"
          >
            Choose template
          </button>
        </div>
      ) : (
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={cn(
                  "overflow-hidden border text-left transition",
                  templateId === t.id ? "border-accent" : "border-border hover:border-muted"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.thumbnail} alt="" className="h-28 w-full object-cover" />
                <div className="p-3">
                  <p className="text-xs uppercase tracking-wide text-accent">{t.category}</p>
                  <p className="font-display text-lg text-sand">{t.name}</p>
                  <p className="mt-1 text-xs text-muted">{t.description}</p>
                </div>
              </button>
            ))}
          </div>
          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-md border border-border px-4 py-2.5"
            >
              Back
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={onSubmit}
              className="rounded-md bg-accent px-4 py-2.5 font-semibold text-background disabled:opacity-50"
            >
              {pending ? "Creating…" : "Create & edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
