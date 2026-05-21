import nodemailer from "nodemailer";

export const createMailerTransport = () =>
  nodemailer.createTransport({
    service: "gmail",
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
