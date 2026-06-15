const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = () => {
    // mongoose.connect("mongodb://localhost:27017/Bus")
    mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected!'));}

 connectDB() ;