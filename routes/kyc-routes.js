const express = require("express");
const { verify } = require("../controllers/kyc-controller");
const validateBody = require("../middleware/validation");
const verificationSchema = require("../schemas/verification-schema");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "KYC verification endpoint",
    methods: ["POST"],
    documentation: "/api/v1/docs#kyc",
  });
});

router.post("/verify", validateBody(verificationSchema), verify);

module.exports = router;
