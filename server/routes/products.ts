import { Router } from "express";
import { db } from "../db";
import { insertProductSchema } from "@shared/schema";
import { ZodError } from "zod";

const router = Router();

// ✅ GET all products — supports ?category=
router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    const products = await db.product.findMany({
      where: category
        ? {
            collection: {
              category: {
                equals: String(category),
                mode: "insensitive",
              },
            },
          }
        : undefined,
      include: { collection: true },
      orderBy: { id: "desc" },
    });

    res.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ GET products by collectionId
router.get("/collection/:collectionId", async (req, res) => {
  const collectionId = parseInt(req.params.collectionId);
  if (isNaN(collectionId)) {
    return res.status(400).json({ error: "Invalid collection ID" });
  }

  try {
    const products = await db.product.findMany({
      where: { collectionId },
      orderBy: { id: "desc" },
    });
    res.json(products);
  } catch (err) {
    console.error("Failed to fetch products by collection:", err);
    res.status(500).json({ error: "Failed to fetch products by collection" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { collection: true },
    });

    if (!product) return res.status(404).json({ error: "Not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST new product
router.post("/", async (req, res) => {
  try {
    const data = insertProductSchema.parse(req.body);
    const created = await db.product.create({ data });
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const data = insertProductSchema.partial().parse(req.body);
    const updated = await db.product.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    await db.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;