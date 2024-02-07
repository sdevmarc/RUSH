const express = require('express')
const cors = require('cors')
const app = express()
const mainMiddleware = require('../middleware/Website/mainMiddleware')

app.use(cors());
app.use(express.json());



app.use(mainMiddleware.notFound);
app.use(mainMiddleware.errorHandler);

module.exports = app;