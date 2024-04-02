const jwt = require('jsonwebtoken')
require('dotenv')

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    // if (token === null) return res.sendStatus(401)
    if (token === null) return res.json({ authorization: `You are not authorized: null` })
    if (token === undefined) return res.json({ authorization: `You are not authorized: undefined` })

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        // if (err) return res.sendStatus(403)
        if (err) return res.json({ authorization: `You are not authorized. : ${err}` })

        req.userPass = decoded.userPass
        req.userId = decoded.userId
        next()
    })
}

module.exports = authenticateUser