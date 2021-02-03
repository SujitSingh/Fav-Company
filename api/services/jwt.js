const jwt = require('jsonwebtoken');
const appConfig = require('../utils/config.js');

module.exports.generateJwtToken = (payload) => {
  return jwt.sign(payload, appConfig.TOKEN_SECRET, { expiresIn: '12h' });
};

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, appConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 24 * 60 // 24 hours
  });
};