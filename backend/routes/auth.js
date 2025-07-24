const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await pool.query(
            'SELECT id, username, display_name, password_hash FROM users WHERE email = $1',
            [email]
        );
        const fetchedUser = rows[0];

        if (!fetchedUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // bcrypt.compare guards against timing attacks and verifies hash + salt
        const isMatch = await bcrypt.compare(password, fetchedUser.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: fetchedUser.id,
            username: fetchedUser.username,
            display_name: fetchedUser.display_name,
        };

        // Return a JWT so the client can store it in localStorage
        // This lets the user stay logged in without re-entering credentials on each request
        const authToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

        res.json({ token: authToken });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    let {
        username,
        email,
        password,
        display_name,
        birth_day,
        birth_month,
        birth_year,
        gender
    } = req.body;

    username = username?.toLowerCase();
    email = email?.toLowerCase();

    if (!username || !email || !password || !display_name || !birth_day || !birth_month || !birth_year || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const conflictCheck = await pool.query(
            'SELECT username, email FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );

        if (conflictCheck.rows.length) {
            const existing = conflictCheck.rows[0];
            if (existing.email === email) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            if (existing.username === username) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const birthday = `${birth_year}-${birth_month.padStart(2, '0')}-${birth_day.padStart(2, '0')}`;

        const insertQuery = `
            INSERT INTO users (username, email, password_hash, display_name, gender, birthday)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, display_name
        `;
        const insertValues = [username, email, passwordHash, display_name, gender, birthday];

        const { rows } = await pool.query(insertQuery, insertValues);
        const newUser = rows[0];

        const tokenPayload = {
            id: newUser.id,
            username: newUser.username,
            display_name: newUser.display_name
        };
        
        // Issue a JWT immediately so the user doesn't have to log in again after registering
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

module.exports = router;
