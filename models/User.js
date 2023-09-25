const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    date_modification: {
        type: Date,
        default: Date.now
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
        type: String,
    },
    // image: {
    //     type: String,
    // },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);