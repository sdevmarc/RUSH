const Product = require('../models/Products')
const cloudinary = require('../utils/cloudinary')

const ProductController = {
    AddProduct: async (req, res) => {
        try {
            console.log('running123')
            const values = req.body
            const { storeId, productInformation: { productName, productDescription, days, gallery: [{ uri }], category: [{ name }], shippingAvailability: [{ shippingName }], price, shippingFee } } = req.body;

            console.log('running')
            const uplo = await cloudinary.v2.uploader.upload('file:///var/mobile/Containers/Data/Application/F7E39C65-B24B-41F2-8ABF-8B12282BE811/Library/Caches/ExponentExperienceData/@anonymous/reclient-97051959-20e4-4fed-bcf6-a677eb449baa/ImagePicker/7AF0FCF5-6F9A-4079-96C3-145A258152E7.png')
            console.log(uplo)
            // const result = await cloudinary.uploader.upload(uri, {
            //     use_filename: true
            // })

            // console.log(result)
            // const data = await Product.create({
            //     storeId,
            //     productInformation: {
            //         productName,
            //         productDescription,
            //         days,
            //         category: [{ name }],
            //         gallery: [{ uri: result.secure_url }],
            //         shippingAvailability: [{ shippingName }],
            //         price,
            //         shippingFee
            //     }
            // })
            // if (data) {
            //     console.log('uploaded')
            // } else {
            //     console.log('not uploaded')
            // }
            res.json({ success: true, message: 'Product successfully added' })
        } catch (error) {
            res.json({ success: false, message: `Error adding product controller: ${error}`, error: error })
        }
    }
}

module.exports = ProductController