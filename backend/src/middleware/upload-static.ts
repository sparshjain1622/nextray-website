import { Request, Response, NextFunction } from "express";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

/** Harden publicly served uploads against XSS / MIME sniffing */
export function secureUploadHeaders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
  res.setHeader("X-Frame-Options", "DENY");

  if (!IMAGE_EXT.test(req.path)) {
    res.setHeader("Content-Disposition", "attachment");
  }

  next();
}
