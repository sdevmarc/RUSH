const Messages = require('../models/Messages')
const Stores = require('../models/Stores')

const MessageController = {
    SendMessage: async (req, res) => {
        try {
            const { user1, user2, body, name } = req.body

            const checkUsers = await Messages.findOne(
                {
                    userId: user1,
                    $or: [
                        { $and: [{ "members.user1": user1 }, { "members.user2": user2 }] },
                        { $and: [{ "members.user1": user2 }, { "members.user2": user1 }] }
                    ]
                })

            if (!checkUsers) {
                const conversation = await Messages.findOneAndUpdate(
                    {
                        $and: [{ "userId": user1 }, { "members.user1": user1 }, { "members.user2": user2 }]
                    },
                    {
                        name: name,
                        $push:
                        {
                            messages: { authorId: user1, body: body }
                        }
                    },
                    {
                        upsert: true,
                        new: true
                    }
                )
                res.json({ success: true, message: 'Message sent successfully', conversation })
            } else {
                const conversation = await Messages.findOneAndUpdate(
                    {
                        userId: user1,
                        $or: [
                            { $and: [{ "members.user1": user1 }, { "members.user2": user2 }] },
                            { $and: [{ "members.user1": user2 }, { "members.user2": user1 }] }
                        ]
                    },
                    {
                        name: name,
                        $push:
                        {
                            messages: { authorId: user1, body: body }
                        }
                    },
                    {
                        upsert: true,
                        new: true
                    }
                )
                res.json({ message: 'Message sent successfully', conversation })
            }

        } catch (error) {
            res.json({ success: false, message: `Error Sending Message controller: ${error}`, error: error })
        }
    },
    ReceiveMessage: async (req, res) => {
        try {
            const { user1, user2 } = req.params;

            const checkUsers = await Messages.findOne(
                {
                    $or: [
                        { $and: [{ "members.user1": user1 }, { "members.user2": user2 }] },
                        { $and: [{ "members.user1": user2 }, { "members.user2": user1 }] }
                    ]
                })

            if (!checkUsers) {
                return res.json({ success: false, message: 'Conversation not found' });
            }

            res.json({ success: true, message: 'Message fetched successfully', checkUsers });
        } catch (error) {
            res.json({ success: false, message: `Error Recieve Message controller: ${error}`, error: error })
        }
    },
    GetAllMessages: async (req, res) => {
        try {
            const { user1 } = req.params
            const messages = await Messages.find({ userId: user1 })
            res.json({ success: true, message: 'Shop fetched successfully!', messages })
        } catch (error) {
            res.json({ success: false, message: `Error Get all Message controller: ${error}`, error: error })
        }
    }
}

module.exports = MessageController