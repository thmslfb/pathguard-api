const { v4: uuidv4 } = require("uuid");
const calculateRiskScore = require("../utils/risk-scoring");
const {
  createVerification,
  getVerificationsFromDB,
  getVerificationByIdFromDB,
  updateVerificationStatusInDB,
} = require("../models/verification-model");
const {
  getMockVerifications,
  getMockVerificationById,
  updateMockVerificationStatus,
} = require("../utils/mock-data");

const LOW_THRESHOLD = parseFloat(process.env.LOW_THRESHOLD) || 0.2;
const HIGH_THRESHOLD = parseFloat(process.env.HIGH_THRESHOLD) || 0.5;

const verifyAndSave = async (
  { name, email, documentType },
  isScalarRequest = false
) => {
  const riskScore = calculateRiskScore({ name, email, documentType });

  const status =
    riskScore > HIGH_THRESHOLD
      ? "rejected"
      : riskScore > LOW_THRESHOLD
      ? "pending_review"
      : "approved";

  const verificationId = `ver_${uuidv4()}`;

  if (!isScalarRequest) {
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

const getVerifications = async (limit, offset, isScalarRequest = false) => {
  return isScalarRequest
    ? getMockVerifications(limit, offset)
    : await getVerificationsFromDB(limit, offset);
};

const getVerificationById = async (id, isScalarRequest = false) => {
  return isScalarRequest
    ? getMockVerificationById(id)
    : await getVerificationByIdFromDB(id);
};

const updateVerificationStatus = async (
  id,
  status,
  isScalarRequest = false
) => {
  return isScalarRequest
    ? updateMockVerificationStatus(id, status)
    : await updateVerificationStatusInDB(id, status);
};

module.exports = {
  verifyAndSave,
  getVerifications,
  getVerificationById,
  updateVerificationStatus,
};
