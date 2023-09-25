const User = require('../models/User');

const deleteUser = async (req, res) => {
    try {
        const userRemoved = await User.deleteOne({ _id: req.params.id });
        res.json(userRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editUser = async (req, res) => {
    try {
        const userUpdated = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(userUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    deleteUser,
    editUser,
    getUser,
    getUsers,
};