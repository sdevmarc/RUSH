const Stores = require('../models/Stores')
const Users = require('../models/Users')

const StoreController = {
    CreateStore: async (req, res) => {
        try {
            const values = req.body

            await Stores.create(values)
            res.json({ success: true, message: 'Store added successfully' })
        } catch (error) {
            res.json({ success: false, message: `Error create store controller: ${error}` })
        }
    },
    GetStore: async (req, res) => {
        try {
            const { userId } = req.body
            const data = await Stores.find({ userId: userId })
            res.json({ success: true, message: 'get store successfully', data: data })
        } catch (error) {
            res.json({ success: false, message: `Error get store controller: ${error}` })
        }
    },
    UpdateSellerType: async (req, res, next) => {
        try {
            const { userId } = req.body

            await Users.findByIdAndUpdate({ _id: userId }, { UserType: 'Renter' }, { new: true })
            next()
        } catch (error) {
            res.json({ success: false, message: `Error get store controller: ${error}` })
        }
    }
}

module.exports = StoreController