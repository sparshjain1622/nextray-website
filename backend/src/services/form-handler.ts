import type { AssociatesFormPayload, ContactFormPayload } from "@nextray/shared";
import { prisma } from "../lib/prisma";
import { sendFormNotification } from "./email";

type FormType = "contact" | "associates";
type FormPayload = ContactFormPayload | AssociatesFormPayload;

export async function handleFormSubmission(
  type: FormType,
  data: FormPayload,
  ip?: string
): Promise<string> {
  const { _honeypot, ...clean } = data as FormPayload & { _honeypot?: string };

  const submission = await prisma.formSubmission.create({
    data: {
      type,
      data: JSON.stringify(clean),
      ip: ip ?? null,
    },
  });

  await sendFormNotification(type, clean as Record<string, unknown>);

  return submission.id;
}
