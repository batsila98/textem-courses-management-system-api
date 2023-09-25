const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Student',
        required: true,
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: true,
    },
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    date_modification: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true,
    },
    invoice_number: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'InvoiceType',
        required: true,
    },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);