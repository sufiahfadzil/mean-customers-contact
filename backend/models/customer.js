const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name    : { type: String, required: true },
  email   : { type: String, required: true },
  phone   : { type: String, required: true },
  address : { type: String },
  gender  : { type: String },
});

module.exports = mongoose.model('Customer', customerSchema);
