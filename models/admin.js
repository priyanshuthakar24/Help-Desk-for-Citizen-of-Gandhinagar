const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const adminschema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminschema);