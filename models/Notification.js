const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    element: {
        type: String,
        required: true,
    },
    item: {
        type: {},
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['danger', 'info', 'success', 'warning'],
        default: 'info',
    },
    viewed: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { capped: { max: 1000 } });

module.exports = mongoose.model('Notification', NotificationSchema);