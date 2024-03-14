const express = require('express')
const cors = require('cors')
const app = express()

//Config
const connectDb = require('../config/db')

//Middlewares
const mainMiddleware = require('../middleware/Website/mainMiddleware')

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

app.use('/api', SignupRoute)
app.use('/api', LoginRoute)






// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;