const mongoose = require('mongoose');

async function Connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nodejs_test");
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
}

module.exports = { Connect }