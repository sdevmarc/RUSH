const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    members: {
        user1: {
            type: String,
            required: true
        },
        user2: {
            type: String,
            required: true
        }
    },
    name: {
        type: String
    },
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