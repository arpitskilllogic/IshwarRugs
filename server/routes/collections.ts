import { Router } from "express";
import { db } from "../db";
import { insertCollectionSchema } from "@shared/schema";
import { ZodError } from "zod";

const router = Router();

// ✅ GET collection by slug (must come before /:id route)
router.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const collection = await db.collection.findUnique({
      where: { slug },
    });
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch collection by slug" });
  }
});

// ✅ GET featured collections
router.get("/featured", async (_req, res) => {
  try {
    const featured = await db.collection.findMany({
      where: { featured: true },
      orderBy: { id: "desc" },
    });
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch featured collections" });
  }
});

// ✅ GET all collections
router.get("/", async (_req, res) => {
  try {
    const collections = await db.collection.findMany({
      orderBy: { id: "desc" },
    });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

// ✅ GET one collection by ID (must come after /slug/:slug and /featured)
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const collection = await db.collection.findUnique({ where: { id } });
    if (!collection) return res.status(404).json({ error: "Not found" });
    res.json(collection);
  } catch {
    res.status(500).json({ error: "Failed to fetch collection" });
  }
});

// ✅ CREATE a new collection
router.post("/", async (req, res) => {
  try {
    const data = insertCollectionSchema.parse(req.body);
    const created = await db.collection.create({ data });
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    res.status(500).json({ error: "Failed to create collection" });
  }
});

// ✅ UPDATE a collection
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const data = insertCollectionSchema.partial().parse(req.body);
    const updated = await db.collection.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    res.status(500).json({ error: "Failed to update collection" });
  }
});

// ✅ DELETE a collection
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    await db.collection.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete collection" });
  }
});

export default router;