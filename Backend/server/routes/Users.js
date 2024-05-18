const express = require('express')
const Users = require('../controllers/Users')
const router = express.Router()

router.get('/getuser/:userId', Users.FetchUser)
router.get('/getaddress/:userId', Users.fetchAddress)
router.get('/getactiveaddress/:userId', Users.fetchActiveAddrees)
router.post('/addaddress', Users.AddPersonalDetails, Users.AddAddress)
router.post('/activeaddress', Users.UpdateActiveAddress)
router.get('/searchuser/:searchId', Users.SearchUsers)
router.get('/getalluser', Users.GetAllUsers)
router.post('/updateprofilephoto', Users.UpdateProfiePhoto)
router.post('/updateaccountdetails', Users.UpdateAccountDetails)

module.exports = router