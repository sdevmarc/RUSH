const Messages = require('../models/Messages')
const Stores = require('../models/Stores')

const MessageController = {
    SendMessage: async (req, res) => {
        try {
            const { values, storeUserId } = req.body
            console.log('User Exitsasdasd:', values)

            const UserExists = await Messages.findById(values.messageId)
            const { shopInformation } = await Stores.findOne({ userId: storeUserId })
            let data;
           
            if (UserExists) {
                data = await Messages.findByIdAndUpdate(
                    values.messageId,
                    {
                        name: shopInformation,
                        $push: {
                            messages: { authorId: values.userId, body: values.body }
                        }
                    },
                    {
                        new: true
                    }
                )

                if (!UserExists.participants.some(participant => participant.user.toString() === values.userId)) {
                    data = await Messages.findByIdAndUpdate(
                        values.messageId,
                        {
                            $push: {
                                participants: { user: values.userId }
                            }
                        },
                        {
                            new: true
                        }
                    )
                }

                res.json({ success: true, message: 'Message sent update successfully', data })
            } else {
                const data = await Messages.create({
                    name: shopInformation,
                    participants: [{ user: values.userId }],
                    messages: [{ authorId: values.userId, body: values.body }]
                })
                res.json({ success: true, message: 'Message sent successfully', data })
            }

        } catch (error) {
            res.json({ success: false, message: `Error Sending Message controller: ${error}`, error: error })
        }
    },
    ReceiveMessage: async (req, res) => {
        try {
            const { messageId, userId, storeUserId } = req.params

            const { shopInformation } = await Stores.findOne({ userId: storeUserId })
            let data

        

            if (!messageId?.messageId) {
                const checkMessages = await Messages.findOne({
                    $and: [
                        { "participants.user": userId }, { "participants.user": storeUserId }
                    ]
                })

                if (!checkMessages) {
                    data = await Messages.create({
                        name: shopInformation,
                        participants: [{ user: userId }, { user: storeUserId }],
                        messages: []
                    })
                    const checkMessageId = await Messages.findById(data?._id)

                    if (checkMessageId) {
                        res.json({ success: true, message: 'Conversation fetched', data: checkMessageId });
                    } else {
                        res.json({ success: false, message: 'Conversation not found' });
                    }
                } else {
                    const checkMessageId = await Messages.findById(checkMessages?._id)

                    if (checkMessageId) {
                        res.json({ success: true, message: 'Conversation fetched', data: checkMessageId });
                    } else {
                        res.json({ success: false, message: 'Conversation not found' });
                    }
                }
            } else {
                const checkMessageId = await Messages.findById(messageId)

                if (checkMessageId) {
                    res.json({ success: true, message: 'Conversation fetched', data: checkMessageId });
                } else {
                    res.json({ success: false, message: 'Conversation not found' });
                }
            }


        } catch (error) {
            res.json({ success: false, message: `Error Recieve Message controller: ${error}`, error: error })
        }
    },
    GetAllMessages: async (req, res) => {
        try {
            const { userId } = req.params
            const CheckMessages = await Messages.find({ "participants.user": userId })
            res.json({ success: true, message: 'Fetched all messages successfully', data: CheckMessages })
        } catch (error) {
            res.json({ success: false, message: `Error Get all Message controller: ${error}`, error: error })
        }
    }
}

module.exports = MessageController