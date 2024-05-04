const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true
    },
    UserType: {
        type: String
    }
}, { timestamps: true })

const AdminUserModel = mongoose.model('Users', AdminUserSchema)
module.exports = AdminUserModel