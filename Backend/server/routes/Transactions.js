const express = require('express')
const Transaction = require('../controllers/Transactions')
const router = express.Router()

router.post('/createtransaction', Transaction.CreateTransaction)
router.get('/viewtransactions', Transaction.ViewTransactions)
router.post('/updatestatustocancelled/:transactionId', Transaction.UpdateStatusTransaction)

module.exports = router