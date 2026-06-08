import "dotenv/config";
import { execSync } from "child_process";
import { createApp } from "./app";
import { ensureAdminUser } from "./lib/bootstrap";
import { validateEnv } from "./lib/env";
import { prisma } from "./lib/prisma";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

async function main() {
  validateEnv();

  const app = createApp();
  const PORT = Number(process.env.PORT) || 4000;
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    await prisma.$connect();
    console.log("✓ Database connected");
  } catch (err) {
    console.error("✗ Database connection failed:", err);
    process.exit(1);
  }

  if (process.env.NODE_ENV === "production") {
    try {
      execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
      console.log("✓ Database schema synced");
      await ensureAdminUser();
    } catch (err) {
      console.error("✗ Database bootstrap failed:", err);
      process.exit(1);
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nextray API listening on 0.0.0.0:${PORT}`);
    console.log(`CORS origin: ${FRONTEND_URL}`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`Admin panel → ${FRONTEND_URL}/admin`);
    }
  });
}

main().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
