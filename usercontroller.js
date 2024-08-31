const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
 } catch (err) {
    console.error(err);
  }
});
router.get('/', async (req, res) => {
    try {
      const users = await User.find().exec();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  });
module.exports = router;