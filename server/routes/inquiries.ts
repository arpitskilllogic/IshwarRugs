import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// POST a new inquiry
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message, type = "general" } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const inquiry = await db.inquiry.create({
      data: { name, email, phone, subject, message, type },
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

export default router;