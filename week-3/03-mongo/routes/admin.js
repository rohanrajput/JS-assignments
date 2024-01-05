const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

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

    const user = new Admin({ username: username, password: password});
    user.save().then(() => {
        return res.status(200).json({ message: 'Admin created successfully' });
    }).catch(() => {
        return res.status(400).json({ error: 'Account Already exists' });
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const course = {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        imageLink: req.body.imageLink,
        username: req.headers.username
    };
    
    const courses = await Course.find({title: course.title, username: course.username});
    if(courses.length > 0) {
        return res.status(409).json({msg: 'Course already exists'});
    }
    
    const allCourses = await Course.find();
    // if(allCourses.length === 0) {
    //     course._id = 1;
    // }
    // else {
    //     course._id = Math.max(...allCourses.map((item) => item._id)) + 1;
    // }

    new Course(course).save().then(() => {
        return res.status(201).json({ message: 'Course created successfully', courseId: course._id });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({username: req.headers.username});
        return res.status(200).json({courses});
    }
    catch {
        return res.status(500).json({ error: 'Error Fetching Courses' });
    }
});

module.exports = router;