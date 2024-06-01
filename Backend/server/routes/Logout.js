const express = require('express')
const router = express.Router()
const Logout = require('../controllers/Logout')

router.post('/logout', Logout)

module.exports = router