const mongoose = require('mongoose');
const Booking= require("../models/booking")
const Pass = require("../models/pass")

const busSchema = new mongoose.Schema({
  vehicleNo: { type: String, unique: true },
  from: { type: String, required: true  },
  start: { type: String, required: true  },
  vehicleName: { type: String, required: true  },
  ticket: { type: String, required: true  },
  capacity :{type:String ,required:true,default:"60"} ,
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

// Pre-save hook to generate vehicle number
busSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next(); // If not a new document, skip generating the vehicle number
  }

  // Find the highest vehicle number in existing documents
  const highestVehicleNo = await this.constructor.findOne({}, { vehicleNo: 1 })
    .sort({ vehicleNo: -1 })
    .limit(1);

  // Generate the next vehicle number
  const nextVehicleNo = highestVehicleNo ? (parseInt(highestVehicleNo.vehicleNo) + 1).toString() : '100';

  // Assign the next vehicle number to the document
  this.vehicleNo = nextVehicleNo;

  next();
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
