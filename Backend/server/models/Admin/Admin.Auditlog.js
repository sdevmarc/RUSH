const mongoose = require('mongoose')

const AuditlogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const AuditlogModel = mongoose.model('Notifications', AuditlogSchema)
module.exports = AuditlogModel