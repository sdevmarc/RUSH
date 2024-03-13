const express = require('express')
const router = express.Router()

const SignUp = require('../controllers/Users')
const Login = require('../middleware/Login')

router.post('/signup', SignUp.CreateUser)

module.exports = router