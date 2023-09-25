const mongoose = require('mongoose');

const CertificateSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Certificate', CertificateSchema);