const calculateRiskScore = require("../utils/risk-scoring");

const LOW_THRESHOLD = parseFloat(process.env.LOW_THRESHOLD) || 0.2;
const HIGH_THRESHOLD = parseFloat(process.env.HIGH_THRESHOLD) || 0.5;

exports.verify = async (req, res, next) => {
  console.log("Request body:", req.body);
  try {
    const { name, email, documentType } = req.body;

    if (!name || !email || !documentType) {
      const missing = ["name", "email", "documentType"].filter(
        (f) => !req.body[f]
      );
      return res.status(400).json({
        error: "Missing required fields",
        missing,
      });
    }

    if (
      isNaN(LOW_THRESHOLD) ||
      isNaN(HIGH_THRESHOLD) ||
      LOW_THRESHOLD < 0 ||
      HIGH_THRESHOLD > 1 ||
      LOW_THRESHOLD >= HIGH_THRESHOLD
    ) {
      throw new Error("Invalid KYC threshold configuration");
    }

    const riskScore = calculateRiskScore({ name, email, documentType });

    let status = "";
    if (riskScore < LOW_THRESHOLD) status = "approved";
    else if (riskScore < HIGH_THRESHOLD) status = "pending_review";
    else status = "rejected";

    const verificationId = `ver_${Date.now()}`;

    // TODO : Save to database

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
