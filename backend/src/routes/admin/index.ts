import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { authRouter } from "./auth";
import { adminProductsRouter } from "./products";
import { adminCategoriesRouter } from "./categories";
import { adminSubmissionsRouter } from "./submissions";
import { adminAnalyticsRouter } from "./analytics";
import { adminMediaRouter } from "./media";
import { adminHomepageRouter } from "./homepage";
import { adminBlogRouter } from "./blog";
import { adminUtilsRouter } from "./utils";

export const adminRouter = Router();

adminRouter.use("/auth", authRouter);

const protectedAdmin = Router();
protectedAdmin.use(requireAuth);
protectedAdmin.use("/products", adminProductsRouter);
protectedAdmin.use("/categories", adminCategoriesRouter);
protectedAdmin.use("/submissions", adminSubmissionsRouter);
protectedAdmin.use("/analytics", adminAnalyticsRouter);
protectedAdmin.use("/media", adminMediaRouter);
protectedAdmin.use("/homepage", adminHomepageRouter);
protectedAdmin.use("/blog", adminBlogRouter);
protectedAdmin.use("/utils", adminUtilsRouter);
adminRouter.use(protectedAdmin);
