const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_STRING";

module.exports = generateAccessToken = (email, role) => {
    const payload = {
        email,
        role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}