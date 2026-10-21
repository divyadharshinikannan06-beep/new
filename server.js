require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});