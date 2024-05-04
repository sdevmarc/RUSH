const User = require('../models/Users')

const CheckAddress = async (req, res, next) => {
    try {
        const { userId, deliveryAddress } = req.body

        const isDeliveryAddress = await User.findById(userId)

        if (isDeliveryAddress) {
            res.json({ success: false, message: 'Address already exist!' })
        } else {
            next()
        }
    } catch (error) {
        return next(`Error signup middleware: ${error}`)
    }
}

module.exports = CheckAddress