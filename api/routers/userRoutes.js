const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrls');
const authMiddleware = require('../middlewares/auth');

router.get('/:userId', authMiddleware.checkAuthToken, userCtrl.getUserDetails);
router.post('/signup', userCtrl.userSignup);
router.post('/login', userCtrl.userLogin);

module.exports = router;