import { z } from "zod"
import type { Collection, Product, Inquiry } from "@prisma/client"

// Zod schemas for insert validation

export const insertCollectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  featured: z.boolean().optional(),
  category: z.string(),
  heroImage: z.string(),
  galleryImages: z.array(z.string()).optional(),
})

export const insertProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  collectionId: z.number(),
  description: z.string(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  colors: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  price: z.number().nonnegative(), // ✅ Added validation for price
})

export const insertInquirySchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string(),
  type: z.string().optional(),
})

// Type aliases from Prisma Client
export type { Collection, Product, Inquiry }

export type InsertCollection = z.infer<typeof insertCollectionSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>
export type InsertInquiry = z.infer<typeof insertInquirySchema>
