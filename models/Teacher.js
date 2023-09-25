const mongoose = require('mongoose');

const LanguagesSchema = mongoose.Schema({
    language: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Language',
        required: true,
    },
    skills: [{
        type: String,
        required: true,
    }],
});

const SocialNetworksSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const TeacherSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    date_creation: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    courses: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Course',
        }],
    },
    date_modification: {
        type: Date,
        default: Date.now,
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Gender',
    },
    languages: {
        type: [LanguagesSchema],
    },
    phones: {
        type: [{
            number: {
                type: String,
            }
        }],
    },
    social_networks: {
        type: [SocialNetworksSchema]
    },
});

module.exports = mongoose.model('Teacher', TeacherSchema);