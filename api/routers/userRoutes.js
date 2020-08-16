const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrls');
const authMiddleware = require('../middlewares/auth');

router.post('/signup', userCtrl.userSignup);
router.post('/login', userCtrl.userLogin);
router.get('/:userId', authMiddleware.checkAuthToken, userCtrl.getUserDetails);
router.post('/:userId/company/:companyId/add-as-fav',
  authMiddleware.checkAuthToken,
  userCtrl.addCompanyAsFavourite
);
router.post('/:userId/company/:companyId/remove-from-fav',
  authMiddleware.checkAuthToken,
  userCtrl.removeCompanyFromFavourite
);

module.exports = router;