import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ✅ Optional: Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  // ✅ Insert collections
  const collectionsData = [
    {
      name: "Knotion",
      slug: "knotion",
      description:
        "A sophisticated collection featuring contemporary geometric patterns...",
      shortDescription: "Contemporary geometric patterns with subtle sophistication",
      category: "contemporary",
      featured: true,
      heroImage:
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&h=600",
      galleryImages: [],
    },
    {
      name: "Antonym",
      slug: "antonym",
      description: "Bold contrasts and striking opposites define the Antonym collection...",
      shortDescription: "Bold contrasts and striking visual narratives",
      category: "contemporary",
      featured: true,
      heroImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=600",
      galleryImages: [],
    },
    // Add remaining collections similarly...
  ];

  const insertedCollections = await Promise.all(
    collectionsData.map((data) => prisma.collection.create({ data }))
  );

  console.log("✅ Collections inserted:", insertedCollections.length);

  // ✅ Insert products
  const productNames = ["Geomiter", "Chromatic", "Ethereal", "Sublime"];
  const productsData = insertedCollections.flatMap((collection, collectionIndex) =>
    productNames.map((name, productIndex) => ({
      name,
      slug: `${name.toLowerCase()}-${collection.slug}`,
      description: `A stunning ${name.toLowerCase()} carpet from the ${collection.name} collection.`,
      material: "Hand-knotted wool and silk",
      dimensions: "8' x 10' (240 x 300 cm)",
      colors: ["Charcoal", "Ivory", "Gold"],
      images: [
        `https://images.unsplash.com/photo-150${6 + (collectionIndex * 4 + productIndex) % 10}?auto=format&fit=crop&w=800&h=600`,
      ],
      featured: productIndex === 0 && collectionIndex < 3,
      collectionId: collection.id,
    }))
  );

  const insertedProducts = await Promise.all(
    productsData.map((data) => prisma.product.create({ data }))
  );

  console.log("✅ Products inserted:", insertedProducts.length);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
