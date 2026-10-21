<<<<<<< HEAD
function checkRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
=======
const permissionMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Login required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
            });
        }

        next();
    };
<<<<<<< HEAD
}

module.exports = checkRole;
=======
};

module.exports = permissionMiddleware;
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
