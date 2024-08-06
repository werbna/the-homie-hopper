const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phoneNumber: {
    type: String,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  adopted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  }],
  favorited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal', 
  }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
