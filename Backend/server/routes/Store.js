const express = require('express')
const router = express.Router()

const Stores = require('../controllers/Stores')
const authenticateUser = require('../middleware/AuthHome')

router.post('/addstore', authenticateUser, Stores.CreateStore)
router.get('/getstore', authenticateUser, Stores.GetStore)

module.exports = router