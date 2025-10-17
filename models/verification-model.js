const { eq } = require("drizzle-orm");
const db = require("../database/connection");
const { verifications } = require("../database/schema");

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

const getVerificationsFromDB = async (limit = 100, offset = 0) => {
  return await db
    .select()
    .from(verifications)
    .orderBy(verifications.created_at, "desc")
    .limit(limit)
    .offset(offset);
};

const getVerificationByIdFromDB = async (verification_id) => {
  const result = await db
    .select()
    .from(verifications)
    .where(eq(verifications.verification_id, verification_id));

  return result[0] || null;
};

module.exports = {
  createVerification,
  getVerificationsFromDB,
  getVerificationByIdFromDB,
};
