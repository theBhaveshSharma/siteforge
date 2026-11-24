import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseSiteContent } from "@/lib/schema";
import { SiteEditor } from "@/components/site-editor";
import { TEMPLATE_METAS } from "@/templates/meta";

export default async function EditSitePage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const user = await requireUser();
  const { siteId } = await params;

  const site = await prisma.site.findFirst({
    where: { id: siteId, ownerId: user.id },
    include: { template: true },
  });

  if (!site) notFound();

  const templates = await prisma.template.findMany({ orderBy: { name: "asc" } });
  const templateList =
    templates.length > 0
      ? templates.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          description: t.description,
          thumbnail: t.thumbnail,
        }))
      : TEMPLATE_METAS.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          description: t.description,
          thumbnail: t.thumbnail,
        }));

  const content = parseSiteContent(site.content);

  return (
    <SiteEditor
      site={{
        id: site.id,
        name: site.name,
        slug: site.slug,
        status: site.status,
        templateId: site.templateId,
      }}
      initialContent={content}
      templates={templateList}
    />
  );
}
