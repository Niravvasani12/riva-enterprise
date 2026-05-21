import nodemailer from "nodemailer";

const getGmailAppPassword = () =>
  String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");

export const createMailerTransport = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: String(process.env.GMAIL_USER || "").trim(),
      pass: getGmailAppPassword(),
    },
  });
