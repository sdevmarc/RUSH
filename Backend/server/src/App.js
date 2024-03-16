const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const AuthConfig = require('../config/AuthConfig')

//Config
const connectDb = require('../config/db')
//Middlewares
const mainMiddleware = require('../middleware/Website/mainMiddleware')

//Routes
const SignupRoute = require('../routes/SignUp')
const LoginRoute = require('../routes/Login')
const AddStore = require('../routes/AddStore')

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
}))

app.use(express.json())
app.use(AuthConfig);
connectDb()

app.get('/', (req, res) => {
    // res.json({
    //     message: `This is Home`
    // })
    try {
        console.log(req.oidc.isAuthenticated())
        if (req.oidc.isAuthenticated()) {
            res.json({ authenticate: true, message: 'Authenticated' })
        } else {
            res.json({ authenticate: false, message: 'Not Authenticated' })
        }
    } catch (error) {
        res.json({ message: `Error / route: ${error}` })
    }
})

app.get('/logout', (req, res) => {
    try {
        if (req.oidc.isAuthenticated()) {
            res.json({ authenticate: true, message: 'Authenticated' })
        } else {
            res.json({ authenticate: false, message: 'Not Authenticated' })
        }
    } catch (error) {
        res.json({ message: `Error / route: ${error}` })
    }
})

app.use('/api', SignupRoute)
app.use('/api', LoginRoute)

app.use('/api', AddStore)



// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;