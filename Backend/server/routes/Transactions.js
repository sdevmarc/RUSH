const express = require('express')
const Transaction = require('../controllers/Transactions')
const router = express.Router()

router.post('/createtransaction', Transaction.CreateTransaction)
router.get('/viewstatustransactions/:sellerId/:status', Transaction.ViewStatusTransactions)
router.get('/viewtransactions/:sellerId', Transaction.ViewTransactions)
router.post('/updatetransactionstatus', Transaction.UpdateStatusTransaction)
router.get('/viewselectedtransaction/:transactionId', Transaction.ViewSelectedTransaction)

module.exports = router