import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import inquiriesRoute from "./routes/inquiries";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---------------- Logging Middleware ---------------- */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: unknown;

  const originalResJson = res.json.bind(res);

  res.json = (body: any) => {
    capturedJsonResponse = body;
    return originalResJson(body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }
      log(logLine);
    }
  });

  next();
});

/* ---------------- Routes ---------------- */
app.use("/api/inquiries", inquiriesRoute);

/* ---------------- Bootstrap Server ---------------- */
(async () => {
  const server = await registerRoutes(app);

  /* ---------- Error Handler ---------- */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  /* ---------- Vite / Static ---------- */
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  /* ---------- SERVER LISTEN (WINDOWS SAFE) ---------- */
  const PORT = Number(process.env.PORT) || 5000;
  const HOST = "127.0.0.1";

  server.listen(PORT, HOST, () => {
    log(`✅ Server running at http://${HOST}:${PORT}`);
  });
})();
