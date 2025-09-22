const { pgTable, varchar, numeric, timestamp } = require("drizzle-orm/pg-core");

const verifications = pgTable("verifications", {
  verification_id: varchar("verification_id", { length: 50 }).primaryKey(),
  status: varchar("status", { length: 20 }).notNull(),
  risk_score: numeric("risk_score", { precision: 5, scale: 3 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

module.exports = verifications;
