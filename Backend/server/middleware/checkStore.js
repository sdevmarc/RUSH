const Stores = require('../models/Stores')

const checkStoreIfExists = async (req, res, next) => {
    try {
        const { userId } = req.body
        const data = await Stores.findOne({ userId: userId })

        if (data) {
            res.json({ success: true, message: 'You have already store exists!' })
        } else {
            next()
        }
    } catch (error) {
        res.json({ success: false, message: `Error in checking store ${error}` })
    }
}

module.exports = checkStoreIfExists