require('dotenv').config();
const createTable = require('./utils/tableGenerator');
const authRoutes = require('./routes/auth');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

createTable();

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});