const Users = require('../models/Users')

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const values = req.body
            await Users.create(values)
            res.json({ success: true, message: 'User added successfully!' })
        } catch (error) {
            res.json({ success: false, message: `Error user controller: ${error}` })
        }
    }
}

module.exports = UserController