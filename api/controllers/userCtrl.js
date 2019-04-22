// logics for all "/user" routes
const bcrypt = require('bcrypt');

const User = require('../models/userModel'); // User schema

function findUser(userName) {
  // find user on "userName"
  return User.find({userName: userName});
}

exports.userSignup = (req, res, next) => {
  const userName = req.body.userName.trim();
  // check if userName already taken
  findUser(userName).then(
    users => {
      if(users.length === 0) {
        // encrypt user password
        bcrypt.hash(req.body.password.trim(), 10, (err, hash)=>{
          if(err){
            res.status(500).json({
              message: 'Couldn\'t register the user',
              error: err
            })
          } else {
            const user = new User({
              userName: userName,
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
      } else {
        // user already registered
        res.status(409).json({
          message: 'User alredy exists'
        });
      }
    },
    error => {
      res.status(500).json({
        message: 'Query failed to check user',
        error: error
      });
    }
  );
}

exports.userLogin = (req, res, next) => {
  const userName = req.body.userName.trim();
  const userPassErrMsg = 'Username or password is incorrect';
  // check if user exists
  findUser(userName).then(
    user => {
      if(!user.length) {
        // userName doesn't exists
        res.status(401).json({
          message: userPassErrMsg
        });
      } else {
        // userName present, chek for password
        bcrypt.compare(req.body.password.trim(), user[0].password, (err, result) => {
          if(err) {
            res.status(401).json({
              message: userPassErrMsg
            });
          }
          if(result) { // correct password
            res.status(200).json({
              message: 'Successful login'
            });
          } else {
            // wrong password
            res.status(401).json({
              message: userPassErrMsg
            })
          }
        })
      }
    },
    error => {
      res.status(500).json({
        message: 'Failed to login the user at this moment',
        error: error
      });
    }
  )
}