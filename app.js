const express = require('express');
const session = require('express-session');

const app = express();

const userRoutes = require('./api/routers/userRoutes');
const companyRoutes = require('./api/routers/companyRoutes');

console.log('process.env.SESSION_SECRET', process.env.SESSION_SECRET);
// initialize express-session
app.use(session({
  key: 'ss_id',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 10 * 1000, // 10 mins
  }
}));
app.use(express.json())

// route handlers
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);

// final error handler
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).send({
    error: {
      message: error.message
    }
  });
});

module.exports = app;