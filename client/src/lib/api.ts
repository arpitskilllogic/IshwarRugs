import { apiRequest } from "./queryClient";
import type { Collection, Product, InsertInquiry } from "@shared/schema";

export const api = {
  // Collections
  collections: {
    getAll: (): Promise<Collection[]> =>
      fetch("/api/collections").then((res) => res.json()),
    getFeatured: (): Promise<Collection[]> =>
      fetch("/api/collections/featured").then((res) => res.json()),
    getByCategory: (category: string): Promise<Collection[]> =>
      fetch(`/api/collections/category/${category}`).then((res) => res.json()),
    getBySlug: (slug: string): Promise<Collection> =>
      fetch(`/api/collections/${slug}`).then((res) => res.json()),
  },

  // Products
  products: {
    getAll: (): Promise<Product[]> =>
      fetch("/api/products").then((res) => res.json()),
    getFeatured: (): Promise<Product[]> =>
      fetch("/api/products/featured").then((res) => res.json()),
    getByCollection: (collectionId: number): Promise<Product[]> =>
      fetch(`/api/products/collection/${collectionId}`).then((res) => res.json()),
    getBySlug: (slug: string): Promise<Product> =>
      fetch(`/api/products/${slug}`).then((res) => res.json()),
  },

  // Inquiries
  inquiries: {
    create: async (inquiry: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", inquiry);
      return response.json();
    },
  },
};
