const Student = require('../models/Student');
const Course = require('../models/Course');
const Payment = require('../models/Payment');
const User = require('../models/User');

const addPayment = async (req, res) => {
    const payment = new Payment(req.body);

    try {
        const paymentSaved = await payment.save();
        res.json(paymentSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deletePayment = async (req, res) => {
    try {
        const paymentRemoved = await Payment.deleteOne({ _id: req.params.id });
        res.json(paymentRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editPayment = async (req, res) => {
    try {
        const paymentUpdated = await Payment.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(paymentUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'student', select: 'full_name' })
            .populate({ path: 'course', select: 'name' });
            
        res.json(payment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getPayments = async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 12);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {
        pagination: {},
        results: {},
    };

    // query
    let query = {};

    // student
    if (req.query.student) {
        query.student = req.query.student;
    }

    // course
    if (req.query.course) {
        query.course = req.query.course;
    }

    // sum
    query.sum = { $gte: 0 }
    if (req.query.sum_min) {
        query.sum.$gte = req.query.sum_min;
    }

    if (req.query.sum_max) {
        query.sum.$lte = req.query.sum_max;
    }

    // balance
    query.balance = { $gte: 0 }
    if (req.query.balance_min) {
        query.balance.$gte = req.query.balance_min;
    }

    if (req.query.balance_max) {
        query.balance.$lte = req.query.balance_max;
    }

    // debt
    query.debt = { $gte: 0 }
    if (req.query.debt_min) {
        query.debt.$gte = req.query.debt_min;
    }

    if (req.query.debt_max) {
        query.debt.$lte = req.query.debt_max;
    }

    // discount
    query.discount = { $gte: 0 }
    if (req.query.discount_min) {
        query.discount.$gte = req.query.discount_min;
    }

    if (req.query.discount_max) {
        query.discount.$lte = req.query.discount_max;
    }

    // pagination indexes
    if (endIndex < await Payment.countDocuments(query).exec()) {
        results.pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }

    try {
        results.results = await Payment.find(query)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'student', select: 'full_name' })
            .populate({ path: 'course', select: 'name' })
            .sort({ date_creation: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getTotal = async (req, res) => {
    try {
        const paymentsCount = await Payment.countDocuments();
        res.json(paymentsCount);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addPayment,
    deletePayment,
    editPayment,
    getPayment,
    getPayments,
    getTotal,
};