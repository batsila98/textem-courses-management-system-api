const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    date_end: {
        type: Date,
        required: true,
    },
    date_modification: {
        type: Date,
        default: Date.now,
    },
    date_start: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    edition_id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    parent_course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
    },
    price_basic: {
        type: Number,
        required: true,
    },
    related_courses: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Course',
        }],
    },
    status: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CourseStatus',
        required: true,
    },
    students: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Student',
        }],
    },
    teachers: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Teacher',
        }],
    },
    teaching_format: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CourseTeachingFormat',
        required: true,
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CourseType',
        required: true,
    },
});

module.exports = mongoose.model('Course', CourseSchema);