const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

const addCertificate = async (req, res) => {
    const certificate = new Certificate(req.body);

    try {
        const certificateSaved = await certificate.save();
        const certificates = await Certificate.find({ course: req.body.course });
        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const certificateRemoved = await Certificate.deleteOne({ _id: req.params.id });
        const certificates = await Certificate.find();
        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editCertificate = async (req, res) => {
    try {
        const certificateUpdated = await Certificate.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                }
            },
        );

        res.json(certificateUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        res.json(certificate);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getCertificates = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const certificates = await Certificate.find(query);

        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addCertificate,
    deleteCertificate,
    editCertificate,
    getCertificate,
    getCertificates,
};