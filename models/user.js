const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const userSchema = mongoose.Schema({
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  orders: [orderSchema]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
=======
});

const User = mongoose.model('User', userSchema);
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7

module.exports = User;
