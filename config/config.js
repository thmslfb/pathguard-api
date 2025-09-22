const databaseUrl = process.env.DATABASE_URL;
const migrationDir = process.env.MIGRATION_DIR || "./migrations";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

if (!databaseUrl.startsWith("postgresql://")) {
  throw new Error("DATABASE_URL must start with 'postgresql://'");
}

module.exports = {
  databaseUrl,
  migrationDir,
};
