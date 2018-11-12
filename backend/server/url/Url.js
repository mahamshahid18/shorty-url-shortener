'use strict';

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    long_url: { type: String, required: true },
    short_url: { type: String, required: true },
    created_at: { type: String, required: true },
    expired: { type: Boolean, default: false},
    expiry: String,
    last_accessed: String
});

module.exports = mongoose.model('Url', urlSchema);
