import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/authRoutes.ts";
import courseRoutes from "./routes/courseRoute.ts";
import { User, initMockData } from "./models/user.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize mock data
  await initMockData();

  app.use(express.json());
  app.use(cookieParser());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Test route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
  });

  app.get("/api/test-bcrypt", async (req, res) => {
    const { password, hash } = req.query;
    if (!password || !hash) return res.json({ error: "Missing password or hash" });
    const match = await bcrypt.compare(password as string, hash as string);
    res.json({ match });
  });

  app.get("/api/debug-admin", async (req, res) => {
    const admin = await User.findOne({ where: { email: "admin@learnos.com" } });
    if (!admin) return res.json({ error: "Admin not found" });
    res.json({ email: admin.email, role: admin.role, hash: admin.password });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/courses", (req, res, next) => {
    console.log(`Course Route Access: ${req.method} ${req.url}`);
    next();
  }, courseRoutes);

  // Catch-all API route for debugging 404s
app.use(/^\/api\/.*/, (req, res) => {
  console.log(`404 at ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
