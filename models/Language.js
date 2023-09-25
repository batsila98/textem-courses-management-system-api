const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Language', LanguageSchema);