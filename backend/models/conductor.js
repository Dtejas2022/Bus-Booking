const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }
});

const Conductor = mongoose.model('Conductor', conductorSchema);

module.exports = Conductor;
