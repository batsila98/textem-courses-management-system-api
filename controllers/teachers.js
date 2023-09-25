const Course = require('../models/Course');
const Language = require('../models/Language');
const Teacher = require('../models/Teacher');

const addTeacher = async (req, res) => {
    const teacher = new Teacher(req.body);

    try {
        const teacherSaved = await teacher.save();
        res.json(teacherSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const teacherRemoved = await Teacher.deleteOne({ _id: req.params.id });
        res.json(teacherRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editTeacher = async (req, res) => {
    try {
        const teacherUpdated = await Teacher.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(teacherUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate({ path: 'author', select: 'full_name' })
            .populate({
                path: 'courses',
                populate: {
                    path: 'status',
                },
            })
            .populate({
                path: 'courses',
                populate: {
                    path: 'teaching_format',
                },
            })
            .populate({
                path: 'courses',
                populate: {
                    path: 'type',
                },
            })
            .populate({ path: 'languages.language', select: 'name' });

        res.json(teacher);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTeachers = async (req, res) => {
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
        query.author = { $regex: req.query.author };
    }

    if (req.query.course) {
        query.courses = req.query.course;
    }

    if (req.query.email) {
        query.email = { $regex: req.query.email };
    }

    if (req.query.full_name) {
        query.full_name = { $regex: req.query.full_name };
    }

    if (req.query.language) {
        query.languages = {
            $elemMatch: {
                language: {
                    $in: req.query.language
                }
            }
        };
    }

    // pagination indexes
    if (endIndex < await Teacher.countDocuments(query).exec()) {
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
        results.results = await Teacher.find(query)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'courses', select: 'name' })
            .populate({ path: 'languages.language', select: 'name' })
            .sort({ date_creation: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTopTeachers = async (req, res) => {
    const limit = parseInt(req.query.limit || 7);

    try {
        const results = await Teacher.find()
            .sort({ 'courses': -1 })
            .limit(limit)
            .exec();

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTotal = async (req, res) => {
    try {
        const teachersCount = await Teacher.countDocuments();
        res.json(teachersCount);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addTeacher,
    deleteTeacher,
    editTeacher,
    getTeacher,
    getTeachers,
    getTopTeachers,
    getTotal,
};