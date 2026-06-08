import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/** Ensure admin exists after schema is pushed (Render has no release command on free tier). */
export async function ensureAdminUser(): Promise<void> {
  const email = process.env.ADMIN_EMAIL || "admin@nextray-tech.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn("ADMIN_PASSWORD not set — admin user not bootstrapped");
    return;
  }

  await prisma.admin.upsert({
    where: { email },
    create: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: "Nextray Admin",
    },
    update: {
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  console.log(`✓ Admin ready: ${email}`);
}
