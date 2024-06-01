const express = require('express')
const router = express.Router()

const CheckUsername = require('../middleware/Signup')
const hashPassword = require('../middleware/hashPassword')

const SignUp = require('../controllers/Users')

router.post('/signup', CheckUsername, hashPassword, SignUp.CreateUser)

module.exports = router