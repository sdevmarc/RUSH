const express = require('express')
const Transaction = require('../controllers/Transactions')
const router = express.Router()

router.post('/createtransaction', Transaction.CreateTransaction)

module.exports = router