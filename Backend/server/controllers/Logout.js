
const Logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ success: false, message: `Fail to destroy session: ${err}` })
        } else {
            res.json({ success: true, message: `Logout Successful` })
        }
    })
}

module.exports = Logout