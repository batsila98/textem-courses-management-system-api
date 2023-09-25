const Invoice = require('../models/Invoice');

const addInvoice = async (req, res) => {
    const invoice = new Invoice(req.body);

    try {
        const invoiceSaved = await invoice.save();
        res.json(invoiceSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const invoiceRemoved = await Invoice.deleteOne({ _id: req.params.id });
        res.json(invoiceRemoved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editInvoice = async (req, res) => {
    try {
        const invoiceUpdated = await Invoice.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(invoiceUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'student', select: 'full_name' })
            .populate({ path: 'course', select: 'name' })
            .populate({ path: 'type', select: 'name' });

        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getInvoices = async (req, res) => {
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

    // author
    if (req.query.author) {
        query.author = req.query.author;
    }

    // student
    if (req.query.student) {
        query.student = req.query.student;
    }

    // course
    if (req.query.course) {
        query.course = req.query.course;
    }

    // invoice_number
    if (req.query.invoice_number) {
        query.invoice_number = { $regex: req.query.invoice_number };
    }

    // sum
    query.sum = { $gte: 0 }
    if (req.query.sum_min) {
        query.sum.$gte = req.query.sum_min;
    }

    if (req.query.sum_max) {
        query.sum.$lte = req.query.sum_max;
    }

    // type
    if (req.query.type) {
        query.type = req.query.type;
    }

    // pagination indexes
    if (endIndex < await Invoice.countDocuments(query).exec()) {
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
        results.results = await Invoice.find(query)
            .populate({ path: 'author', select: 'full_name' })
            .populate({ path: 'student', select: 'full_name' })
            .populate({ path: 'course', select: 'name' })
            .populate({ path: 'type', select: 'name' })
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
        const invoicesCount = await Invoice.countDocuments();
        res.json(invoicesCount);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addInvoice,
    deleteInvoice,
    editInvoice,
    getInvoice,
    getInvoices,
    getTotal,
};