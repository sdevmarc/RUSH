const Users = require('../models/Users')

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const values = req.body

            await Users.create(values)
            res.json({ success: true, message: 'User added successfully!' })
        } catch (error) {
            res.json({ success: false, message: `Error adding user controller: ${error}` })
        }
    },
    FetchUser: async (req, res) => {
        try {
            const { userId } = req.params

            const data = await Users.findOne({ _id: userId })
            const { name, username, contactno, UserType } = data
            res.json({ success: true, message: 'Fetching user successful', data: { username, name, contactno, UserType } })
        } catch (error) {
            res.json({ success: false, message: `Error getting user controller: ${error}` })
        }
    }
}

module.exports = UserController