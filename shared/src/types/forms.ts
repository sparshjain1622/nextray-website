import { z } from "zod";

const honeypot = z.object({
  _honeypot: z.string().max(0).optional().or(z.literal("")),
});

/** Contact page inquiry form */
export const contactFormSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(100),
    email: z.string().email("Valid email is required").max(254),
    phone: z.string().min(10, "Valid phone is required").max(20),
    subject: z.string().min(2, "Subject is required").max(200),
    message: z.string().min(10, "Message is required").max(5000),
  })
  .merge(honeypot);

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

/** Be Our Associates form */
export const associatesFormSchema = z
  .object({
    role: z.enum(["agent", "distributor"], {
      message: "Please select a partnership type",
    }),
    name: z.string().min(2, "Full name is required").max(100),
    company: z.string().min(2, "Company name is required").max(200),
    email: z.string().email("Valid email is required").max(254),
    phone: z.string().min(10, "Valid phone is required").max(20),
    city: z.string().min(2, "City is required").max(100),
    state: z.string().min(2, "State is required").max(100),
    message: z.string().max(5000).optional(),
  })
  .merge(honeypot);

export type AssociatesFormPayload = z.infer<typeof associatesFormSchema>;

export interface ApiSuccessResponse {
  success: true;
  message: string;
  id?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
