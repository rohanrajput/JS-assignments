const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const {JWT_SCRET} = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    if(!username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const users = await Admin.find({username: username});

    if(users.length > 0) {
        return res.status(409).json({msg: "User alreay exists."});
    }

    try {
        const userId = await Admin.create({ username: username, password: password});
        return res.status(200).json({ message: 'Admin created successfully' });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    };
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).json({ error: "Missing required field" });
    }

    const user = await Admin.findOne({username: username});

    if(user) {
        if(password === user.password) {
            // console.log(config, config.JWT_SCRET);
            const token = jwt.sign({username: username}, JWT_SCRET);
            return res.status(200).send({token: token});
        }
        else {
            return res.status(401).json({ error: "Invalid Password" });
        }
    }
    else {
        return res.status(404).json({ error: "User not found" });
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const course = {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        imageLink: req.body.imageLink
    };
    
    const courseFound = await Course.findOne({title: course.title});
    if(courseFound) {
        return res.status(409).json({msg: 'Course already exists'});
    }

    try {
        const courseId = await Course.create({title: course.title, description: course.description, price: course.price, imageLink: course.imageLink});
        return res.status(201).json({ message: 'Course created successfully', courseId: courseId._id });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({}, {title: 1, description: 1, price: 1, imageLink: 1});
        return res.status(200).send({courses: courses});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;