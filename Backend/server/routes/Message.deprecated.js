const express = require('express')
const router = express.Router()

const Messages = require('../controllers/Message.deprecated')

router.post('/sendmessage', Messages.SendMessage)
router.get('/receivemessage/:messageId/:userId/:storeUserId', Messages.ReceiveMessage)
router.get('/getallmessages/:userId', Messages.GetAllMessages)

module.exports = router