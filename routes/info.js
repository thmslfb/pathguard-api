const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

module.exports = router;
