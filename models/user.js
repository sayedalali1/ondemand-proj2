const mongoose = require('mongoose');

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
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [orderSchema]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
