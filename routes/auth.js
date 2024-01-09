const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Display the signup form
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

// Handle the signup form submission
router.post('/signup', async function(req, res, next) {
  const { username, password, confirmPassword } = req.body;

  // Basic validation
  const errors = [];
  if (!username || !password || !confirmPassword) {
    errors.push('All fields must be filled out');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    res.render('signup', { errors });
  } else {
    try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        errors.push('Username is already taken');
        res.render('signup', { errors });
      } else {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
          username,
          password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Redirect to the login page or any other appropriate page
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
