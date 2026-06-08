import express from "express";
import cors from "cors";
import path from "path";
import { healthRouter } from "./routes/health";
import { contactRouter } from "./routes/contact";
import { associatesRouter } from "./routes/associates";
import { analyticsRouter } from "./routes/analytics";
import { downloadsRouter } from "./routes/downloads";
import { publicProductsRouter } from "./routes/public/products";
import { publicCategoriesRouter } from "./routes/public/categories";
import { publicHomepageRouter } from "./routes/public/homepage";
import { publicBlogRouter } from "./routes/public/blog";
import { adminRouter } from "./routes/admin";
import {
  securityHeaders,
  globalLimiter,
  formLimiter,
  authLimiter,
  analyticsLimiter,
} from "./middleware/security";
import { honeypotCheck } from "./middleware/spam";
import { secureUploadHeaders } from "./middleware/upload-static";
import { isAllowedCorsOrigin, parseFrontendOrigins } from "./lib/cors";

export function createApp() {
  const app = express();
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
  const allowedOrigins = parseFrontendOrigins(FRONTEND_URL);
  const isProd = process.env.NODE_ENV === "production";

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(securityHeaders);
  app.use(globalLimiter);
  app.use(
    cors({
      origin(origin, callback) {
        if (isAllowedCorsOrigin(origin, allowedOrigins)) {
          callback(null, origin ?? true);
          return;
        }
        console.warn(`CORS blocked origin: ${origin}`);
        callback(null, false);
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.use(
    "/uploads",
    secureUploadHeaders,
    express.static(path.join(process.cwd(), "uploads"), {
      dotfiles: "deny",
      index: false,
    })
  );

  app.get("/", (_req, res) => {
    if (isProd) {
      return res.json({ service: "Nextray API", status: "running" });
    }
    res.json({
      service: "Nextray API",
      status: "running",
      frontend: FRONTEND_URL,
      admin: `${FRONTEND_URL}/admin`,
      endpoints: {
        health: "/api/health",
        products: "/api/products",
        categories: "/api/categories",
        downloads: "/api/downloads",
        contact: "POST /api/contact",
        associates: "POST /api/associates",
        homepage: "/api/homepage",
        blog: "/api/blog",
      },
    });
  });

  app.use("/api/health", healthRouter);
  app.use("/api/analytics", analyticsLimiter, analyticsRouter);
  app.use("/api/downloads", downloadsRouter);
  app.use("/api/products", publicProductsRouter);
  app.use("/api/categories", publicCategoriesRouter);
  app.use("/api/homepage", publicHomepageRouter);
  app.use("/api/blog", publicBlogRouter);

  app.use("/api/contact", formLimiter, honeypotCheck, contactRouter);
  app.use("/api/associates", formLimiter, honeypotCheck, associatesRouter);

  app.use("/api/admin/auth/login", authLimiter);
  app.use("/api/admin", adminRouter);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({ success: false, message: "Invalid JSON body" });
      return;
    }
    console.error("Request error:", err);
    if (res.headersSent) return;
    res.status(500).json({ success: false, message: "Internal server error" });
  });

  return app;
}
