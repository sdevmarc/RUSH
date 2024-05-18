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
            const { displayName, username, contactno, UserType, profilePhoto } = data
            res.json({ success: true, message: 'Fetching user successful', data: { username, displayName, contactno, UserType,profilePhoto } })
        } catch (error) {
            res.json({ success: false, message: `Error getting user controller: ${error}` })
        }
    },
    fetchAddress: async (req, res) => {
        try {
            const { userId } = req.params

            const data = await Users.findById(userId)
            const { personalDetails, deliveryAddress } = data
            res.json({ success: true, message: 'Fetching address successful', data: { personalDetails, deliveryAddress } })
        } catch (error) {
            res.json({ success: false, message: `Error getting user controller: ${error}` })
        }
    },
    fetchActiveAddrees: async (req, res) => {
        try {
            const { userId } = req.params

            const data = await Users.findById(userId)
            const { personalDetails, deliveryAddress, contactno } = data

            const activeIndex = deliveryAddress.findIndex(item => item.isActive === 'active');

            let ActiveAddress = null

            if (activeIndex !== -1) {
                ActiveAddress = deliveryAddress[activeIndex]
                res.json({ success: true, message: 'Fetched Active Address successful', data: { personalDetails, ActiveAddress, contactno } })
            } else {
                res.json({ success: true, message: 'No active address has been set' });
            }
        } catch (error) {
            res.json({ success: false, message: `Error getting user controller: ${error}` })
        }
    },
    UpdateActiveAddress: async (req, res) => {
        try {
            const { index, userId } = req.body

            const data = await Users.findById(userId)
            const address = data.deliveryAddress.find(item => item._id.toString() === index)

            address.isActive = 'active'

            data.deliveryAddress.forEach(item => {
                if (item._id.toString() !== index) {
                    item.isActive = 'inactive';
                }
            })

            await data.save()

            res.json({ success: true, message: "Address is set to default!" })
        } catch (error) {
            res.json({ success: false, message: `Error getting user controller: ${error}` })
        }
    },
    AddAddress: async (req, res) => {
        try {
            const { userId, deliveryAddress } = req.body

            const data = await Users.findByIdAndUpdate(userId, { $push: { deliveryAddress: deliveryAddress } }, { new: true })
            if (data) {
                res.json({ success: true, message: 'Address added successfully!' })
            } else {
                res.json({ success: true, message: 'Address not added successfully!' })
            }

        } catch (error) {
            res.json({ success: false, message: `Catch error from controller: ${error}` })
        }
    },
    AddPersonalDetails: async (req, res, next) => {
        try {
            const { userId, personalDetails } = req.body

            const data = await Users.findByIdAndUpdate(userId, { personalDetails }, { new: true })
            if (data) {
                next()
            } else {
                res.json({ success: true, message: 'Address not added successfully!' })
            }

        } catch (error) {
            res.json({ success: false, message: `Catch error from controller: ${error}` })
        }
    },
    SearchUsers: async (req, res) => {
        try {
            const { searchId } = req.params

            const checkusers = await Users.find({
                username: { $regex: new RegExp(searchId, 'i') },
                displayName: { $regex: new RegExp(searchId, 'i') }
            })

            res.json({ success: true, message: 'Searching a user is successful!', data: checkusers })

        } catch (error) {
            res.json({ success: false, message: `Search user error from controller: ${error}` })
        }
    },
    GetAllUsers: async (req, res) => {
        try {
            const users = await Users.find()
            res.json({ success: true, message: 'Retrieving all users is successfull!', data: users })
        } catch (error) {
            res.json({ success: false, message: `Get all user error from controller: ${error}` })
        }
    },
    UpdateProfiePhoto: async (req, res) => {
        try {
            const { userId, profilePhoto } = req.body
            if (!userId || !profilePhoto) return res.json({ success: false, message: 'Empty fields, please fill in' })

            const updateProfile = await Users.findByIdAndUpdate(
                userId,
                {
                    profilePhoto: profilePhoto
                },
                {
                    new: true
                }
            )

            if(updateProfile) {
                res.json({ success: true, message: 'User photo updated!', data: updateProfile })
            } else {
                res.json({ success: false, message: 'Failed to update user photo' })
            }

        } catch (error) {
            res.json({ success: false, message: `Get all user error from controller: ${error}` })
        }
    }
}

module.exports = UserController