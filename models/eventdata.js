const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventschema = new Schema({
    catagory: {
        type: String,
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
})
module.exports = mongoose.model('Announcment', eventschema);