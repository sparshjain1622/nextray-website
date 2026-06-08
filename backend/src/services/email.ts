import nodemailer from "nodemailer";

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

const NOTIFY_EMAIL =
  process.env.NOTIFY_EMAIL || "sales@nextray-tech.com";

export async function sendFormNotification(
  type: string,
  data: Record<string, unknown>
): Promise<void> {
  const subject = `[Nextray] New ${type} form submission`;
  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  console.log(`\n📧 ${subject}\n${body}\n`);

  if (!transporter) {
    console.log("(SMTP not configured — email logged only)\n");
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || NOTIFY_EMAIL,
    to: NOTIFY_EMAIL,
    subject,
    text: body,
  });
}
