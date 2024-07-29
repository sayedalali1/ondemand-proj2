const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // orders: [orderSchema]
});

const Driver = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

module.exports = Driver;
