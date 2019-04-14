const express = require('express');
const router = express.Router();

// user route handlers
const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.userSignup);

router.post('/login', (req, res, next) => {
  res.send('Login request');
});

module.exports = router;