const express = require('express')
const Users = require('../controllers/Users')
const router = express.Router()

router.get('/getuser/:userId', Users.FetchUser)
router.get('/getaddress/:userId', Users.fetchAddress)
router.get('/getactiveaddress/:userId', Users.fetchActiveAddrees)
router.post('/addaddress',Users.AddPersonalDetails, Users.AddAddress)
router.post('/activeaddress', Users.UpdateActiveAddress)

module.exports = router