const mongoose = require('mongoose');

// Define the schema
const complainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  bus_No: {
    type: String,
  }
});

const Complain = mongoose.model('Complain',complainSchema);

module.exports = Complain;
