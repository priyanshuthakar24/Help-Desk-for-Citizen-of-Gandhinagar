const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentschema = new Schema({
    building: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    profilimage: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    locations: [{
        address: {
            type: String,
            required: true
        },
        personname: {
            type: String,
            required: true
        },
        opentime: {
            type: String,
            required: true
        },
        closetime: {
            type: String,
            required: true
        },

        mobilenolocation: {
            type: Number,
            required: true
        }

    }],
    query: [{
        id: {
            type: Number,
            default: 0

        },
        question: {
            type: String,
            required: true
        },
        solution: {
            type: String,
            required: true
        },
        attachment: [{
            attachmentname: {
                type: String,
            },
            attachmentlink: {
                type: String,
            }
        }]
    }]
}, { timestamps: true, })

module.exports = mongoose.model('Department', departmentschema);