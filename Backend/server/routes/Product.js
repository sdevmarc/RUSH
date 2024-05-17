const express = require('express')
const router = express.Router()

const Products = require('../controllers/Products')

router.post('/addproduct', Products.AddProduct)
router.get('/getproducts/:storeId', Products.FetchProducts)
router.get('/selectproduct/:id', Products.SelectedItem)
router.get('/searchproduct/:storeId/:searchId', Products.SearchProduct)

module.exports = router