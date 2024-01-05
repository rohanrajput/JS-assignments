const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(403).json({ error: "No token provided." });
    }
    else {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            next();
        }
        catch(error) {
            return res.status(401).json({ error: 'Invalid token.' + error});
        }
    }
}

module.exports = adminMiddleware;