import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const adminSubmissionsRouter = Router();

adminSubmissionsRouter.get("/", async (req, res) => {
  const type = req.query.type as string | undefined;
  const submissions = await prisma.formSubmission.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
  });
  res.json({
    success: true,
    data: submissions.map((s) => ({
      ...s,
      data: JSON.parse(s.data),
    })),
  });
});

adminSubmissionsRouter.patch("/:id/read", async (req, res) => {
  const submission = await prisma.formSubmission.update({
    where: { id: req.params.id },
    data: { read: true },
  });
  res.json({ success: true, data: submission });
});

adminSubmissionsRouter.delete("/:id", async (req, res) => {
  await prisma.formSubmission.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: "Deleted" });
});
