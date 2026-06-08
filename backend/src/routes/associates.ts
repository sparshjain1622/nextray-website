import { Router } from "express";
import {
  associatesFormSchema,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from "@nextray/shared";
import { handleFormSubmission } from "../services/form-handler";

export const associatesRouter = Router();

associatesRouter.post("/", async (req, res) => {
  const parsed = associatesFormSchema.safeParse(req.body);

  if (!parsed.success) {
    const response: ApiErrorResponse = {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
    return res.status(400).json(response);
  }

  const id = await handleFormSubmission(
    "associates",
    parsed.data,
    req.ip
  );

  const response: ApiSuccessResponse = {
    success: true,
    message:
      "Form submitted successfully. Thank you for your interest — our partnerships team will contact you shortly.",
    id,
  };
  return res.json(response);
});
