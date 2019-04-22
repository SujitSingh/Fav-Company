require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');

// available routes
const userRoutes = require('./api/routes/user');

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_PATH}`, 
  { 
    useNewUrlParser: true, 
    useCreateIndex: true 
  }).then(
  succes => { console.log('Database connected'); },
  error => { console.log('Error while connecting to database'); }
);

// use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

// routes handlers
app.use('/user', userRoutes);

app.use((req, res, next)=>{
  // handle non-matched requests
  const error = new Error('Path not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next)=>{
  // handle any error thrown from this application
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;