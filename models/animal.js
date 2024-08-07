const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    enum: ['short', 'medium', 'long', 'curly', 'hairless'],
    required: true,
  },
  adopted: {
    type: Boolean,
    required: true,
  },
  adoptionDate: {
    type: Date,
  },
  favoriteBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
