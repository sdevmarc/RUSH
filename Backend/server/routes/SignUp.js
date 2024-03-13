const express = require('express')
const router = express.Router()

const SignUp = require('../controllers/Users')

router.post('/signup', SignUp.CreateUser)

module.exports = router