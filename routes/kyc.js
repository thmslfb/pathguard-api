const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "KYC verification endpoint - to be implemented.",
    methods: ["POST"],
    documentation: "/api/v1/docs#kyc",
  });
});

module.exports = router;
