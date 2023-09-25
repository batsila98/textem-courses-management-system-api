const mongoose = require('mongoose');

const PaymentPlanSchema = mongoose.Schema({
    date_deadline: {
        type: Date,
        required: true,
    },
    date_paid: {
        type: Date,
    },
    paid_amount: {
        type: Number,
        min: 0,
    },
    payment_number: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        min: 1,
        required: true,
    },
});

const PaymentSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
    },
    billing: {
        type: String,
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
    debt: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    discount_author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    mails: {
        type: [{
            date_dispatch: {
                type: Date,
                default: Date.now,
                required: true,
            }
        }],
    },
    payment_plan: {
        type: [PaymentPlanSchema],
    },
    sum: {
        type: Number,
        min: 1,
        required: true,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);