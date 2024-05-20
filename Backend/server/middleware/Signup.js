const User = require('../models/Users')

const Signup = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const passworfCheck = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/

        if (!passworfCheck.test(password)) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long, contain at least one special character, and one number.' })
        }

        const isUsername = await User.findOne({ username: username })

        if (isUsername) {
            res.json({ success: false, message: 'User already exist!' })
        } else {
            next()
        }
    } catch (error) {
        return next(`Error signup middleware: ${error}`)
    }
}

module.exports = Signup