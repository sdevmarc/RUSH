const express = require('express')
const router = express.Router()

const Rate = require('../controllers/Rating')

router.post('/rateitem', Rate.AddRate)

module.exports = router