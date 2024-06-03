const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/rush')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the database!')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.log('Connection: ',process.env.MONGODB_URI)
        process.exit(1);
    }
}

module.exports = connectDb;