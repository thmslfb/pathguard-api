const { v4: uuidv4 } = require("uuid");
const calculateRiskScore = require("../utils/risk-scoring");
const { createVerification } = require("../models/verification-model");

const LOW_THRESHOLD = parseFloat(process.env.LOW_THRESHOLD) || 0.2;
const HIGH_THRESHOLD = parseFloat(process.env.HIGH_THRESHOLD) || 0.5;

const verifyAndSave = async (
  { name, email, documentType },
  isSwaggerRequest = false
) => {
  const riskScore = calculateRiskScore({ name, email, documentType });

  const status =
    riskScore > HIGH_THRESHOLD
      ? "rejected"
      : riskScore > LOW_THRESHOLD
      ? "pending_review"
      : "approved";

  const verificationId = `ver_${uuidv4()}`;

  if (!isSwaggerRequest) {
    await createVerification({
      verification_id: verificationId,
      status,
      score: riskScore,
    });
  }

  return {
    verification_id: verificationId,
    status,
    risk_score: riskScore,
    checks_performed: ["name", "email", "documentType"],
    timestamp: new Date().toISOString(),
  };
};

module.exports = verifyAndSave;
