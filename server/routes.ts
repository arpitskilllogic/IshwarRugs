// server/registerRoutes.ts

import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertInquirySchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db";

// Route modules
import productsRoutes from "./routes/products";
import inquiriesRoutes from "./routes/inquiries";
import customersRoutes from "./routes/customers";
import ordersRoutes from "./routes/orders";
import collectionsRoutes from "./routes/collections"; // ✅ NEW

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await db.admin.findUnique({ where: { email } });
      if (!admin) return res.status(401).json({ error: "Invalid credentials" });

      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ✅ Mount route files
  app.use("/api/products", productsRoutes);
  app.use("/api/inquiries", inquiriesRoutes);
  app.use("/api/customers", customersRoutes);
  app.use("/api/orders", ordersRoutes);
  app.use("/api/collections", collectionsRoutes); // ✅ MOUNTED

  const httpServer = createServer(app);
  return httpServer;
}