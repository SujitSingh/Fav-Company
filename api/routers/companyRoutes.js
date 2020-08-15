const express = require('express');
const router = express.Router();

const companyCtrl = require('../controllers/companyCtrl');

router.get('/all', companyCtrl.getAllCompanies);
router.post('/add', companyCtrl.registerCompany);
router.delete('/remove/:companyId', companyCtrl.removeCompany);

module.exports = router;