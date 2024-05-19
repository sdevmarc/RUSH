const express = require('express')
const router = express.Router()

const Reports = require('../controllers/Reports')

router.post('/addreport', Reports.AddReport)

module.exports = router