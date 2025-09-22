const MIN_NAME_LENGTH = 2;
const NAME_MISSING_PENALTY = 0.2;
const EMAIL_INVALID_PENALTY = 0.3;
const DOCUMENT_INVALID_PENALTY = 0.5;
const ALLOWED_DOCUMENT_TYPES = ["passport", "id_card", "driver_license"];

const calculateRiskScore = (data) => {
  let score = 0;

  if (!data.name || data.name.length < MIN_NAME_LENGTH)
    score += NAME_MISSING_PENALTY;

  if (!data.email || !data.email.includes("@")) score += EMAIL_INVALID_PENALTY;

  if (!ALLOWED_DOCUMENT_TYPES.includes(data.documentType))
    score += DOCUMENT_INVALID_PENALTY;

  if (score > 1) score = 1;

  return Math.round(score * 1000) / 1000;
};

module.exports = calculateRiskScore;
