const express = require('express')
const router = express.Router()

const Messages = require('../controllers/Message')

router.post('/sendmessage', Messages.SendMessage)
router.get('/receivemessage/:messageId', Messages.ReceiveMessage)
router.get('/getallmessages/:userId', Messages.GetAllMessages)

module.exports = router