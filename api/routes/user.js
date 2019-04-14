const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  res.send('Signup request');
});

router.post('/login', (req, res, next) => {
  res.send('Login request');
});

module.exports = router;