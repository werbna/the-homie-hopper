const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Shelter = require('../models/shelter');
const Animal = require('../models/animal');
const isSignedIn = require('../middleware/is-signed-in');
const isCommentAuthor = require('../middleware/is-comment-author');
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.render('animals/index', { animals });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    const owners = await User.find(); // Fetch the list of users
    res.render('animals/new', { shelters, owners });
  } catch (err) {
    console.log(err);
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

  } catch (err) {
    console.log(err);
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('favoriteBy');
    const shelters = await Shelter.find();
    const owners = await User.find();
    res.render('animals/edit', { animal, shelters, owners });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/animals/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('location').populate('favoriteBy').populate('owner');
    const currentUser = req.session.user;
    res.render('animals/show', { animal,currentUser });
  } catch (err) {
    console.log(err);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect('/animals');
  } catch (err) {
    console.log(err);
  }
});

router.post('/:id/favorite', isSignedIn, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    
    if (animal && user) {
      const animalFavoriteIndex = animal.favoriteBy.indexOf(user._id);
      const userFavoriteIndex = user.favorited.indexOf(animal._id);

      if (animalFavoriteIndex === -1 && userFavoriteIndex === -1) {
        animal.favoriteBy.push(user._id);
        user.favorited.push(animal._id);
      } else {
        animal.favoriteBy.splice(animalFavoriteIndex, 1);
        user.favorited.splice(userFavoriteIndex, 1);
      }
      
      await animal.save();
      await user.save();
    }

    res.redirect(`/animals/${animal._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/animals/${req.params.id}`);
  }
});

router.post('/:id/comments', isSignedIn, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    const comment = {
      text: req.body.text,
      author: req.session.user._id,
    };
    animal.comments.push(comment);
    await animal.save();
    res.redirect(`/animals/${animal._id}`);
  } catch (err) {
    console.log('Error adding comment:', err);
    res.redirect(`/animals/${req.params.id}`);
  }
});

router.delete('/:id/comments/:commentId', isSignedIn, isCommentAuthor, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    res.redirect(`/animals/${animal._id}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.redirect(`/animals/${req.params.id}`);
  }
});



module.exports = router;
