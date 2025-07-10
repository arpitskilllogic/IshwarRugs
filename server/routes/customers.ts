import { Router } from "express";
import { db } from "../db";

const router = Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await db.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

export default router;
