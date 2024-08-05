const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  typeOfAnimal: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  coat: {
    type: String,
    enum: ['short', 'medium', 'long', 'hairless'],
    required: true,
  },
  adopted: {
    type: Boolean,
    required: true,
  },
  adoptionDate: {
    type: Date,
    required: true,
  },
  favoriteBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
