const mongoose = require('mongoose');
const User = require("./userModel.js")
const Bus = require("./bus.js")
// Define the schema
const passSchema = new mongoose.Schema({
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
  },
  approvedm:{
    type:String,
    default:"0"
  },
  approvedd:{
    type:String,
    default:"0"
  },
  daily:{
    type:Boolean,
    default:false,
  },
  monthly:{
    type:Boolean,
    default:false,
  }

},{timestamps:true});

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
