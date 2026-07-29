import { PrismaClient } from "@prisma/client";
import { services } from "../lib/services-data";

const db = new PrismaClient();

async function main() {
  for (const s of services) {
    await db.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        name: s.name,
        description: s.description,
        durationMin: s.durationMin,
        priceCents: s.priceCents,
        imageUrl: s.image,
      },
    });
  }
  console.log(`Seeded ${services.length} services.`);
}

main().finally(() => db.$disconnect());
