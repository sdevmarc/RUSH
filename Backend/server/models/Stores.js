const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    storePhoto: {
        type: String
    },
    products: [
        {
            productName: String,
            productPhoto: String,
            productDescription: String,
            productPrice: String
        }
    ]
})

const StoresModel = mongoose.model('Stores', StoreSchema)
module.exports = StoresModel