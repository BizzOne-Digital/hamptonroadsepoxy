import nodemailer from "nodemailer";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_APP_PASSWORD,
    },
  });
}

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: MailOptions): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured; skipping email send.");
    return;
  }

  await transporter.sendMail({
    from: `"Hampton Roads Epoxy" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

export function adminNotificationEmail(opts: {
  heading: string;
  rows: { label: string; value: string }[];
}): string {
  const rows = opts.rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#0E1A2B;">${r.label}</td><td style="padding:6px 12px;color:#0B1220;">${r.value}</td></tr>`
    )
    .join("");
  return `
    <div style="font-family:Arial,sans-serif;background:#F5F7FA;padding:24px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #E7ECF3;">
        <div style="background:#0E1A2B;padding:20px 24px;">
          <h1 style="color:#F5F7FA;font-size:18px;margin:0;">${opts.heading}</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
    </div>
  `;
}

export function customerConfirmationEmail(opts: { name: string; intro: string }): string {
  return `
    <div style="font-family:Arial,sans-serif;background:#F5F7FA;padding:24px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #E7ECF3;">
        <div style="background:#0E1A2B;padding:20px 24px;">
          <h1 style="color:#F5F7FA;font-size:18px;margin:0;">Hampton Roads Epoxy</h1>
        </div>
        <div style="padding:24px;color:#0B1220;">
          <p>Hi ${opts.name},</p>
          <p>${opts.intro}</p>
          <p>We appreciate you reaching out and will be in touch shortly. If you need immediate assistance, call us at <strong>757-718-0117</strong>.</p>
          <p style="margin-top:24px;">— Orlando Navarrete<br/>Hampton Roads Epoxy</p>
        </div>
      </div>
    </div>
  `;
}
