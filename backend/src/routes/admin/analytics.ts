import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const adminAnalyticsRouter = Router();

adminAnalyticsRouter.get("/dashboard", async (_req, res) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalViews,
    weekViews,
    monthViews,
    totalSubmissions,
    unreadSubmissions,
    totalProducts,
    topPages,
  ] = await Promise.all([
    prisma.analyticsEvent.count(),
    prisma.analyticsEvent.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.analyticsEvent.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.formSubmission.count(),
    prisma.formSubmission.count({ where: { read: false } }),
    prisma.product.count(),
    prisma.analyticsEvent.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
  ]);

  res.json({
    success: true,
    data: {
      totalViews,
      weekViews,
      monthViews,
      totalSubmissions,
      unreadSubmissions,
      totalProducts,
      topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
    },
  });
});
