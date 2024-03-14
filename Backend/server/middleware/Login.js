const bcrypt = require('bcrypt')
const Users = require('../models/Users')

const LoginAuth = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const User = await Users.findOne({ username: username })
        
        if (User) {
            const isMatch = await bcrypt.compare(password, User.password);

            if (isMatch) {
                res.json({ success: true, message: 'Login successful!' })
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