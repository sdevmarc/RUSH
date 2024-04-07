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
            const { userId } = req.params
            const data = await Stores.find({ userId: userId })
            const { _id } = data[0]
            res.json({ success: true, message: 'get store successfully', data, _id })
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
            res.json({ success: false, message: `Error update store controller: ${error}` })
        }
    },
    GetAllStore: async (req, res) => {
        try {
            const data = await Stores.find()
            res.json({ success: true, message: 'Fetched all stores successfully', data: data })
        } catch (error) {
            res.json({ success: false, message: `Error get all store controller: ${error}` })
        }
    }
}

module.exports = StoreController