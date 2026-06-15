const mongoose = require('mongoose');

// Define the schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  preferredContactMethod: {
    type: String,
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
