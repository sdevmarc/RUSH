const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    shopName: {
        type: String, // Changed to String for clarity
        required: true
    },
    shopUserId: {
        type: String,
        required: true
    },
    participants: [{
        type: String,
        required: true
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
}, { timestamps: true });

const MessagesModel = mongoose.model('Messages', MessagesSchema);
module.exports = MessagesModel;
