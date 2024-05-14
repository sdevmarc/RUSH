const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    name: {
        type: Object,
        required: true
    },
    participants: [{
        user: {
            type: String,
            required: true
        }
    }],
    messages: [{
        authorId: {
            type: String,
            required: true
        },
        body: {
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })

const MassagesModel = mongoose.model('Messages', MessagesSchema)
module.exports = MassagesModel