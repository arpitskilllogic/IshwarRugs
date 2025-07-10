import {
  type Collection,
  type Product,
  type Inquiry,
  type InsertCollection,
  type InsertProduct,
  type InsertInquiry,
} from "@shared/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IStorage {
  getCollections(): Promise<Collection[]>;
  getFeaturedCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  getCollectionsByCategory(category: string): Promise<Collection[]>;
  createCollection(collection: InsertCollection): Promise<Collection>;

  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCollection(collectionId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class DatabaseStorage implements IStorage {
  async getCollections(): Promise<Collection[]> {
    return await prisma.collection.findMany();
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return await prisma.collection.findMany({
      where: { featured: true },
    });
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return (await prisma.collection.findUnique({ where: { slug } })) ?? undefined;
  }

  async getCollectionsByCategory(category: string): Promise<Collection[]> {
    return await prisma.collection.findMany({
      where: { category },
    });
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    return await prisma.collection.create({
      data: collection,
    });
  }

  async getProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      where: { featured: true },
    });
  }

  async getProductsByCollection(collectionId: number): Promise<Product[]> {
    return await prisma.product.findMany({
      where: { collectionId },
    });
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return (await prisma.product.findUnique({ where: { slug } })) ?? undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    return await prisma.product.create({
      data: product,
    });
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    return await prisma.inquiry.create({
      data: {
        ...inquiry,
        createdAt: new Date().toISOString(),
      },
    });
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await prisma.inquiry.findMany();
  }
}

export const storage = new DatabaseStorage();
