const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 3300;

const server = http.createServer(app);

const dbPath = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`;
mongoose.connect(dbPath, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  success => {
    console.log('Database connected');
    // start the server
    server.listen(PORT, () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    }).on('error', (error) => {
      console.log('Failed to start server - ', error);
    });
  },
  error => {
    console.log('Failed to connect database');
  }
);