const Stores = require('../models/Stores')

const StoreController = {
    CreateStore: async (req, res) => {
        try {
            const values = req.body
            await Stores.create(values)
            res.json({ success: true, message: 'Store added successfully' })
        } catch (error) {
            res.json({ success: false, message: `Error Store Controller: ${error}` })
        }
    }
}

module.exports = StoreController