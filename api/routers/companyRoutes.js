const express = require('express');
const router = express.Router();

const companyCtrl = require('../controllers/companyCtrl');
const authMiddleware = require('../middlewares/auth');

router.get('/all', authMiddleware.checkAuthToken, companyCtrl.getAllCompanies);
router.post('/add', authMiddleware.checkAuthToken, companyCtrl.registerCompany);
router.delete('/remove/:companyId', authMiddleware.checkAuthToken, companyCtrl.removeCompany);

module.exports = router;