import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { parseSiteContent } from "@/lib/schema";
import { buildSiteZip } from "@/lib/export";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ siteId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { siteId } = await context.params;
  const site = await prisma.site.findFirst({
    where: { id: siteId, ownerId: userId },
    include: { template: true },
  });

  if (!site) {
    return new Response("Not found", { status: 404 });
  }

  const content = parseSiteContent(site.content);
  const buffer = await buildSiteZip(site.template.componentKey, content, site.slug);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${site.slug}-website.zip"`,
    },
  });
}
