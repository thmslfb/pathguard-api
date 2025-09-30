const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const NAME_LENGTH_SHORT_PENALTY = 0.1;
const NAME_LENGTH_LONG_PENALTY = 0.05;
const NAME_SPECIAL_CHAR_PENALTY = 0.1;

const EMAIL_FORMAT_PENALTY = 0.2;
const GENERIC_EMAIL_DOMAIN_PENALTY = 0.15;
const DISPOSABLE_EMAIL_DOMAIN_PENALTY = 0.3;

const DOCUMENT_TYPE_WEIGHTS = {
  passport: 0.2,
  id_card: 0.1,
  driver_license: 0.1,
};

const GENERIC_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
];

const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
];

function calculateRiskScore({ name, email, documentType }) {
  let score = 0;

  const trimmedName = (name || "").trim();
  const length = trimmedName.length;
  if (length < MIN_NAME_LENGTH) {
    score += NAME_LENGTH_SHORT_PENALTY;
  } else if (length > MAX_NAME_LENGTH) {
    score += NAME_LENGTH_LONG_PENALTY;
  }

  if (/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/.test(trimmedName)) {
    score += NAME_SPECIAL_CHAR_PENALTY;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    score += EMAIL_FORMAT_PENALTY;
  } else {
    const domain = email.split("@")[1].toLowerCase();
    if (DISPOSABLE_DOMAINS.includes(domain)) {
      score += DISPOSABLE_EMAIL_DOMAIN_PENALTY;
    } else if (GENERIC_DOMAINS.includes(domain)) {
      score += GENERIC_EMAIL_DOMAIN_PENALTY;
    }
  }

  const docWeight = DOCUMENT_TYPE_WEIGHTS[documentType];
  if (docWeight != null) {
    score += docWeight;
  } else {
    score += Math.max(...Object.values(DOCUMENT_TYPE_WEIGHTS));
  }

  return Math.round(Math.min(Math.max(score, 0), 1) * 1000) / 1000;
}

module.exports = calculateRiskScore;
