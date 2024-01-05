const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    if(!username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({username: username});

    if(user) {
        return res.status(409).json({msg: "User alreay exists."});
    }

    try {
        const userId = await User.create({ username: username, password: password});
        return res.status(200).json({ message: 'User created successfully' });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    };
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ error: "Missing required field" });
    }

    const user = await User.findOne({username: username, password: password});
    if(!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({username: username}, JWT_SECRET);
    return res.status(200).send({token: token});
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({}, {title: 1, description: 1, price: 1, imageLink: 1});
        return res.status(200).send({courses: courses});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const purchaseCourseId = req.params.courseId;
    const token = req.headers.authorization.split(" ")[1];
    const username = (jwt.decode(token, JWT_SECRET)).username;

    try {
        const courseIdFound = await Course.findOne({_id: purchaseCourseId});
        if(!courseIdFound) {
            return res.status(403).send({msg: 'No course found'});
        }

        await User.updateOne({username: username}, {
            $push: {
                purchasedCourses: courseIdFound._id
            }
        });
        return res.status(200).send({ message: 'Course purchased successfully' });
    }
    catch (error) {
        console.log('Error in finding the course');
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
    
    try {
        const purchasedCourses = await User.findOne({username: username}, {purchasedCourses: 1});
        const purchasedCoursesDetails = await Course.find({
            _id: {$in: purchasedCourses.purchasedCourses}
        }, {title: 1, description: 1, price: 1, imageLink: 1});
        return res.status(200).send({purchasedCourses: purchasedCoursesDetails});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router