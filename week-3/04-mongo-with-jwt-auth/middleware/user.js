const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        if(decodedValue.username) {
            next();
        }
        else {
            return res.status(403).send({msg: 'Invalid Token'});
        }
    }
    catch(error) {
        console.log(`Error in middleware : ${error}`);
        return res.status(500).json({message: "Server error"});
    }
}

module.exports = userMiddleware;