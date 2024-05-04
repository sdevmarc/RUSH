const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const NotificationModel = mongoose.model('Notifications', NotificationSchema)
module.exports = NotificationModel