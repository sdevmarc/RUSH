const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    shopInformation:
    {
        shopImage: String,
        shopName: String,
        pickupAddress: {
            municipality: String,
            barangay: String
        },
        email: String,
        mobileNumber: String
    },
    businessInformation:
    {
        sellerType: String,
        registeredName: {
            lastname: String,
            firstname: String,
            middlename: String
        },
        registeredAddress: {
            city: String,
            province: String,
            municipality: String,
            barangay: String
        },
        taxIdentificationNumber: {
            taxNumber: String,
            certificateOfRegistration: String,
            businessName: String
        }
    },
    products: [
        {
            productName: String,
            productPhoto: String,
            productDescription: String,
            productPrice: String
        }
    ],
    termsAndConditions: Boolean
})

const StoresModel = mongoose.model('Stores', StoreSchema)
module.exports = StoresModel