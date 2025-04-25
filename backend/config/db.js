const mongoose = require('mongoose');

const conn = await mongoose.connect(process.env.MONGO_URI);


module.exports = connectDB;
