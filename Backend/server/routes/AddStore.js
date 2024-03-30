const express = require('express')
const router = express.Router()

const Stores = require('../controllers/Stores')

router.post('/addstore', Stores.CreateStore)
router.get('/getstore', Stores.GetStore)

module.exports = router