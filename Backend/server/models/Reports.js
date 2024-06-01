const mongoose = require('mongoose')

const ReportsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    concern: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ReportsModel = mongoose.model('Reports', ReportsSchema)
module.exports = ReportsModel