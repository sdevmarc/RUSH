const express = require('express')
const router = express.Router()

const Messages = require('../controllers/Message')

router.post('/sendmessage', Messages.SendMessage)
router.get('/receivemessage/:user1/:user2', Messages.ReceiveMessage)
router.get('/getallmessages/:user1/', Messages.GetAllMessages)

module.exports = router