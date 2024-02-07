const express = require('express')
const cors = require('cors')
const app = express()
const connectDb = require('../config/db')
const mainMiddleware = require('../middleware/Website/mainMiddleware')

app.use(cors({
    origin: ['http://localhost:5173'],
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

app.use(mainMiddleware.notFound);
app.use(mainMiddleware.errorHandler);

module.exports = app;