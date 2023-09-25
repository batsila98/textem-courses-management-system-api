const StudentStatus = require('../models/StudentStatus');

const addStatus = async (req, res) => {
    const studentStatus = new StudentStatus(req.body);

    try {
        const studentStatusSaved = await studentStatus.save();
        const studentStatuses = await StudentStatus.find();
        res.json(studentStatuses);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteStatus = async (req, res) => {
    try {
        const studentStatusRemoved = await StudentStatus.deleteOne({ _id: req.params.id });
        const studentStatuses = await StudentStatus.find();
        res.json(studentStatuses);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editStatus = async (req, res) => {
    try {
        const studentStatusUpdated = await StudentStatus.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(studentStatusUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getStatus = async (req, res) => {
    try {
        const studentStatus = await StudentStatus.findById(req.params.id);
        res.json(studentStatus);
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
        const studentStatuses = await StudentStatus.find(query).sort({ name: 1 });
        res.json(studentStatuses);
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