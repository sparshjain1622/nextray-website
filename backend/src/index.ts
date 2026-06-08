import "dotenv/config";
import { createApp } from "./app";
import { validateEnv } from "./lib/env";

validateEnv();

const app = createApp();
const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.listen(PORT, () => {
  console.log(`Nextray API → http://localhost:${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`Admin panel → ${FRONTEND_URL}/admin`);
  }
});
