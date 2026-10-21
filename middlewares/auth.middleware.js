const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const actualToken = token.split(' ')[1];
        const data = jwt.verify(actualToken, process.env.JWT_SECRET);

        const user = await User.findById(data.id).select('-password');

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = authMiddleware;