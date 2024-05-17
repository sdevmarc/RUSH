const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    productInformation: {
        productName: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        },
        days: {
            type: String,
            required: true
        },
        isAvailable: {
            type: String,
            required: true
        },
        category: [
            { name: String }
        ],
        gallery: [
            { uri: String }
        ],
        sizes: [
            { size: String }
        ],
        shippingAvailability: [
            { shippingName: String }
        ],
        price: {
            type: String,
            required: true
        },
        shippingFee: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

const ProductModel = mongoose.model('Products', ProductSchema)
module.exports = ProductModel