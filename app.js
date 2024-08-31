const express = require('express');
const app = express();
const mongoose = require('mongoose');
const restaurantController = require('./controller/rescontroller');
const userController = require('./controller/usercontroller');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-review',);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/restaurants', restaurantController);
app.use('/api/users', userController);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});