const Product = require('../models/Products')

const ProductController = {
    AddProduct: async (req, res) => {
        try {
            const values = req.body
            await Product.create(values)
            res.json({ success: true, message: 'Product successfully added' })
        } catch (error) {
            res.json({ success: false, message: `Error adding product controller: ${error}` })
        }
    }
}

module.exports = ProductController