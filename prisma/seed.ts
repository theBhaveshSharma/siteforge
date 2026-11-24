import { PrismaClient } from "@prisma/client";
import { TEMPLATE_METAS } from "../src/templates/meta";

const prisma = new PrismaClient();

async function main() {
  for (const meta of TEMPLATE_METAS) {
    await prisma.template.upsert({
      where: { id: meta.id },
      update: {
        name: meta.name,
        category: meta.category,
        description: meta.description,
        thumbnail: meta.thumbnail,
        componentKey: meta.componentKey,
      },
      create: {
        id: meta.id,
        name: meta.name,
        category: meta.category,
        description: meta.description,
        thumbnail: meta.thumbnail,
        componentKey: meta.componentKey,
      },
    });
  }
  console.log(`Seeded ${TEMPLATE_METAS.length} templates`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
