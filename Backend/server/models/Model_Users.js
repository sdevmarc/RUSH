const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
}, { timestamps: true })

const UserModel = mongoose.model('usersModel', UserSchema)
module.exports = UserModel