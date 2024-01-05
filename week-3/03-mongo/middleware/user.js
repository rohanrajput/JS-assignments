const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    console.log(password);

    if(!username || !password) {
        return res.status(401).json({ message: 'Missing authentication credentials' });
    }

    const users = await User.find({username: username});
    if(users.length === 0) {
        return res.status(404).json({message: "User not found"});
    }
    else {
        const user = users[0];
        if(user.password === password) {
            next();
        }
        else {
            return res.status(401).json({msg: "Incorrect password"});
        }
    }
}

module.exports = userMiddleware;