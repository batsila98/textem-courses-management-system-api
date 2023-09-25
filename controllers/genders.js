const Gender = require('../models/Gender');

const addGender = async (req, res) => {
    const item = new Gender(req.body);

    try {
        const itemSaved = await item.save();
        const items = await Gender.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteGender = async (req, res) => {
    try {
        const itemRemoved = await Gender.deleteOne({ _id: req.params.id });
        const items = await Gender.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editGender = async (req, res) => {
    try {
        const itemUpdated = await Gender.updateOne(
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

const getGender = async (req, res) => {
    try {
        const item = await Gender.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getGenders = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const items = await Gender.find(query).sort({ name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addGender,
    deleteGender,
    editGender,
    getGender,
    getGenders,
};