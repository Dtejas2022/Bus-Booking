const mongoose = require('mongoose');
const User = require("./userModel.js")
const Bus = require("./bus.js")
// Define the schema
const bookingSchema = new mongoose.Schema({
  bus_id: {
    type: mongoose.Schema.ObjectId,
    ref:'Bus',
    required: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true,
    trim: true
  },
  price:{
    type:String,required:true
  }

},{timestamps:true});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
