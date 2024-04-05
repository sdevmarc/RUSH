const express = require('express')
const router = express.Router()

const Products = require('../controllers/Products')

router.post('/addproduct', Products.AddProduct)

module.exports = router