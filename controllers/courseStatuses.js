const CourseStatus = require('../models/CourseStatus');

const addStatus = async (req, res) => {
    const courseStatus = new CourseStatus(req.body);

    try {
        const courseStatusSaved = await courseStatus.save();
        const courseStatuses = await CourseStatus.find();
        res.json(courseStatuses);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteStatus = async (req, res) => {
    try {
        const courseStatusRemoved = await CourseStatus.deleteOne({ _id: req.params.id });
        const courseStatuses = await CourseStatus.find();
        res.json(courseStatuses);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editStatus = async (req, res) => {
    try {
        const courseStatusUpdated = await CourseStatus.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(courseStatusUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getStatus = async (req, res) => {
    try {
        const courseStatus = await CourseStatus.findById(req.params.id);
        res.json(courseStatus);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getStatuses = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const courseStatuses = await CourseStatus.find(query).sort({ name: 1 });
        res.json(courseStatuses);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addStatus,
    deleteStatus,
    editStatus,
    getStatus,
    getStatuses,
};