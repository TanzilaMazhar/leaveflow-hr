const { Pool } = require("pg");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for the Neon PostgreSQL connection");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
});

pool.connect()
    .then((client) => {
        client.release();
        console.log("Connected to Neon PostgreSQL");
    })
    .catch(err => console.error("Connection error", err));

module.exports = pool;
