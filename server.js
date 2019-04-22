const app = require('./app');
const port = process.env.PORT || 8350;

app.listen(port, function(err, req, res){
  if(err) {
    return console.log('Error occurred while starting server');
  }
  console.log(`Server running on http://127.0.0.1:${port}`);
});