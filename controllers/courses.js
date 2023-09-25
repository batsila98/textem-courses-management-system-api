const Student = require('../models/Student');
const Course = require('../models/Course');
const Payment = require('../models/Payment');
const Teacher = require('../models/Teacher');

const addCourse = async (req, res) => {
    const course = new Course(req.body);

    try {
        const courseSaved = await course.save();
        res.json(courseSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const assignTeacher = async (req, res) => {
    const courseID = req.params.id;
    const teacherID = req.body.teacherID;

    try {
        const courseExists = await Course.findById(courseID);
        const teacherExists = await Teacher.findById(teacherID);
        if (!teacherExists || !courseExists) {
            throw new Error('Teacher or course was not found!');
        }

        const courseUpdated = await Course.updateOne(
            { _id: courseID },
            {
                $addToSet: {
                    teachers: teacherID,
                },
            },
        );
        const teacherUpdated = await Teacher.updateOne(
            { _id: teacherID },
            {
                $addToSet: {
                    courses: courseID,
                },
            },
        );

        res.json(courseUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseRemoved = await Course.deleteOne({ _id: req.params.id });
        res.json(courseRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editCourse = async (req, res) => {
    try {
        const courseUpdated = await Course.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(courseUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const enrollStudent = async (req, res) => {
    const studentID = req.body.studentID;
    const courseID = req.params.id;

    try {
        const studentExists = await Student.findById(studentID);
        const courseExists = await Course.findById(courseID);
        if (!studentExists || !courseExists) {
            throw new Error('Student or course was not found!');
        }

        const courseUpdated = await Course.updateOne(
            { _id: courseID },
            {
                $addToSet: {
                    students: studentID,
                },
            },
        );

        const studentUpdated = await Student.updateOne(
            { _id: studentID },
            {
                $addToSet: {
                    courses: { ...req.body.studentCourse },
                },
            },
        );

        const payment = new Payment(req.body.studentPayment);
        const paymentSaved = await payment.save();

        res.json(courseUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'parent_course', select: 'name' })
            .populate({ path: 'related_courses', select: 'name' })
            .populate({ path: 'status', select: 'name color' })
            .populate({ path: 'students', select: 'full_name courses.course courses.certificate' })
            .populate({ path: 'teachers', select: 'full_name' })
            .populate({ path: 'teaching_format', select: 'name' })
            .populate({ path: 'type', select: 'name' });

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCourses = async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 12);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {
        pagination: {},
        results: {},
    };

    // query
    let query = {};

    // author
    if (req.query.author) {
        query.author = req.query.author;
    }

    // student
    if (req.query.student) {
        query.students = req.query.student;
    }

    // code
    if (req.query.code) {
        query.code = req.query.code;
    }

    // name
    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    // price_basic
    query.price_basic = { $gte: 0 };
    if (req.query.price_min) {
        query.price_basic.$gte = req.query.price_min;
    }

    if (req.query.price_max) {
        query.price_basic.$lte = req.query.price_max;
    }

    // duration
    query.duration = { $gte: 0 }
    if (req.query.duration_min) {
        query.duration.$gte = req.query.duration_min;
    }

    if (req.query.duration_max) {
        query.duration.$lte = req.query.duration_max;
    }

    // status
    if (req.query.status) {
        query.status = req.query.status;
    }

    // teacher
    if (req.query.teacher) {
        query.teachers = req.query.teacher;
    }

    // teaching_format
    if (req.query.teaching_format) {
        query.teaching_format = req.query.teaching_format;
    }

    // type
    if (req.query.type) {
        query.type = req.query.type;
    }

    // pagination indexes
    if (endIndex < await Course.countDocuments(query).exec()) {
        results.pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }

    try {
        results.results = await Course.find(query)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'parent_course', select: 'name' })
            .populate({ path: 'related_courses', select: 'name' })
            .populate({ path: 'status', select: 'name color' })
            .populate({ path: 'students', select: 'full_name' })
            .populate({ path: 'teachers', select: 'full_name' })
            .populate({ path: 'teaching_format', select: 'name' })
            .populate({ path: 'type', select: 'name' })
            .sort({ date_creation: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTotal = async (req, res) => {
    try {
        const coursesCount = await Course.countDocuments();
        res.json(coursesCount);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const removeStudent = async (req, res) => {
    const courseID = req.params.id;
    const studentID = req.body.studentID;

    try {
        const courseUpdated = await Course.updateOne(
            { _id: courseID },
            {
                $pull: {
                    students: studentID,
                },
            },
        );
        const studentUpdated = await Student.updateOne(
            { _id: studentID },
            {
                $pull: {
                    courses: {
                        course: courseID,
                    },
                },
            },
        );

        res.json(courseUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const removeTeacher = async (req, res) => {
    const courseID = req.params.id;
    const teacherID = req.body.teacherID;

    try {
        const teacherUpdated = await Teacher.updateOne(
            { _id: teacherID },
            {
                $pull: {
                    courses: courseID,
                },
            },
        );
        const courseUpdated = await Course.updateOne(
            { _id: courseID },
            {
                $pull: {
                    teachers: teacherID,
                },
            },
        );

        res.json(courseUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addCourse,
    assignTeacher,
    deleteCourse,
    editCourse,
    enrollStudent,
    getCourse,
    getCourses,
    getTotal,
    removeStudent,
    removeTeacher,
};