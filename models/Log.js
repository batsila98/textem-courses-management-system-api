const mongoose = require('mongoose');

const ComponentSchema = mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    type: String,
});

const LogSchema = mongoose.Schema({
    component: {
        type: ComponentSchema,
        required: true,
    },
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    value_old: {
        type: String,
        required: true,
    },
    value_new: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Log', LogSchema);