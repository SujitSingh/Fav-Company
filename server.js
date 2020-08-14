const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3300;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
}).on('error', (error) => {
  console.log('Failed to start server - ', error)
});