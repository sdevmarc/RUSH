const bcrypt = require('bcrypt')

const hashedPassword = async (req, res, next) => {
    try {
        const values = req.body
        const hash = await bcrypt.hash(values.password, 10)
        values.password = hash
        next()
    } catch (error) {
        return next(`Error hashing password: ${error}`)
        // res.json({ success: false, message: `Error hashing password: ${error}` })
    }

}

module.exports = hashedPassword