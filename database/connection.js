const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
});

pool.on("connect", (client) => {
  client.on("error", (err) => {
    console.error("Unexpected error on idle client:", err);
  });
});

pool
  .connect()
  .then((client) => {
    console.log("DB connected");
    client.release();
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

const db = drizzle(pool, { migrationFolder: "./migrations" });

module.exports = db;
