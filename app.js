const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

const userRoutes = require('./api/routers/userRoutes');

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  success => {
    console.log('Database connected');
  },
  error => {
    console.log('Failed to connect database')
  }
);

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