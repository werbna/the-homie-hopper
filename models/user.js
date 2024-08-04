const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regex for email validation
  },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  adopted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Puppy',
  }],
  favorited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing', 
  }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
