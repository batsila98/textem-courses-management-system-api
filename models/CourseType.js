const mongoose = require('mongoose');

const CourseTypeSchema = mongoose.Schema({
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    date_modification: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('CourseType', CourseTypeSchema);