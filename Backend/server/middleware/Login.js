const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
require('dotenv')

const LoginAuth = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const User = await Users.findOne({ username: username })

        if (User) {
            const isMatch = await bcrypt.compare(password, User.password);

            if (isMatch) {
                const token = jwt.sign({ userPass: User.password, userId: User._id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
                res.json({ success: true, message: 'Login successful!', token: token, userId: User._id })
                next()
            } else {
                res.json({ success: false, message: 'Wrong Password!' });
            }
        } else {
            res.json({ success: false, message: 'No such user found.' })
        }
    } catch (error) {
        return next(`Error Login Auth: ${error}`)
    }
}

module.exports = LoginAuth