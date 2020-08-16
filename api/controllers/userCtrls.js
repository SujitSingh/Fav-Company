const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const jwtService = require('../services/jwt');

exports.getUserDetails = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId)
                            .select('-password')   // exclude "password"
                            .populate('favCompanies');
    if (!user) {
      throw new Error('User details not found');
    }
    // send user details
    return res.send({
      ...user.toObject()
    });
  } catch (error) {
    next(error);
  }
};

exports.userSignup = async (req, res, next) => {
  const name = req.body.name,
        email = req.body.email,
        password = req.body.password;
  
  try {
    const userInDb = await User.findOne({ email });
    if (userInDb) {
      // email alredy exists
      throw new Error('User already exists');
    }
    // hash user password
    const hash = await bcrypt.hash(password, 10);
    // save user info
    const user = new User({
      name,
      email,
      password: hash
    });

    const createdUser = await user.save();
    const userObj = createdUser.toObject();
    delete userObj.password; // remove "password"

    return res.send({
      message: 'User created',
      user: {
        ...userObj
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  const email = req.body.email,
        password = req.body.password;

  const invalidAccess = new Error('Email or credentials is/are wrong');
  invalidAccess.statusCode = 403;

  try {
    // find user
    const user = await User.findOne({ email })
                          .select('+password'); // include "password"
    if (!user) {
      throw invalidAccess;
    }
    // compare user password
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      // password don't match
      throw invalidAccess;
    }
    // email and password matched
    const userObj = user.toObject();
    delete userObj.password; // remove "password"
    // generate access tokens
    const token = await jwtService.generateJwtToken({ id: userObj._id, email: userObj.email });
    return res.send({
      token,
      ...userObj
    });
  } catch (error) {
    next(error);
  }
};

module.exports.addCompanyAsFavourite = async (req, res, next) => {
  const userId = req.params.userId,
        companyId = req.params.companyId;

  const notFoundError = new Error('');
  notFoundError.statusCode = 404;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      notFoundError.message = 'Company not found';
      throw notFoundError;
    }
    // find user details
    const user = await User.findById(userId);
    if (!user) {
      notFoundError.message = 'User not found';
      throw notFoundError;
    }
    // add company id to user's object if not already present
    if (user.favCompanies.indexOf(companyId) === -1) {
      user.favCompanies.push(companyId);
      await user.save(); // save user changes
    }
    return res.send({
      message: 'Added company to favourite list'
    });
  } catch (error) {
    next(error);
  }
};

module.exports.removeCompanyFromFavourite = async (req, res, next) => {
  const userId = req.params.userId,
        companyId = req.params.companyId;

  const notFoundError = new Error('');
  notFoundError.statusCode = 404;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      notFoundError.message = 'Company not found';
      throw notFoundError;
    }
    // find user details
    const user = await User.findById(userId);
    if (!user) {
      notFoundError.message = 'User not found';
      throw notFoundError;
    }
    // remove company id to user's object
    user.favCompanies = user.favCompanies.filter(favCompanyId => {
      return favCompanyId !== companyId;
    });

    await user.save(); // save user changes
    return res.send({
      message: 'Removed company from favourite list'
    });
  } catch (error) {
    next(error);
  }
};