import { Router } from "express";
import {
  contactFormSchema,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from "@nextray/shared";
import { handleFormSubmission } from "../services/form-handler";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const parsed = contactFormSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: ApiErrorResponse = {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
    return res.status(400).json(response);
  }

  const id = await handleFormSubmission(
    "contact",
    parsed.data,
    req.ip
  );

  const response: ApiSuccessResponse = {
    success: true,
    message: "Form submitted successfully. Thank you for reaching out — we will respond to your inquiry shortly.",
    id,
  };
  return res.json(response);
});
