const db = require("../database/connection");
const verifications = require("../database/schema");

const createVerifications = async ({ verification_id, status, score }) => {
  return await db
    .insert(verifications)
    .values({
      verification_id,
      status,
      risk_score: score,
    })
    .returning();
};

module.exports = { createVerifications };
