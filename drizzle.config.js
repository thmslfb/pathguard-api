const { databaseUrl, migrationDir } = require("./config/config");

module.exports = {
  schema: "./database/schema.js",
  out: migrationDir,
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
    ssl: { rejectUnauthorized: false },
  },
};
