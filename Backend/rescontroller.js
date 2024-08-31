const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant');
const User = require('../model/user');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('reviews.user');
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// Get a single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews.user');
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.json(restaurant);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
});

// Add a review to a restaurant
router.post('/:id/reviews', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      const review = {
        user: req.body.user,
        rating: req.body.rating,
        comment: req.body.comment,
      
      };
      restaurant.reviews.push(review);
      await restaurant.save();
      res.json(review);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding review' });
  }
});

// Get reviews for a restaurant
router.get('/:id/reviews', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews.user');
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.json(restaurant.reviews);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

module.exports = router;