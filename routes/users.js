var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/:username', async function(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return next(); // User not found
    }
    res.render('profile', { user });
  } catch (error) {
    next(error);
  }
});

/* GET user posts. */
router.get('/:username/posts', async function(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return next(); // User not found
    }

    const posts = await Post.find({ user: user._id });
    res.render('user-posts', { user, posts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
