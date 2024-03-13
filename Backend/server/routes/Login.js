const express = require('express')
const router = express.Router()

const Login = require('../middleware/Login')

router.post('/login', Login)

module.exports = router