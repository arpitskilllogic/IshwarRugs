import { db } from "./db";
import { collections, products } from "@shared/schema";

async function seed() {
  console.log('Seeding database...');
  
  // Insert collections
  const collectionsData = [
    {
      name: 'Knotion',
      slug: 'knotion', 
      description: 'A sophisticated collection featuring contemporary geometric patterns with subtle color palettes. Each piece in the Knotion collection combines traditional craftsmanship with modern design sensibilities.',
      shortDescription: 'Contemporary geometric patterns with subtle sophistication',
      category: 'contemporary',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    },
    {
      name: 'Antonym',
      slug: 'antonym',
      description: 'Bold contrasts and striking opposites define the Antonym collection. These pieces play with light and shadow, texture and smoothness, creating visual narratives that command attention.',
      shortDescription: 'Bold contrasts and striking visual narratives',
      category: 'contemporary', 
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    },
    {
      name: 'Persian Heritage',
      slug: 'persian-heritage',
      description: 'Timeless patterns rooted in centuries of Persian carpet-making tradition. Each piece tells a story of cultural heritage, featuring intricate motifs and rich, deep colors.',
      shortDescription: 'Timeless Persian patterns with cultural heritage',
      category: 'traditional',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    },
    {
      name: 'Overlap',
      slug: 'overlap',
      description: 'Where layers meet and intersect, the Overlap collection creates depth through overlapping geometric forms and gradual color transitions.',
      shortDescription: 'Layered geometric forms with depth and transition',
      category: 'contemporary',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    },
    {
      name: 'Instinct',
      slug: 'instinct',
      description: 'Raw, intuitive designs that capture the essence of natural movement and organic flow. The Instinct collection embraces imperfection as beauty.',
      shortDescription: 'Raw, intuitive designs with organic flow',
      category: 'modern',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    },
    {
      name: 'Disperse',
      slug: 'disperse',
      description: 'Scattered elements that come together to form cohesive compositions. The Disperse collection plays with space, balance, and the beauty of controlled chaos.',
      shortDescription: 'Scattered elements forming cohesive compositions',
      category: 'modern',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      galleryImages: []
    }
  ];

  const insertedCollections = await db.insert(collections).values(collectionsData).returning();
  console.log('Collections inserted:', insertedCollections.length);

  // Insert products for each collection
  const productsData: any[] = [];
  
  insertedCollections.forEach((collection, collectionIndex) => {
    const productNames = ['Geomiter', 'Chromatic', 'Ethereal', 'Sublime'];
    
    productNames.forEach((productName, productIndex) => {
      productsData.push({
        name: productName,
        slug: `${productName.toLowerCase()}-${collection.slug}`,
        description: `A stunning ${productName.toLowerCase()} carpet from the ${collection.name} collection, showcasing exceptional craftsmanship and design.`,
        collectionId: collection.id,
        featured: productIndex === 0 && collectionIndex < 3,
        material: 'Hand-knotted wool and silk',
        dimensions: '8\' x 10\' (240 x 300 cm)',
        colors: ['Charcoal', 'Ivory', 'Gold'],
        images: [
          `https://images.unsplash.com/photo-150${6 + (collectionIndex * 4 + productIndex) % 10}?${(collectionIndex * 4 + productIndex) % 2 === 0 ? 'ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800' : 'ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}`
        ]
      });
    });
  });

  const insertedProducts = await db.insert(products).values(productsData).returning();
  console.log('Products inserted:', insertedProducts.length);
  
  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});