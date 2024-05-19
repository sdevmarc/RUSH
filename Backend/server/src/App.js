const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

//Config
const connectDb = require('../config/db')
//Middlewares
const mainMiddleware = require('../middleware/Website/mainMiddleware')
const authenticateUser = require('../middleware/AuthHome')

//Routes
const SignupRoute = require('../routes/SignUp')
const LoginRoute = require('../routes/Login')
const LogoutRoute = require('../routes/Logout')
const StoreRoute = require('../routes/Store')
const UserRoute = require('../routes/Users')
const ProductRoute = require('../routes/Product')
const TransactionRoute = require('../routes/Transactions')
const RateRoute = require('../routes/Rating')
const ReportsRoute = require('../routes/Reports')


app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
}))

app.use(express.json())
connectDb()

app.get('/', authenticateUser, (req, res) => {
    res.json({
        message: `This is Home`
    })
})

app.use('/api', LoginRoute)

app.use('/api', SignupRoute)

app.use('/api', StoreRoute)

app.use('/api', UserRoute)

app.use('/api', LogoutRoute)

app.use('/api', ProductRoute)

app.use('/api', TransactionRoute)

app.use('/api', RateRoute)

app.use('/api', ReportsRoute)

// app.use('/api', MessageRoute)

// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;