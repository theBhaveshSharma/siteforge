import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DeleteSiteButton } from "@/components/delete-site-button";

export default async function DashboardPage() {
  const user = await requireUser();
  const sites = await prisma.site.findMany({
    where: { ownerId: user.id },
    include: { template: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-sand">Your sites</h1>
            <p className="mt-2 text-muted">Create, edit, publish, and download websites for your businesses.</p>
          </div>
          <Link
            href="/sites/new"
            className="rounded-md bg-accent px-4 py-2.5 font-semibold text-background transition hover:brightness-110"
          >
            New site
          </Link>
        </div>

        {sites.length === 0 ? (
          <div className="mt-12 border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl text-sand">No sites yet</p>
            <p className="mt-2 text-muted">Start with your business name and a template.</p>
            <Link
              href="/sites/new"
              className="mt-6 inline-block rounded-md bg-accent px-4 py-2.5 font-semibold text-background"
            >
              Create your first site
            </Link>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {sites.map((site) => (
              <li key={site.id} className="border border-border bg-surface/50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl text-sand">{site.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {site.template.name} ·{" "}
                      <span className={site.status === "PUBLISHED" ? "text-accent" : ""}>
                        {site.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </p>
                    {site.status === "PUBLISHED" ? (
                      <Link
                        href={`/s/${site.slug}`}
                        className="mt-2 inline-block text-sm text-accent underline-offset-2 hover:underline"
                        target="_blank"
                      >
                        /s/{site.slug}
                      </Link>
                    ) : (
                      <p className="mt-2 text-sm text-muted">Slug: {site.slug}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/sites/${site.id}/edit`}
                    className="rounded-md border border-border px-3 py-1.5 text-sm transition hover:border-accent/40"
                  >
                    Edit
                  </Link>
                  {site.status === "PUBLISHED" ? (
                    <a
                      href={`/api/sites/${site.id}/export`}
                      className="rounded-md border border-border px-3 py-1.5 text-sm transition hover:border-accent/40"
                    >
                      Download ZIP
                    </a>
                  ) : null}
                  <DeleteSiteButton siteId={site.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
