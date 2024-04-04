const express = require('express')
const router = express.Router()

const Stores = require('../controllers/Stores')
const authenticateUser = require('../middleware/AuthHome')
const checkStoreIfExists = require('../middleware/checkStore')

router.post('/addstore', authenticateUser, checkStoreIfExists, Stores.UpdateSellerType, Stores.CreateStore)
router.get('/getstore', authenticateUser, Stores.GetStore)

module.exports = router