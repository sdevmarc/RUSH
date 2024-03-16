const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.CLIENT_SECRET_KEY,
    baseURL: 'http://localhost:3001',
    clientID: process.env.CLIENT_ID_KEY,
    issuerBaseURL: `https://${process.env.DOMAIN_KEY}`
}

const AuthGoogle = auth(config)
module.exports = AuthGoogle