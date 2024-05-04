const mongoose = require('mongoose')

const RatingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    ratings: {
        productRating: {
            type: String,
            required: true
        },
        serviceRating: {
            type: String,
            required: true
        },
        comment: {
            type: String
        }
    }
}, { timestamps: true })

const RatingsModel = mongoose.model('Ratings', RatingsSchema)
module.exports = RatingsModel