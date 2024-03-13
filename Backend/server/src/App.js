const express = require('express')
const cors = require('cors')
const app = express()

//Config
const connectDb = require('../config/db')

//Middlewares
const mainMiddleware = require('../middleware/Website/mainMiddleware')
const hashPassword = require('../middleware/hashPassword')

//Routes
const SignupRoutes = require('../routes/SignUp')

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

app.use('/api', hashPassword, SignupRoutes)



// app.use(mainMiddleware.notFound);
// app.use(mainMiddleware.errorHandler);

module.exports = app;