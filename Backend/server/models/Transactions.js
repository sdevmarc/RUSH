const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    checkout: {
        shippingOption: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentDetails: {
            merchandiseSubTotal: {
                type: String,
                required: true
            },
            shippingSubTotal: {
                type: String,
                required: true
            },
            totalPayment: {
                type: String,
                required: true
            }
        },
        status: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

const TransactionModel = mongoose.model('Transactions', TransactionSchema)
module.exports = TransactionModel