const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    displayName: {
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
        type: String,
        required: true
    },
    personalDetails: {
        lastname: {
            type: String
        },
        firstname: {
            type: String
        },
        middlename: {
            type: String
        }
    },
    deliveryAddress: [
        {
            municipality: {
                type: String
            },
            barangay: {
                type: String
            },
            isActive: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const UserModel = mongoose.model('Users', UserSchema)
module.exports = UserModel