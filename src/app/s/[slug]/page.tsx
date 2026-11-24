import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { parseSiteContent } from "@/lib/schema";
import { getTemplateComponent } from "@/templates/registry";
import { SiteStatus } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await prisma.site.findFirst({
    where: { slug, status: SiteStatus.PUBLISHED },
  });
  if (!site) return { title: "Site not found" };
  const content = parseSiteContent(site.content);
  return {
    title: content.businessName,
    description: content.tagline,
  };
}

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await prisma.site.findFirst({
    where: { slug, status: SiteStatus.PUBLISHED },
    include: { template: true },
  });

  if (!site) notFound();

  const content = parseSiteContent(site.content);
  const Template = getTemplateComponent(site.template.componentKey);

  return (
    <div className="min-h-screen bg-white text-black">
      <Template content={content} />
    </div>
  );
}
