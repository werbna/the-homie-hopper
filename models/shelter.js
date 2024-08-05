const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  animals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  }],
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
