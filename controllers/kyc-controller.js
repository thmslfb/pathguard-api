const createVerification = require("../models/verification-model");
const calculateRiskScore = require("../utils/risk-scoring");

const LOW_THRESHOLD = parseFloat(process.env.LOW_THRESHOLD) || 0.2;
const HIGH_THRESHOLD = parseFloat(process.env.HIGH_THRESHOLD) || 0.5;

exports.verify = async (req, res, next) => {
  try {
    const { name, email, documentType } = req.body;
    const riskScore = calculateRiskScore({ name, email, documentType });

    const status =
      riskScore > HIGH_THRESHOLD
        ? "rejected"
        : riskScore > LOW_THRESHOLD
        ? "pending_review"
        : "approved";

    const verificationId = `ver_${Date.now()}`;

    await createVerification({
      verification_id: verificationId,
      status,
      score: riskScore,
    });

    const responseObject = {
      verification_id: verificationId,
      status: status,
      risk_score: riskScore,
      checks_performed: ["name", "email", "documentType"],
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(responseObject);
  } catch (error) {
    next(error);
  }
};
