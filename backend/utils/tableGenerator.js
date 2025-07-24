const pool = require('../db');

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(32) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                display_name VARCHAR(64),
                gender VARCHAR(10),
                birthday DATE
            );
        `);
        console.log('✅ Table "users" is ready');
    } catch (err) {
        console.error('❌ Error creating table:', err.message);
    }
};

module.exports = createTable;