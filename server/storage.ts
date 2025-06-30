import { collections, products, inquiries, type Collection, type Product, type Inquiry, type InsertCollection, type InsertProduct, type InsertInquiry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Collections
  getCollections(): Promise<Collection[]>;
  getFeaturedCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  getCollectionsByCategory(category: string): Promise<Collection[]>;
  createCollection(collection: InsertCollection): Promise<Collection>;

  // Products
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCollection(collectionId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private collections: Map<number, Collection>;
  private products: Map<number, Product>;
  private inquiries: Map<number, Inquiry>;
  private currentCollectionId: number;
  private currentProductId: number;
  private currentInquiryId: number;

  constructor() {
    this.collections = new Map();
    this.products = new Map();
    this.inquiries = new Map();
    this.currentCollectionId = 1;
    this.currentProductId = 1;
    this.currentInquiryId = 1;
    this.seedData();
  }

  private seedData() {
    // Seed collections
    const collectionsData: InsertCollection[] = [
      {
        name: "Knotion",
        slug: "knotion",
        description: "Masterful knotwork in every thread, the Knotion collection represents the pinnacle of hand-knotted craftsmanship. Each piece tells a story through intricate patterns and exceptional attention to detail.",
        shortDescription: "Masterful knotwork in every thread",
        featured: true,
        category: "contemporary",
        heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        name: "Antonym",
        slug: "antonym",
        description: "A rare beauty of opposites, the Antonym collection explores the fascinating dialogue between contrasts. Each design celebrates the harmony found in opposing elements, creating pieces that are both bold and balanced.",
        shortDescription: "A rare beauty of opposites",
        featured: true,
        category: "contemporary",
        heroImage: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        name: "Persian Heritage",
        slug: "persian-heritage",
        description: "Dive into the opulence of Persian heritage with our rich and heirloom-worthy Persian collection. These hand-knotted traditional carpets celebrate centuries of artistic tradition and cultural significance.",
        shortDescription: "Opulent Persian heritage designs",
        featured: true,
        category: "traditional",
        heroImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        name: "Overlap",
        slug: "overlap",
        description: "Where Time, Luxury and Artistry become one. A collection where distinction and unity converge, where the boundaries of form and colour blur into something uniquely whole.",
        shortDescription: "Where Time, Luxury and Artistry become one",
        featured: true,
        category: "contemporary",
        heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        name: "Instinct",
        slug: "instinct",
        description: "Following nature's inherent patterns, the Instinct collection captures the organic beauty found in natural forms. Each piece reflects the intuitive design language of the natural world.",
        shortDescription: "Following nature's inherent patterns",
        featured: true,
        category: "modern",
        heroImage: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        name: "Disperse",
        slug: "disperse",
        description: "Elements scattered in harmony, the Disperse collection explores the beautiful chaos of dispersed elements coming together to create unified compositions.",
        shortDescription: "Elements scattered in harmony",
        featured: true,
        category: "modern",
        heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        galleryImages: [
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      }
    ];

    collectionsData.forEach(collection => {
      this.createCollection(collection);
    });

    // Seed products
    const productsData: InsertProduct[] = [
      {
        name: "Geomiter",
        slug: "geomiter",
        collectionId: 1,
        description: "A stunning geometric masterpiece that showcases the precision of hand-knotted craftsmanship.",
        material: "Hand-knotted wool and silk",
        dimensions: "8' x 10'",
        colors: ["Beige", "Gold", "Burgundy"],
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: true
      },
      {
        name: "Rosetwirl",
        slug: "rosetwirl",
        collectionId: 1,
        description: "An elegant design featuring flowing patterns that evoke the beauty of natural forms.",
        material: "Hand-knotted botanical silk",
        dimensions: "9' x 12'",
        colors: ["Rose", "Cream", "Gold"],
        images: [
          "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: true
      },
      {
        name: "Twistscape",
        slug: "twistscape",
        collectionId: 1,
        description: "A contemporary interpretation of traditional motifs with modern color palettes.",
        material: "Hand-tufted wool",
        dimensions: "6' x 9'",
        colors: ["Navy", "Silver", "Ivory"],
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: false
      }
    ];

    productsData.forEach(product => {
      this.createProduct(product);
    });
  }

  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(collection => collection.featured);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return Array.from(this.collections.values()).find(collection => collection.slug === slug);
  }

  async getCollectionsByCategory(category: string): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(collection => collection.category === category);
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.currentCollectionId++;
    const collection: Collection = { ...insertCollection, id };
    this.collections.set(id, collection);
    return collection;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProductsByCollection(collectionId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.collectionId === collectionId);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date().toISOString()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getCollections(): Promise<Collection[]> {
    return await db.select().from(collections);
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return await db.select().from(collections).where(eq(collections.featured, true));
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.slug, slug));
    return collection || undefined;
  }

  async getCollectionsByCategory(category: string): Promise<Collection[]> {
    return await db.select().from(collections).where(eq(collections.category, category));
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const [collection] = await db
      .insert(collections)
      .values(insertCollection)
      .returning();
    return collection;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async getProductsByCollection(collectionId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.collectionId, collectionId));
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        ...insertInquiry,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }
}

export const storage = new DatabaseStorage();
