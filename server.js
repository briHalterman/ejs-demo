// In this lesson, you learn EJS, a templating language for Express. The templates contain embedded JavaScript, which is executed on the server side. This constructs an ordinary HTML page, but with dynamic content. Because the embedded JavaScript runs on the server, before the page is sent to the client, dynamic content can be delivered, such as information from a database. This is called server side rendering. Except for the embedded JavaScript, the templates are ordinary HTML pages, which may be combined with CSS and client side JavaScript.

// Server side rendering is in some respects easier than writing first an API and then a front end for it, where the front end makes fetch calls to the API. On the other hand, if you don’t create an API, you can’t access the data via React or other front ends that run outside the application itself.

// In EJS, there are really only three kinds of embedded JavaScript statements:
// <%- include 'filename' %>
// <% code %>
// <%= code %>

// All are encased in the <% %> sequence. The one with the minus in front does an include of another template, so that you can have headers, footers, and other partials. The one with no minus or equals sign executes code but does not return any change to the HTML. This is used for logic statements, such as if statements and loops. The one with the equals sign executes code and returns the result in line as HTML.

// Please be sure that you understand where each piece of JavaScript executes! The JavaScript for your controllers, routes, middleware, etc. executes on the server side. If you do a console.log for this code, it appears in the server console. The code you put into an EJS file also executes on the server side, to customize the page with variable data before it is sent to the browser. However, you can also put JavaScript into an HTML page, or load it from a page, where the JavaScript is not within the EJS “<% %>” enclosure. That JavaScript is loaded by the browser and runs in the browser context, which means that it has access to the window and the DOM, but it does not have access to server side data and the database.

// When quickly creating Node applications, a fast way to template your application is sometimes necessary.
// Jade comes as the default template engine for Express but Jade syntax can be overly complex for many use cases.
// Embedded JavaScript templates (EJS) can be used as an alternative template engine.

// Apply EJS to an Express application, include repeatable parts of your site, and pass data to the views.

// Like a lot of the applications you build, there will be a lot of code that is reused. These are considered partials. In this example, there will be three partials that will be reused on the Index page and About page: head.ejs, header.ejs, and footer.ejs.

// Use <%- include('RELATIVE/PATH/TO/FILE') %> to embed an EJS partial in another file.
// The hyphen <%- instead of just <% to tell EJS to render raw HTML.

// configure the application to use EJS and set up the routes for the Index page and the About page

// change the server.js to load the routes and middleware
const taskRouter = require('./routes/tasks');
const setMessage = require('./middleware/message');

// load in session setup
require('dotenv').config();
const connectDB = require('./db/connect');
const session = require('express-session');

// This code defines the application and listens on port 8080:
var express = require('express');
var app = express();

// This code sets EJS as the view engine for the Express application:
app.set('view engine', 'ejs');

// set up the session
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
//  invoke express middleware to parse the data that is returned when the browser posts form results
app.use(express.urlencoded({extended: false}));
// invoke the message middleware and the routes you created
app.use('/tasks', setMessage, taskRouter);

// use res.render to load up an ejs view file
// the code sends a view to the user by using res.render()
// res.render() will look in a views folder for the view
// only have to define pages/index since the full path is views/pages/index

// index page
app.get('/', function(req, res) {
	// This code defines an array called mascots and a string called tagline:
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";
  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// fix the startup sequence to automatically connect to the database

// app.listen(8080);
// console.log('Server is listening on port 8080');

const port = 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();