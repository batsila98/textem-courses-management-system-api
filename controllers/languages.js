const Language = require('../models/Language');

const addLanguage = async (req, res) => {
    const language = new Language(req.body);

    try {
        const languageSaved = await language.save();
        const languages = await Language.find();
        res.json(languages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const languageRemoved = await Language.deleteOne({ _id: req.params.id });
        const languages = await Language.find();
        res.json(languages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const editLanguage = async (req, res) => {
    try {
        const languageUpdated = await Language.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    date_modification: Date.now(),
                }
            },
        );

        res.json(languageUpdated);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getLanguage = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        res.json(language);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getLanguages = async (req, res) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }

    try {
        const languages = await Language.find(query).sort({ name: 1 });
        res.json(languages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addLanguage,
    deleteLanguage,
    editLanguage,
    getLanguage,
    getLanguages,
};