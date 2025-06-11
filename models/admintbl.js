const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  shipping: {
    type: String,
    required: true
  },
  cardname: {
    type: String,
    required: true
  },
  cardnumber: {
    type: String,
    required: true
  },
  expiry: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
