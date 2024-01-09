const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Display the form for creating a new post
router.get('/create', function(req, res, next) {
  // Check if the user is logged in
  if (req.isAuthenticated()) {
    res.render('create-post', { user: req.user });
  } else {
    // Redirect to the login page if the user is not authenticated
    res.redirect('/login');
  }
});

// Handle the post creation form submission
router.post('/create', function(req, res, next) {
  // Check if the user is logged in
  if (req.isAuthenticated()) {
    // Create a new post using the data from the form
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text
    });

    // Save the post to the database
    newPost.save(function(err) {
      if (err) {
        return next(err);
      }

      // Redirect to the post's page or any other appropriate page
      res.redirect('/posts/' + newPost._id);
    });
  } else {
    // Redirect to the login page if the user is not authenticated
    res.redirect('/login');
  }
});

module.exports = router;
