const express = require('express');
const session = require('express-session');
const cors = require('cors');
const appConfig = require('./api/utils/config.js');

const app = express();

const userRoutes = require('./api/routers/userRoutes');
const companyRoutes = require('./api/routers/companyRoutes');

require('dotenv').config(); // require environment variables

// initialize express-session
app.use(session({
  key: 'ss_id',
  secret: appConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 10 * 1000, // 10 mins
  }
}));
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

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