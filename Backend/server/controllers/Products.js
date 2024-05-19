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
            const { id, IsDelivery } = req.params

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

            if (data) {
                if (IsDelivery === 'true') {
                    res.json({ success: false, message: 'Product did fetched', data, shippingFee: data?.productInformation?.shippingFee })
                } else {
                    res.json({ success: false, message: 'Product did fetched', data, shippingFee: 0 })
                }


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
    },
    UpdateProductDetails: async (req, res) => {
        try {
            const { productId, productInformation } = req.body
            const { productName, productDescription, price, shippingFee } = productInformation
            console.log(productId, productInformation)

            const updateProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    "productInformation.productName": productName,
                    "productInformation.productDescription": productDescription,
                    "productInformation.price": price,
                    "productInformation.shippingFee": shippingFee,
                },
                {
                    new: true
                }
            )
            if (updateProduct) {
                res.json({ success: true, message: 'Product updated successfully!', updateProduct })
            } else {
                res.json({ success: false, message: 'Product failed to update!' })
            }


        } catch (error) {
            res.json({ success: false, message: `Error update a product controller: ${error}` })
        }
    },
    DeleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;

            const deleteProduct = await Product.findByIdAndDelete(productId);

            if (deleteProduct) {
                res.json({ success: true, message: 'Product deleted successfully!' });
            } else {
                res.json({ success: false, message: 'Product deletion failed!' });
            }
        } catch (error) {
            res.json({ success: false, message: `Error deleting product: ${error}`, error });
        }
    }
}

module.exports = ProductController