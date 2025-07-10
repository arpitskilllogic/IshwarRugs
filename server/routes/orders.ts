import { Router } from "express";
import { db } from "../db";

const router = Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await db.order.findMany({
      include: {
        customer: true,
        product: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
