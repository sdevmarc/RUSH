const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        // sample
        // await mongoose.connect('mongodb+srv://sdevmarc:RN2UytLKAeppKJ4h@practicecluster.0fvaewb.mongodb.net/')
        console.log('Connected to the database!')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;