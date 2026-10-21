const jwt = require('jsonwebtoken');
<<<<<<< HEAD
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
=======

function authMiddleware(req, res, next) {
	const authorization = req.headers.authorization;
	const [scheme, token] = authorization ? authorization.split(' ') : [];

	if (scheme !== 'Bearer' || !token) {
		return res.status(401).json({ message: 'Authentication token required' });
	}

	if (!process.env.JWT_SECRET) {
		return next(new Error('JWT_SECRET is not configured'));
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET);
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired authentication token' });
	}
}

module.exports = authMiddleware;
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
