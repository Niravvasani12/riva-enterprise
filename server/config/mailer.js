import nodemailer from "nodemailer";

const getGmailAppPassword = () =>
  String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");

export const createMailerTransport = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
    auth: {
      user: String(process.env.GMAIL_USER || "").trim(),
      pass: getGmailAppPassword(),
    },
  });
