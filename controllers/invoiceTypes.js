const InvoiceType = require('../models/InvoiceType');

const addInvoiceType = async (req, res) => {
    const item = new InvoiceType(req.body);

    try {
        const itemSaved = await item.save();
        const items = await InvoiceType.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteInvoiceType = async (req, res) => {
    try {
        const itemRemoved = await InvoiceType.deleteOne({ _id: req.params.id });
        const items = await InvoiceType.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editInvoiceType = async (req, res) => {
    try {
        const itemUpdated = await InvoiceType.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(itemUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getInvoiceType = async (req, res) => {
    try {
        const item = await InvoiceType.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getInvoiceTypes = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const items = await InvoiceType.find(query).sort({ name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addInvoiceType,
    deleteInvoiceType,
    editInvoiceType,
    getInvoiceType,
    getInvoiceTypes,
};