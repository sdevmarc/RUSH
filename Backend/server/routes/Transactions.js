const express = require('express')
const Transaction = require('../controllers/Transactions')
const router = express.Router()

router.post('/createtransaction', Transaction.CreateTransaction)
router.get('/viewstatustransactions/:Id/:name/:status', Transaction.ViewStatusTransactions)
router.get('/viewtransactions/:Id/:name', Transaction.ViewTransactions)
router.post('/updatetransactionstatus', Transaction.UpdateStatusTransaction)
router.get('/viewselectedtransaction/:transactionId', Transaction.ViewSelectedTransaction)

module.exports = router