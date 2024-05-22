const express = require('express')
const router = express.Router()

const Products = require('../controllers/Products')

router.post('/addproduct', Products.AddProduct)
router.get('/getproducts/:storeId', Products.FetchProducts)
router.get('/getallproducts', Products.GetAll)
router.get('/selectproduct/:id/:IsDelivery', Products.SelectedItem)
router.get('/searchproduct/:storeId/:searchId', Products.SearchProduct)
router.get('/searchadminproduct/:searchId', Products.SearchAdminProduct)
router.post('/updateproductdetails', Products.UpdateProductDetails)
router.get('/deleteproduct/:productId', Products.DeleteProduct)

module.exports = router