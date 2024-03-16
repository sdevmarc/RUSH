const express = require('express')
const router = express.Router()

const Login = require('../middleware/Login')
const AuthGoogle = require('../middleware/AuthGoogle')

router.post('/login', AuthGoogle, Login)

module.exports = router