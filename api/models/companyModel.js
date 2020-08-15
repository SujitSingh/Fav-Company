const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyType: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema, 'Company');

module.exports = Company;