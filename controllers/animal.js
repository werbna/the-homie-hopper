const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Shelter = require('../models/shelter');
const Animal = require('../models/animal');
const isSignedIn = require('../middleware/is-signed-in');
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

    const shelter = await Shelter.findById(req.body.location);
    if (shelter) {
    shelter.animals.push(animal._id);
    await shelter.save();
    }

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
    const currentUser = req.session.user;
    res.render('animals/show', { animal,currentUser });
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

router.post('/:id/favorite', isSignedIn, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    const user = req.session.user;
    if (animal && user) {
      const favoriteIndex = animal.favoriteBy.indexOf(user._id);
      if (favoriteIndex === -1) {
        animal.favoriteBy.push(user._id);
      } else {
        animal.favoriteBy.splice(favoriteIndex, 1);
      }
      await animal.save();
    }
    res.redirect(`/animals/${animal._id}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/animals/${req.params.id}`);
  }
});


module.exports = router;
