const Messages = require('../models/Messages.deprecated');
const Stores = require('../models/Stores');

const MessageController = {
    SendMessage: async (req, res) => {
        try {
            const { messageId, userId, storeUserId, body } = req.body;
            if (!userId || !storeUserId || !body) {
                return res.json({ success: false, message: 'Required fields are missing' });
            }
            const store = await Stores.findOne({ userId: storeUserId });
            if (!store) {
                return res.json({ success: false, message: 'Store not found' });
            }
            // if (storeUserId === userId) {
            //     return res.json({ success: false, message: 'You cannot message yourself!' });
            // }

            let data;
            if (messageId) {
                const message = await Messages.findById(messageId);
                if (message) {
                    data = await Messages.findByIdAndUpdate(
                        messageId,
                        {
                            shopName: store.shopInformation.shopName,
                            shopUserId: store.userId,
                            $push: {
                                messages: { authorId: userId, body }
                            }
                        },
                        { new: true }
                    );
                    return res.json({ success: true, message: 'Message sent update successfully', data });
                }
            }
            
            const checkUserMessageIfExists = await Messages.findOneAndUpdate(
                {
                    participants: { $all: [storeUserId, userId] }
                },
                {
                    shopName: store.shopInformation.shopName,
                    shopUserId: store.userId,
                    $push: { messages: { authorId: userId, body } }
                },
                { new: true }
            );

            if (checkUserMessageIfExists) {
                return res.json({ success: true, message: 'Message updated successfully!', data: checkUserMessageIfExists });
            } else {
                const newMessage = new Messages({
                    shopName: store.shopInformation.shopName,
                    shopUserId: store.userId,
                    participants: [storeUserId, userId],
                    messages: [{ authorId: userId, body }]
                });

                data = await newMessage.save();
                return res.json({ success: true, message: 'New message created successfully!', data });
            }
        } catch (error) {
            return res.json({ success: false, message: `Error Sending Message controller: ${error}`, error });
        }
    },
    ReceiveMessage: async (req, res) => {
        try {
            const { messageId, userId, storeUserId } = req.params;

            if (messageId === 'null') {
                const checkUserMessageIfExists = await Messages.findOne({
                    participants: { $all: [storeUserId, userId] }
                });

                if (checkUserMessageIfExists) {
                    return res.json({ success: true, message: 'Message Id Fetched successfully!', data: checkUserMessageIfExists });
                } else {
                    return res.json({ success: false, message: 'No message Id exists!', data: null });
                }
            } else {
                const checkMessageId = await Messages.findById(messageId);
                if (checkMessageId) {
                    return res.json({ success: true, message: 'Conversation fetched', data: checkMessageId });
                } else {
                    return res.json({ success: false, message: 'Conversation not found', data: null });
                }
            }
        } catch (error) {
            return res.json({ success: false, message: `Error Receive Message controller: ${error}`, error });
        }
    },
    GetAllMessages: async (req, res) => {
        try {
            const { userId } = req.params;
            const checkMessages = await Messages.find({ participants: userId });
            res.json({ success: true, message: 'Fetched all messages successfully', data: checkMessages });
        } catch (error) {
            res.json({ success: false, message: `Error Get all Message controller: ${error}`, error });
        }
    }
};

module.exports = MessageController;
