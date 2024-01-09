// Import required modules
const express = require('express');
const router = express.Router();

// Add a route for passcode entry
router.get('/enter-passcode', (req, res) => {
  res.render('enter-passcode', { passcodeSum: 1 + 2 + 3 });
});

// Handle passcode submission
router.post('/enter-passcode', (req, res) => {
  const enteredPasscode = parseInt(req.body.passcode, 10);

  // Check if the entered passcode is correct (sum of 1+2+3)
  if (enteredPasscode === 6) {
    // Update the user's membership status to 'active'
    // Assume you have the user ID available in req.user.id
    const userId = req.user.id; // Change this according to your user ID retrieval logic

    MembershipStatus.findOneAndUpdate({ userId }, { status: 'active' }, { new: true })
      .then((membershipStatus) => {
        if (membershipStatus) {
          // Redirect to home page after successful passcode entry
          res.redirect('/');
        } else {
          // Handle error (user not found)
          res.status(404).send('User not found');
        }
      })
      .catch((err) => {
        // Handle database error
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // Incorrect passcode, render the passcode entry page with an error message
    res.render('enter-passcode', { passcodeSum: 1 + 2 + 3, error: 'Incorrect passcode' });
  }
});

// Export the router
module.exports = router;
