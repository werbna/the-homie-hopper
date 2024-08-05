const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Animal = require('../models/animal.js')
const Shelter = require('../models/shelter.js')

router.get('/', async (req, res) => {
  try {
      const shelters = await Shelter.find();
      res.render('shelters/index', { shelters });
  } catch (err) {
      console.log(err);
  }
});

// Display detail page for a specific shelter
router.get('/:id', async (req, res) => {
  try {
      const shelter = await Shelter.findById(req.params.id).populate('animals');
      if (!shelter) {
          return res.redirect('/');
      }
      res.render('shelters/show', { shelter });
  } catch (err) {
      console.log(err);
  }
});

// Display shelter create form on GET
router.get('/new', (req, res) => {
  res.render('shelters/new');
});

// Handle shelter create on POST
router.post('/', async (req, res) => {
  try {
      const shelter = new Shelter(req.body);
      await shelter.save();
      res.redirect('/shelters');
  } catch (err) {
      console.log(err);
  }
});

// Display shelter update form on GET
router.get('/:id/edit', async (req, res) => {
  try {
      const shelter = await Shelter.findById(req.params.id);
      if (!shelter) {
          return res.redirect('/');
      }
      res.render('shelters/edit', { shelter });
  } catch (err) {
      console.log(err);
  }
});

// Handle shelter update on PUT
router.put('/:id', async (req, res) => {
  try {
      const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!shelter) {
          return res.redirect('/');
      }
      res.redirect(`/shelters/${shelter._id}`);
  } catch (err) {
      console.log(err);
  }
});

// Handle shelter delete on DELETE
router.delete('/:id', async (req, res) => {
  try {
      await Shelter.findByIdAndRemove(req.params.id);
      res.redirect('/shelters');
  } catch (err) {
      console.log(err);
  }
});

module.exports = router;