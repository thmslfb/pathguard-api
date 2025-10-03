const express = require("express");
const { createVerification } = require("../controllers/kyc-controller");
const validateBody = require("../middleware/validation");
const verificationSchema = require("../schemas/verification-schema");

const router = express.Router();

/**
 * @swagger
 * /api/v1/kyc:
 *   get:
 *     tags: [KYC]
 *     summary: Get KYC endpoint information
 *     description: Retrieve a list of all KYC verification endpoints, available methods, and documentation links.
 *     responses:
 *       200:
 *         description: Successful response with KYC endpoint information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "KYC service endpoints"
 *                 endpoints:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: "/api/v1/kyc/verifications"
 *                       method:
 *                         type: string
 *                         example: "POST"
 *                       description:
 *                         type: string
 *                         example: "Perform identity verification"
 *                 documentation:
 *                   type: string
 *                   example: "/api/v1/docs#KYC"
 */

router.get("/", (req, res) => {
  res.json({
    message: "KYC service endpoints",
    endpoints: [
      {
        path: "/api/v1/kyc/verifications",
        method: "POST",
        description: "Perform identity verification",
      },
    ],
    documentation: "/api/v1/docs#KYC",
  });
});

/**
 * @swagger
 * /api/v1/kyc/verifications:
 *   post:
 *     tags: [KYC]
 *     summary: Verify user identity
 *     description: Perform KYC verification with risk scoring and validation checks.
 *     operationId: verifyKyc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - documentType
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Full name of the person (2-100 characters)
 *                 example: "Alice Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Valid email address (will be converted to lowercase)
 *                 example: "alice.dupont@company.com"
 *               documentType:
 *                 type: string
 *                 enum: ["passport", "id_card", "driver_license"]
 *                 description: Type of identification document
 *                 example: "id_card"
 *     responses:
 *       200:
 *         description: Verification completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verification_id:
 *                   type: string
 *                   pattern: "^ver_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
 *                   description: Unique verification identifier with 'ver_' prefix
 *                   example: "ver_123e4567-e89b-12d3-a456-426614174000"
 *                 status:
 *                   type: string
 *                   enum: ["approved", "pending_review", "rejected"]
 *                   description: "Verification status: approved (score ≤ 0.2), pending_review (0.2 < score ≤ 0.5), rejected (score > 0.5)"
 *                   example: "approved"
 *                 risk_score:
 *                   type: number
 *                   format: float
 *                   minimum: 0
 *                   maximum: 1
 *                   description: Calculated risk score based on name length, email validity, and document type
 *                   example: 0.1
 *                 checks_performed:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of validation checks performed during verification
 *                   example: ["name", "email", "documentType"]
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: ISO 8601 timestamp of when the verification was processed
 *                   example: "2025-09-30T10:30:00.000Z"
 *       400:
 *         description: Validation error - invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The field that failed validation
 *                         example: "name"
 *                       message:
 *                         type: string
 *                         description: Detailed validation error message
 *                         example: "Name must be at least 2 characters long"
 *                   example:
 *                     - field: "name"
 *                       message: "Name must be at least 2 characters long"
 *                     - field: "email"
 *                       message: "Invalid email format"
 *                     - field: "documentType"
 *                       message: "Invalid option: expected one of \"passport\"|\"id_card\"|\"driver_license\""
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post(
  "/verifications",
  validateBody(verificationSchema),
  createVerification
);

module.exports = router;
