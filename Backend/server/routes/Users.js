const express = require('express')
const Users = require('../controllers/Users')
const router = express.Router()

router.get('/getuser/:userId', Users.FetchUser)

module.exports = router