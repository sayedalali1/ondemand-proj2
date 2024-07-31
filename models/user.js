const mongoose = require('mongoose');

// Order schema
const orderSchema = new mongoose.Schema({
  pickupLocation: String,
  dropoffLocation: String,
  date: Date,
  description: String,
  vehicleType: {
    type: String,
    enum: ['sedan', 'suv', 'truck']
  },
  status: {
    type: String,
    enum: ['pending', 'readyForPickup']
  },

  deliveryStatus: {
    type: String,
    enum: ['pending', 'picked up', 'enroute', 'delivered'],
    default: 'pending'
  }

}, { timestamps: true });

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  profile: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user'
  },

  orders: [orderSchema]

}, { timestamps: true });


userSchema.methods.hasProfile = function(profile) {
  return this.profile === profile;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Driver schema

// const driverSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   profile: {
//     type: String,
//     enum: ['user', 'driver', 'admin'],
//     default: 'driver'
//   },

//   orders: [orderSchema]
// }, { timestamps: true });

// const Driver = mongoose.models.User || mongoose.model('User', driverSchema);

// module.exports = Driver;


module.exports = User;
