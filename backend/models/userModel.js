const mongoose = require('mongoose');
const Booking= require("../models/booking")
const Pass = require("../models/pass")
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  role: { type: String, default: "user" },
  amount:{type:String ,required:true},
  // bookings: {
  //   type: Array,
  //   default: [] 
  // }
  bookings:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    default:[]
    // required: true
  },
  passes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: 'Pass',
    default:[]
    // required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
