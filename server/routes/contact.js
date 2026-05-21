import express from "express";
import fs from "fs";
import path from "path";
import { createMailerTransport } from "../config/mailer.js";

const router = express.Router();
const transport = createMailerTransport();

const sanitize = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const validatePayload = ({ name, email, phone, message }) => {
  if (!name || !email || !phone || !message) {
    return "All fields are required.";
  }

  if (String(name).trim().length < 2) {
    return "Invalid name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    return "Invalid email address.";
  }

  if (!/^\d{10}$/.test(String(phone).replace(/\D/g, ""))) {
    return "Invalid phone number.";
  }

  if (String(message).trim().length < 10) {
    return "Message should be at least 10 characters.";
  }

  return null;
};

const ensureAccepted = (mailResult, expectedRecipient, label) => {
  const acceptedRecipients = Array.isArray(mailResult?.accepted)
    ? mailResult.accepted.map((value) => String(value).toLowerCase())
    : [];

  if (!acceptedRecipients.includes(String(expectedRecipient).toLowerCase())) {
    throw new Error(`${label} was not accepted by SMTP provider.`);
  }
};

const getMailErrorMessage = (mailError) => {
  if (mailError?.code === "EAUTH" || mailError?.responseCode === 535) {
    return "Gmail authentication failed. Please check GMAIL_USER and GMAIL_APP_PASSWORD on Render.";
  }

  if (mailError?.code === "ETIMEDOUT" || mailError?.code === "ESOCKET") {
    return "Mail server timed out. Please try again in a few seconds.";
  }

  if (mailError?.responseCode >= 500) {
    return "Gmail rejected the email. Please check your Gmail App Password and sender account.";
  }

  return "Unable to send email right now. Please try again.";
};

const getSafeMailLog = (mailError) => ({
  code: mailError?.code,
  command: mailError?.command,
  responseCode: mailError?.responseCode,
  response: mailError?.response,
  message: mailError?.message,
});

const handleContactRequest = async (req, res) => {
  const payload = req.body || {};
  const error = validatePayload(payload);

  if (error) {
    return res.status(400).json({ ok: false, error });
  }

  const safeName = sanitize(String(payload.name).trim());
  const safeEmail = String(payload.email).trim().toLowerCase();
  const safePhone = String(payload.phone).replace(/\D/g, "");
  const safeMessage = sanitize(String(payload.message).trim());

  const ownerEmail = String(
    process.env.OWNER_EMAIL || "rivaenterprise2208@gmail.com",
  ).trim();
  const fromEmail = String(process.env.GMAIL_USER || "").trim();
  const gmailAppPassword = String(process.env.GMAIL_APP_PASSWORD || "").trim();

  if (!fromEmail || !gmailAppPassword) {
    return res.status(500).json({
      ok: false,
      error: "Mail server is not configured. Please check Gmail credentials.",
    });
  }

  const rateCardPath = path.resolve(process.cwd(), "Riva.png");
  const hasRateCardImage =
    process.env.ATTACH_RATE_CARD === "true" && fs.existsSync(rateCardPath);

  try {
    const adminMailResult = await transport.sendMail({
      from: `"Riva Enterprise Website" <${fromEmail}>`,
      to: ownerEmail,
      replyTo: safeEmail,
      subject: `New Contact Inquiry from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${sanitize(safeEmail)}</p>
          <p><strong>Phone:</strong> ${sanitize(safePhone)}</p>
          <p><strong>Message:</strong><br/>${safeMessage}</p>
        </div>
      `,
    });

    ensureAccepted(adminMailResult, ownerEmail, "Admin notification email");

    let welcomeMailResult = null;
    let autoReplySent = false;

    try {
      welcomeMailResult = await transport.sendMail({
        from: `"Riva Enterprise" <${fromEmail}>`,
        to: safeEmail,
        subject: "Welcome To Riva Enterprise",
        text: `Thank you for contacting Riva Enterprise.

We have received your inquiry successfully.

For price listing and order-related information, please call or WhatsApp:
80005-72371

We will contact you shortly.

Regards,
Riva Enterprise`,
        html: `
        <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #dbe7ff;">
                  <tr>
                    <td style="padding:22px 24px;background:linear-gradient(90deg,#0b1228,#123d2e);">
                      <h1 style="margin:0;font-size:28px;letter-spacing:1px;color:#22c55e;font-weight:800;">Welcome To <span style="color:#ffffff;">Riva Enterprise</span></h1>
                      <p style="margin:10px 0 0 0;font-size:14px;color:#cde6ff;">Premium DTF Printing | Fast Response | Best Support</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 24px 10px 24px;color:#1f2937;">
                      <p style="margin:0 0 10px 0;font-size:15px;">Thank you for contacting <b style="color:#0f172a;">Riva Enterprise</b>.</p>
                      <p style="margin:0 0 10px 0;font-size:15px;">We have received your inquiry successfully.</p>
                      <p style="margin:0 0 10px 0;font-size:15px;">For price listing and order-related information, please call or WhatsApp: <b style="color:#16a34a;">80005-72371</b></p>
                      <p style="margin:0;font-size:15px;">We will contact you shortly.</p>
                    </td>
                  </tr>
                  ${
                    hasRateCardImage
                      ? `<tr><td style="padding:14px 24px 6px 24px;"><img src="cid:riva-rate-card" alt="Riva DTF Rate Card" style="width:100%;max-width:560px;border-radius:10px;border:1px solid #22c55e;display:block;" /></td></tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:10px 24px 8px 24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #bbf7d0;border-radius:10px;overflow:hidden;">
                        <tr style="background:#16a34a;">
                          <th align="left" style="padding:10px 12px;color:#ffffff;font-size:14px;">DTF Printing Range</th>
                          <th align="left" style="padding:10px 12px;color:#ffffff;font-size:14px;">Rate</th>
                        </tr>
                        <tr><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#0f172a;">2m - 30m</td><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#16a34a;font-weight:700;">&#8377;170 / mtr</td></tr>
                        <tr style="background:#f8fffa;"><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#0f172a;">31m - 50m</td><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#16a34a;font-weight:700;">&#8377;150 / mtr</td></tr>
                        <tr><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#0f172a;">51m - 99m</td><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#16a34a;font-weight:700;">&#8377;130 / mtr</td></tr>
                        <tr style="background:#f8fffa;"><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#0f172a;">100m & Above</td><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#16a34a;font-weight:700;">&#8377;100 / mtr</td></tr>
                        <tr><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#0f172a;">500m & Above</td><td style="padding:10px 12px;border-top:1px solid #dcfce7;color:#16a34a;font-weight:700;">&#8377;90 / mtr</td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px 20px 24px;">
                      <p style="margin:0 0 6px 0;color:#0f172a;font-size:14px;"><b>Shipping:</b> Extra</p>
                      <p style="margin:0 0 16px 0;color:#0f172a;font-size:14px;"><b>Bulk Orders:</b> Welcome</p>
                      <p style="margin:0;color:#475569;font-size:14px;">Regards,<br/><b style="color:#0f172a;">Riva Enterprise</b></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
        attachments: hasRateCardImage
          ? [
              {
                filename: "Riva-Rate-Card.png",
                path: rateCardPath,
                cid: "riva-rate-card",
              },
            ]
          : [],
      });

      ensureAccepted(welcomeMailResult, safeEmail, "Welcome email");
      autoReplySent = true;
    } catch (autoReplyError) {
      console.warn("Contact auto-reply mail warning:", getSafeMailLog(autoReplyError));
    }

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully",
      data: {
        adminMessageId: adminMailResult.messageId,
        autoReplySent,
        autoReplyMessageId: welcomeMailResult?.messageId || null,
      },
    });
  } catch (mailError) {
    console.error("Contact admin mail error:", getSafeMailLog(mailError));
    return res.status(500).json({
      ok: false,
      error: getMailErrorMessage(mailError),
    });
  }
};

router.post("/contact", handleContactRequest);

export default router;
