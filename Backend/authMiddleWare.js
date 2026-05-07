const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || process.env.jwt_secret || "default_secret";

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user_id = decoded.id; // attach user_id to request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = authMiddleware;
