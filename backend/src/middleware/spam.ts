import { Request, Response, NextFunction } from "express";

/** Reject bot submissions via honeypot field */
export function honeypotCheck(req: Request, res: Response, next: NextFunction) {
  const trap = req.body?._honeypot;
  if (trap && String(trap).length > 0) {
    return res.status(400).json({ success: false, message: "Submission rejected." });
  }
  delete req.body._honeypot;
  next();
}
