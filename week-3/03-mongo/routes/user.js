const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }

    const users = await User.find({username: username});
    if(users.length > 0){
        return res.status(409).json({message: "User already exists."});
    }

    const user = new User({username: username, password: password});
    user.save().then(() => {
        return res.status(201).json({ message: "User created successfully" });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    });
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((courses) => {
        return res.status(200).json({courses: courses});
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    const courses = await Course.find({_id: courseId});
    if (courses.length > 0) {
        const user = (await User.find({username: username}))[0];
        const purchasedCourses = user.purchasedCourses.filter((course) => {
            return (course._id).toString() === (courseId)});
        if(purchasedCourses.length > 0) {
            return res.status(409).json({message: `You have already bought this course.`});
        }
        else {
            try {
                await User.updateOne({username: username}, {
                    "$push": {
                        purchasedCourses: courseId
                    }
                });
                return res.status(201).json({ message: 'Course purchased successfully' });
            }
            catch(error) {
                console.log('Error in purchasing the course', error);
                return res.status(500).json({ message: "Couldn't buy this course" + error });
            }
        }
    }
    else {
        return res.status(404).json({message: 'No such course found.'});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({username: req.headers.username});
        const purchasedCourses = user.purchasedCourses;
        let result = [];

        for(const course of purchasedCourses) {
            const purchasedCourse = await Course.findById(course, {_id: 1, title: 1, description: 1, price: 1, imageLink: 1});
            result.push(purchasedCourse);
        }

        return res.status(200).send({purchasedCourses: result});
    }
    catch (error) {
        console.log("Error getting purchased courses", error);
        return res.status(500).json({message: 'Internal Server Error' + error});
    }
});

module.exports = router