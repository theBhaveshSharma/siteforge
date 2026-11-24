import { SiteHeader } from "@/components/site-header";
import { CreateSiteWizard } from "@/components/create-site-wizard";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { TEMPLATE_METAS } from "@/templates/meta";

export default async function NewSitePage() {
  await requireUser();
  const templates = await prisma.template.findMany({ orderBy: { name: "asc" } });
  const list = templates.length > 0 ? templates : TEMPLATE_METAS;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />
      <main className="mx-auto max-w-4xl px-6 py-10 md:px-10">
        <h1 className="font-display text-4xl text-sand">Create a site</h1>
        <p className="mt-2 text-muted">Tell us about your business, then choose a template.</p>
        <div className="mt-8">
          <CreateSiteWizard
            templates={list.map((t) => ({
              id: t.id,
              name: t.name,
              category: t.category,
              description: t.description,
              thumbnail: t.thumbnail,
            }))}
          />
        </div>
      </main>
    </div>
  );
}
