import nodemailer from "nodemailer";

const getGmailAppPassword = () =>
  String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");

const getAuth = () => ({
  user: String(process.env.GMAIL_USER || "").trim(),
  pass: getGmailAppPassword(),
});

export const createMailerTransport = ({ secure = true } = {}) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: secure ? 465 : 587,
    secure,
    requireTLS: !secure,
    auth: getAuth(),
  });

export const createMailerTransports = () => [
  createMailerTransport({ secure: true }),
  createMailerTransport({ secure: false }),
];
