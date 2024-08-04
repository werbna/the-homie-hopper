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
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regex for email validation
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
    ref: 'Puppy',
  }],
  favorited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing', 
  }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
