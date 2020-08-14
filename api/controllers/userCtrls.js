const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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

    await user.save();
    res.send({
      message: 'User created'
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
    const user = await User.findOne({ email });
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
    res.send({
      message: 'User logged in successfully'
    });
  } catch (error) {
    next(error);
  }
};