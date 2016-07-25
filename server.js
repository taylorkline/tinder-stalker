const http = require('https');
const express = require('express');
const app = express();
const routes = require('./routes');
const querystring = require('querystring');

app.set('view engine', 'jade');
app.set('views', __dirname+'/views');

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/n2b', routes);

app.listen('8000', () => {
    console.log('Server is listening on port 8000, go to http://localhost:8000');
});
