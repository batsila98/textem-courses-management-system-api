const CourseType = require('../models/CourseType');

const addCourseType = async (req, res) => {
    const item = new CourseType(req.body);

    try {
        const itemSaved = await item.save();
        const items = await CourseType.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteCourseType = async (req, res) => {
    try {
        const itemRemoved = await CourseType.deleteOne({ _id: req.params.id });
        const items = await CourseType.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editCourseType = async (req, res) => {
    try {
        const itemUpdated = await CourseType.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(itemUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCourseType = async (req, res) => {
    try {
        const item = await CourseType.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCourseTypes = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const items = await CourseType.find(query).sort({ name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addCourseType,
    deleteCourseType,
    editCourseType,
    getCourseType,
    getCourseTypes,
};