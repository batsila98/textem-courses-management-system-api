const Certificate = require('../models/Certificate');
const Student = require('../models/Student');
const Course = require('../models/Course');

const addStudent = async (req, res) => {
    const student = new Student(req.body);

    try {
        const studentSaved = await student.save();
        res.json(studentSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const addCourse = async (req, res) => {
    const course = req.body.course;

    try {
        const courseExists = await Course.findById(course);
        if (!courseExists) {
            throw new Error('Course was not found!');
        }

        const studentUpdated = await Student.updateOne(
            { _id: req.params.id },
            {
                $addToSet: {
                    courses: { ...req.body },
                },
            },
        );

        res.json(studentUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const studentRemoved = await Student.deleteOne({ _id: req.params.id });
        res.json(studentRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editStudent = async (req, res) => {
    try {
        const studentUpdated = await Student.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(studentUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editCourse = async (req, res) => {
    try {
        const studentUpdated = await Student.updateOne(
            { _id: req.params.id, "courses.course": req.body.course },
            {
                $set: {
                    "courses.$.access": req.body.access,
                    "courses.$.comment": req.body.comment,
                    "courses.$.date_access_end": req.body.date_access_end,
                    "courses.$.status": req.body.status,
                },
            },
        );

        res.json(studentUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'courses.certificate', select: 'name' })
            .populate({
                path: 'courses.course',
                populate: {
                    path: 'type'
                },
                select: 'name type duration date_end',
            })
            .populate({ path: 'status', select: 'name color' })
            .populate({ path: 'gender', select: 'name' });

        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getStudents = async (req, res) => {
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

    if (req.query.author) {
        query.author = req.query.author;
    }

    if (req.query.course) {
        query.courses = { $elemMatch: { course: req.query.course } };
    }

    if (req.query.email) {
        query.email = { $regex: req.query.email };
    }

    if (req.query.gender) {
        query.gender = req.query.gender;
    }

    if (req.query.status) {
        query.status = req.query.status;
    }

    if (req.query.full_name) {
        query.full_name = { $regex: req.query.full_name };
    }

    // pagination indexes
    if (endIndex < await Student.countDocuments(query).exec()) {
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
        results.results = await Student.find(query)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'courses.certificate', select: 'name' })
            .populate({ path: 'courses.course', select: 'name type duration' })
            .populate({ path: 'status', select: 'name color' })
            .populate({ path: 'gender', select: 'name' })
            .sort({ date_creation: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getNumberOfStudentsByCertificates = async (req, res) => {
    let results = [];

    try {
        const certificates = await Certificate.find();
        for (const certificate of certificates) {
            results.push({
                certificate: certificate.name,
                quantity: await Student.countDocuments({ 'courses.certificate': certificate._id })
            })
        }
        results.push({
            certificate: 'Not enrolled',
            quantity: await Student.countDocuments({ courses: { $exists: true, $size: 0 } })
        })
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getNumberOfNewStudentsOverPeriod = async (req, res) => {
    let results = [];
    const today = new Date();

    try {
        for (var i = 6; i > 0; i -= 1) {
            const firstMonthDay = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const lastMonthDay = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
            const monthName = firstMonthDay.toLocaleString('en-US', { month: 'short' });
            const students = await Student.countDocuments({ date_creation: { $gte: firstMonthDay, $lte: lastMonthDay } });
            results.push({
                month: monthName,
                quantity: students
            });
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const getTotal = async (req, res) => {
    try {
        const studentsCount = await Student.countDocuments();
        res.json(studentsCount);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const addCertificate = async (req, res) => {
    const certificate = req.body.certificate;
    const courseID = req.body.courseID;

    try {
        const certificateExists = await Certificate.findById(certificate);
        if (!certificateExists) {
            throw new Error('Certificate was not found!');
        }

        const studentUpdated = await Student.updateOne(
            { _id: req.params.id, "courses.course": courseID },
            {
                $set: {
                    "courses.$.certificate": certificate,
                },
            },
        );

        res.json(studentUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addStudent,
    addCourse,
    deleteStudent,
    editStudent,
    editCourse,
    getStudent,
    getStudents,
    getNumberOfStudentsByCertificates,
    getNumberOfNewStudentsOverPeriod,
    getTotal,
    addCertificate,
};