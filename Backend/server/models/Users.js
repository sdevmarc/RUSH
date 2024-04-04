const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactno: {
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
    UserType: {
        type: String
    }
}, { timestamps: true })

const UserModel = mongoose.model('Users', UserSchema)
module.exports = UserModel