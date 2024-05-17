const Product = require('../models/Products')
const Transactions = require('../models/Transactions')

const ProductController = {
    AddProduct: async (req, res) => {
        try {
            const values = req.body

            const data = await Product.create(values)

            if (data) {
                res.json({ success: true, message: 'Product successfully added' })
            } else {
                res.json({ success: false, message: 'Product successfully not added' })
            }
        } catch (error) {
            res.json({ success: false, message: `Error adding product controller: ${error}`, error: error })
        }
    },
    FetchProducts: async (req, res) => {
        try {
            const { storeId } = req.params

            const data = await Product.find({ storeId: storeId })
            if (data) {
                res.json({ success: true, message: 'Product successfully fetched', data })
            } else {
                res.json({ success: false, message: 'Product successfully not fetched' })
            }
        } catch (error) {
            res.json({ success: false, message: `Error fetching product controller: ${error}`, error: error })
        }
    },
    SelectedItem: async (req, res) => {
        try {
            const { id } = req.params
            const data = await Product.findById({ _id: id })

            const findTransaction = await Transactions.findOne({ productId: id })
            const Availability = findTransaction?.checkout?.status
            if (Availability === 'UNRETURNED') {
                await Product.findByIdAndUpdate(
                    id,
                    {
                        "productInformation.isAvailable": "Not Available"
                    },
                    {
                        new: true
                    }
                )
            }

            if (Availability === 'RATING') {
                await Product.findByIdAndUpdate(
                    id,
                    {
                        "productInformation.isAvailable": "Available"
                    },
                    {
                        new: true
                    }
                )
            }

            if (res) {
                res.json({ success: false, message: 'Product did fetched', data })
            } else {
                res.json({ success: false, message: 'Product did not fetched' })
            }

        } catch (error) {
            res.json({ success: false, message: `Error fetching the selected product controller: ${error}`, error: error })
        }
    },
    SearchProduct: async (req, res) => {
        try {
            const { storeId, searchId } = req.params

            const checkProducts = await Product.find({
                storeId: storeId,
                "productInformation.productName": { $regex: new RegExp(searchId, 'i') }
            })

            res.json({ success: true, message: 'Search product successfully!', data: checkProducts })
        } catch (error) {
            res.json({ success: false, message: `Error searching a product controller: ${error}` })
        }
    }
}

module.exports = ProductController