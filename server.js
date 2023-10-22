// configure the application to use EJS and set up the routes for the Index page and the About page

// This code defines the application and listens on port 8080:
var express = require('express');
var app = express();

// This code sets EJS as the view engine for the Express application:
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// the code sends a view to the user by using res.render()
// res.render() will look in a views folder for the view
// only have to define pages/index since the full path is views/pages/index

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(8080);
console.log('Server is listening on port 8080');