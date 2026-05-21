import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

const normalizeOrigin = (origin = "") => origin.trim().replace(/\/$/, "");
const FRONTEND_URL = normalizeOrigin(
  process.env.FRONTEND_URL || "http://localhost:5173",
);
const FRONTEND_URL_FALLBACK = normalizeOrigin(
  process.env.FRONTEND_URL_FALLBACK || "",
);
const EXTRA_ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

const ALLOWED_ORIGINS = new Set(
  [
    FRONTEND_URL,
    FRONTEND_URL_FALLBACK,
    "https://riva-dtf-enterprise.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    ...EXTRA_ALLOWED_ORIGINS,
  ].filter(Boolean),
);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.has(normalizeOrigin(origin))) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true, service: "riva-enterprise-api" });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "mail-api" });
});

app.use("/api", contactRouter);
app.use("/", contactRouter);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* eslint-disable-next-line no-unused-vars */
app.use((err, _req, res, _next) => {
  console.error("Unhandled API error:", err);
  res.status(500).json({
    ok: false,
    error: err.message?.startsWith("CORS blocked")
      ? "Request origin is not allowed by CORS."
      : "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`Mail server running on http://localhost:${PORT}`);
});
