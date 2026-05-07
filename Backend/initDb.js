const pool = require("./db");

const schema = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policy (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    policy_date DATE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Casual', 'Sick', 'Annual')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, policy_date)
);

CREATE INDEX IF NOT EXISTS idx_policy_user_id ON policy(user_id);
CREATE INDEX IF NOT EXISTS idx_policy_user_date ON policy(user_id, policy_date);
`;

async function initDb() {
    try {
        await pool.query(schema);
        console.log("Neon database schema is ready");
    } catch (error) {
        console.error("Failed to initialize database schema:", error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

initDb();
