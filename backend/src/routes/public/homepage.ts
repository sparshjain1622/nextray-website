import { Router } from "express";
import { getHomepageContent } from "../../lib/homepage";

export const publicHomepageRouter = Router();

publicHomepageRouter.get("/", async (_req, res) => {
  const data = await getHomepageContent();
  res.json({ success: true, data });
});
