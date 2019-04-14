const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// available routes
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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