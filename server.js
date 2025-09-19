require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({
    message: "Welcome to PathGuard API.",
    version: "^1.0.0",
    endpoints: {
      health: "/health",
      kyc: "/api/v1/kyc",
      docs: "/api/v1/docs",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.get("/api/v1/kyc", (req, res) => {
  res.json({
    message: "KYC verification endpoint - to be implemented.",
    methods: ["POST"],
    documentation: "/api/v1/docs#kyc",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
