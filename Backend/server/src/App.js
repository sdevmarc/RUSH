const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

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
connectDb()

app.get('/', (req, res) => {
    res.json({
        message: `This is Home`
    })
})


app.use('/api', SignupRoute)
app.use('/api', LoginRoute)

app.use('/api', AddStore)



// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;