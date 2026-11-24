"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSite } from "@/app/actions/sites";

export function DeleteSiteButton({ siteId }: { siteId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="rounded-md border border-red-900/50 px-3 py-1.5 text-sm text-red-300 transition hover:border-red-500/60 disabled:opacity-50"
      onClick={() => {
        if (!confirm("Delete this site? This cannot be undone.")) return;
        startTransition(async () => {
          await deleteSite(siteId);
          router.refresh();
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
