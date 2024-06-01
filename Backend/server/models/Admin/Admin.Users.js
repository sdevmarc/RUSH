const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const AdminUserModel = mongoose.model('Employees', AdminUserSchema)
module.exports = AdminUserModel