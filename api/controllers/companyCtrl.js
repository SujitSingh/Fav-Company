const Company = require('../models/companyModel');

exports.getAllCompanies = async (req, res, next) => {
  Company.find().then(companies => {
    return res.send({
      companies: companies
    });
  }).catch(error => {
    next(error);
  });
};

exports.registerCompany = async (req, res, next) => {
  const companyName = req.body.name,
        companyType = req.body.companyType;

  try {
    const companyInDb = await Company.findOne({ name: companyName });
    if (companyInDb) {
      throw new Error('Company already exists');
    }
    // save the company
    const company = new Company({
      name: companyName,
      companyType
    });
    const savedCompany = await company.save();
    return res.send({
      message: 'Company registered',
      company: {
        ...savedCompany.toObject()
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.removeCompany = async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    const removedCompany = await Company.findByIdAndRemove(companyId);
    if (!removedCompany) {
      throw new Error('Company does not exists');
    }
    // company removed
    return res.send({
      message: 'Company removed',
      company: {
        ...removedCompany.toObject()
      }
    });
  } catch (error) {
    next(error);
  }
};