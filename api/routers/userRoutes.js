const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrls');

router.get('/:userId', userCtrl.getUserDetails);
router.post('/signup', userCtrl.userSignup);
router.post('/login', userCtrl.userLogin);

module.exports = router;