import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const FRONTEND_URL_FALLBACK = process.env.FRONTEND_URL_FALLBACK;
const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  FRONTEND_URL_FALLBACK,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: false,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "mail-api" });
});
app.get("/", (_req, res) => {
  res.send("Backend Running Successfully 🚀");
});
app.use("/api", contactRouter);

/* eslint-disable-next-line no-unused-vars */
app.use((err, _req, res, _next) => {
  console.error("Unhandled API error:", err);
  res.status(500).json({ ok: false, error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Mail server running on http://localhost:${PORT}`);
});
