const jwt = require('jsonwebtoken');

module.exports.checkAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization,
        userId = req.params.userId;
  const token = authHeader ? authHeader.split(' ')[1] : '';

  const notAuthorized = new Error('Unauthorized');
  notAuthorized.statusCode = 401;

  if (!token) {
    return next(notAuthorized);
  }

  // check for token validation
  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error || !decoded || (userId && userId !== decoded.id)) {
      // decoding failed or worong user
      if (error) { error.statusCode = 401; }
      return next(error || notAuthorized);
    }
    // token decoded, add "user" to req and continue
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    next();
  });
};