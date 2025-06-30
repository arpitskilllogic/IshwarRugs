import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  featured: boolean("featured").default(false),
  category: text("category").notNull(), // contemporary, modern, traditional
  heroImage: text("hero_image").notNull(),
  galleryImages: jsonb("gallery_images").$type<string[]>().default([]),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  collectionId: integer("collection_id").references(() => collections.id),
  description: text("description").notNull(),
  material: text("material"),
  dimensions: text("dimensions"),
  colors: jsonb("colors").$type<string[]>().default([]),
  images: jsonb("images").$type<string[]>().default([]),
  featured: boolean("featured").default(false),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  type: text("type").default("general"), // general, custom_design, collection_inquiry
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

// Relations
export const collectionsRelations = relations(collections, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  collection: one(collections, {
    fields: [products.collectionId],
    references: [collections.id],
  }),
}));

export type Collection = typeof collections.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
