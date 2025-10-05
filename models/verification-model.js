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

const getVerifications = async (limit = 100, offset = 0) => {
  return await db
    .select()
    .from(verifications)
    .orderBy(verifications.created_at, "desc")
    .limit(limit)
    .offset(offset);
};

module.exports = { createVerification, getVerifications };
