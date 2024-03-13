const express = require('express')
const cors = require('cors')
const app = express()

//Config
const connectDb = require('../config/db')

//Middlewares
const mainMiddleware = require('../middleware/Website/mainMiddleware')
const hashPassword = require('../middleware/hashPassword')

//Routes
const SignupRoute = require('../routes/Signup')
const LoginRoute = require('../routes/Login')

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
}))

app.use(express.json())
connectDb()

app.get('/', (req, res) => {
    res.json({
        message: `This is Home`
    })
})

app.use('/api', LoginRoute)

app.use('/api', hashPassword, SignupRoute)





// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;