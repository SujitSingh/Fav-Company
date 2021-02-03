require('dotenv').config();
const http = require('http');
const app = require('./app');
const appConfig = require('./api/utils/config.js');
const mongoConnect = require('./api/utils/db-connection.js').mongoConnect;
const PORT = appConfig.PORT;

const server = http.createServer(app);

mongoConnect().then(success => {
  console.log('Database connected');
  // start the server
  server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  }).on('error', (error) => {
    console.log('Failed to start server - ', error);
  });
}).catch(error => {
  console.log('Failed to connect database');
});