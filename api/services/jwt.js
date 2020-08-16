const jwt = require('jsonwebtoken');

module.exports.generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '12h' });
};

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 24 * 60 // 24 hours
  });
};