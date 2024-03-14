const express = require('express')
const router = express.Router()

const Stores = require('../controllers/Stores')

router.post('/addstore', Stores.CreateStore)

module.exports = router