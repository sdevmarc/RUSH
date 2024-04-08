const Product = require('../models/Products')

const ProductController = {
    AddProduct: async (req, res) => {
        try {
            const values = req.body

            const data = await Product.create(values)
            if(data) {
                console.log('Values added successfull')
                res.json({ success: true, message: 'Product successfully added' })
            } else {
                console.log('Values added not successfull')
                res.json({ success: false, message: 'Product successfully not added' })
            }
            // res.json({ success: true, message: 'Product successfully added' })
            
        } catch (error) {
            res.json({ success: false, message: `Error adding product controller: ${error}`, error: error })
        }
    }
}

module.exports = ProductController