const Notification = require('../models/Notification');

const editNotification = async (req, res) => {
    try {
        const notificationUpdated = await Notification.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                }
            },
        );

        res.json(notificationUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getNotifications = async (req, res) => {
    const limit = parseInt(req.query.limit || 100);
    const query = {}

    if (req.query.viewed) {
        query.viewed = req.query.viewed
    }

    try {
        const notifications = await Notification.find(query)
            .sort({ date_creation: -1 }).limit(limit);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTotalUnread = async (req, res) => {
    try {
        const notifications = await Notification.countDocuments({ viewed: false });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    editNotification,
    getNotification,
    getNotifications,
    getTotalUnread,
};