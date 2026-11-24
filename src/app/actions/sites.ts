"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import {
  defaultSiteContent,
  parseSiteContent,
  siteContentSchema,
  slugify,
  type SiteContent,
} from "@/lib/schema";
import { SiteStatus } from "@prisma/client";

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base) || "site";
  let attempt = 0;
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const existing = await prisma.site.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    attempt += 1;
  }
}

export async function createSite(input: {
  businessName: string;
  tagline: string;
  templateId: string;
}) {
  const user = await requireUser();
  const template = await prisma.template.findUnique({ where: { id: input.templateId } });
  if (!template) throw new Error("Template not found");

  const content = defaultSiteContent();
  content.businessName = input.businessName;
  content.tagline = input.tagline;

  const slug = await ensureUniqueSlug(input.businessName);

  const site = await prisma.site.create({
    data: {
      ownerId: user.id,
      name: input.businessName,
      slug,
      templateId: template.id,
      status: SiteStatus.DRAFT,
      content: JSON.stringify(content),
    },
  });

  revalidatePath("/dashboard");
  return { id: site.id };
}

export async function updateSiteContent(siteId: string, content: SiteContent) {
  const user = await requireUser();
  const site = await prisma.site.findFirst({ where: { id: siteId, ownerId: user.id } });
  if (!site) throw new Error("Site not found");

  const parsed = siteContentSchema.parse(content);

  await prisma.site.update({
    where: { id: siteId },
    data: {
      name: parsed.businessName,
      content: JSON.stringify(parsed),
    },
  });

  revalidatePath(`/sites/${siteId}/edit`);
  revalidatePath(`/s/${site.slug}`);
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateSiteMeta(
  siteId: string,
  data: { slug?: string; templateId?: string }
) {
  const user = await requireUser();
  const site = await prisma.site.findFirst({ where: { id: siteId, ownerId: user.id } });
  if (!site) throw new Error("Site not found");

  const update: { slug?: string; templateId?: string } = {};

  if (data.slug !== undefined) {
    const next = slugify(data.slug);
    if (!next) throw new Error("Invalid slug");
    update.slug = await ensureUniqueSlug(next, siteId);
  }

  if (data.templateId) {
    const template = await prisma.template.findUnique({ where: { id: data.templateId } });
    if (!template) throw new Error("Template not found");
    update.templateId = template.id;
  }

  const updated = await prisma.site.update({
    where: { id: siteId },
    data: update,
  });

  revalidatePath(`/sites/${siteId}/edit`);
  revalidatePath(`/s/${updated.slug}`);
  revalidatePath(`/s/${site.slug}`);
  revalidatePath("/dashboard");
  return { slug: updated.slug };
}

export async function publishSite(siteId: string) {
  const user = await requireUser();
  const site = await prisma.site.findFirst({ where: { id: siteId, ownerId: user.id } });
  if (!site) throw new Error("Site not found");

  // Validate content before publishing
  parseSiteContent(site.content);

  await prisma.site.update({
    where: { id: siteId },
    data: { status: SiteStatus.PUBLISHED },
  });

  revalidatePath(`/s/${site.slug}`);
  revalidatePath("/dashboard");
  revalidatePath(`/sites/${siteId}/edit`);
  return { slug: site.slug };
}

export async function unpublishSite(siteId: string) {
  const user = await requireUser();
  const site = await prisma.site.findFirst({ where: { id: siteId, ownerId: user.id } });
  if (!site) throw new Error("Site not found");

  await prisma.site.update({
    where: { id: siteId },
    data: { status: SiteStatus.DRAFT },
  });

  revalidatePath(`/s/${site.slug}`);
  revalidatePath("/dashboard");
  revalidatePath(`/sites/${siteId}/edit`);
  return { ok: true };
}

export async function deleteSite(siteId: string) {
  const user = await requireUser();
  const site = await prisma.site.findFirst({ where: { id: siteId, ownerId: user.id } });
  if (!site) throw new Error("Site not found");

  await prisma.site.delete({ where: { id: siteId } });
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function saveUploadedImage(formData: FormData) {
  const user = await requireUser();
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file");

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext) ? ext : "png";
  const filename = `${user.id.slice(0, 8)}-${Date.now()}.${safeExt}`;

  const { writeFile, mkdir } = await import("fs/promises");
  const path = await import("path");
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);

  return { url: `/uploads/${filename}` };
}
