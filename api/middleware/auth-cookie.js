const jwt = require('jsonwebtoken');

const cookieName = 'ss_id';

exports.validateSession = (req, res, next) => {
  console.log(req.cookies[cookieName]);
  if(req.cookies[cookieName] && !req.session.user) {
    // invalid session
    res.clearCookie(cookieName);
  }
  next();
}

exports.sessionChecker = (req, res, next) => {
  if(!req.session.user || !res.cookies[cookieName]) {
    res.redirec('/login');
  } else {
    next();
  }
}

exports.setCookieToken = (res, partialPayload) => {
  const payload = {
    ...partialPayload,
    date: Date.now()
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  res.cookie(cookieName, token, {
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    secure: true,
  });
  
  return res;
}

exports.validateCookie = (req, res, next) => {
  const token = req.cookies[cookieName];
  const decode = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decode);
  next();
}