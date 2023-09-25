const mongoose = require('mongoose');

const StudentCourseSchema = mongoose.Schema({
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        immutable: true,
    },
    access: {
        type: Boolean,
        default: true,
    },
    date_access_end: {
        type: Date,
    },
    date_enrollment: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    certificate: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Certificate',
    },
    comment: {
        type: String,
    },
    status: {
        type: String,
        default: 'enrolled',
    },
});

const StudentSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
    },
    courses: {
        type: [StudentCourseSchema],
    },
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    date_modification: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    gender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Gender',
    },
    status: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'StudentStatus',
        required: true,
    }
});

module.exports = mongoose.model('Student', StudentSchema);