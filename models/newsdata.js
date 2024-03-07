const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newsschema = new Schema({
    mobileno: {
        type: Number,
        required: true
    },
    eventname: {
        type: String,
        required: true
    },
    descrtption: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('NewsData', newsschema);