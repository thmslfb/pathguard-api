const db = require("../database/connection");
const verifications = require("../database/schema");

const createVerification = async ({ verification_id, status, score }) => {
  return await db
    .insert(verifications)
    .values({
      verification_id,
      status,
      risk_score: score,
    })
    .returning();
};

module.exports = createVerification;
