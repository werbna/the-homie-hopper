const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Shelter = require('../models/shelter');
const Animal = require('../models/animal');

router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.render('animals/index', { animals });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    const users = await User.find();
    res.render('animals/new', { shelters, users });
  } catch (error) {
    console.log(error);
    res.redirect('/animals');
  }
});

router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.redirect('/animals');
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('location').populate('favoriteBy');
    const shelters = await Shelter.find();
    const users = await User.find();
    res.render('animals/edit', { animal, shelters, users });
  } catch (error) {
    console.log(error);
    res.redirect('/animals');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/animals/${req.params.id}`);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('location').populate('favoriteBy').populate('owner');
    res.render('animals/show', { animal });
  } catch (error) {
    console.error(error);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect('/animals');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
