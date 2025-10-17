const express = require("express");
const {
  createVerification,
  getVerificationsHandler,
  getVerificationByIdHandler,
} = require("../controllers/kyc-controller");
const validateRequest = require("../middleware/validation");
const {
  verificationSchema,
  verificationIdSchema,
} = require("../schemas/verification-schema");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "KYC service endpoints",
    endpoints: [
      {
        path: "/api/v1/kyc/verifications",
        method: "POST",
        description: "Perform identity verification",
      },
      {
        path: "/api/v1/kyc/verifications",
        method: "GET",
        description: "List all verifications",
      },
      {
        path: "/api/v1/kyc/verifications/{id}",
        method: "GET",
        description: "Get verification by ID",
      },
    ],
    documentation: "/api/v1/docs/#tag/kyc",
  });
});

router.post(
  "/verifications",
  validateRequest(verificationSchema),
  createVerification
);

router.get("/verifications", getVerificationsHandler);

router.get(
  "/verifications/:id",
  validateRequest(verificationIdSchema, "params"),
  getVerificationByIdHandler
);

module.exports = router;
