// logics for all "/user" routes
const bcrypt = require('bcrypt');

const User = require('../models/userModel'); // User schema

exports.userSignup = (req, res, next) => {
  // register the user
  // encrypt user password
  bcrypt.hash(req.body.password.trim(), 10, (err, hash)=>{
    if(err){
      res.status(500).json({
        message: 'Couldn\'t register the user',
        error: err
      })
    } else {
      const user = new User({
        userName: req.body.userName.trim(),
        email: req.body.email.trim(),
        password: hash
      });

      // save the user in user table
      user.save().then(
        success => {
          res.status(201).json({
            message: 'User created',
            success: true
          });
        },
        error => {
          res.json(500).jon({
            message: 'Failed to register the user',
            success: false,
            error: error
          });
        }
      )
    }
  });
}
