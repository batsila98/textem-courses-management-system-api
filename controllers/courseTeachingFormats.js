const CourseTeachingFormat = require('../models/CourseTeachingFormat');

const addTeachingFormat = async (req, res) => {
    const item = new CourseTeachingFormat(req.body);

    try {
        const itemSaved = await item.save();
        const items = await CourseTeachingFormat.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteTeachingFormat = async (req, res) => {
    try {
        const itemRemoved = await CourseTeachingFormat.deleteOne({ _id: req.params.id });
        const items = await CourseTeachingFormat.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editTeachingFormat = async (req, res) => {
    try {
        const itemUpdated = await CourseTeachingFormat.updateOne(
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

const getTeachingFormat = async (req, res) => {
    try {
        const item = await CourseTeachingFormat.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTeachingFormats = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const items = await CourseTeachingFormat.find(query).sort({ name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addTeachingFormat,
    deleteTeachingFormat,
    editTeachingFormat,
    getTeachingFormat,
    getTeachingFormats,
};