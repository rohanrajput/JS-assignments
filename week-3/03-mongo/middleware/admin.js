const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    if(!username || !password) {
        return res.status(401).json({ message: 'Missing authentication credentials' });
    }

    const users = await Admin.find({username: username});
    if (users.length === 0) {
        return res.status(404).json({message: "User not found"});
    }
    else {
        const user = users[0];
        if(user.password === password) {
            next();
        }
        else {
            return res.status(401).json({message: 'Invalid credentials'});
        }
    }
}

module.exports = adminMiddleware;