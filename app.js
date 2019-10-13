// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialise the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());


// Setup server port
var port = process.env.PORT || 3000;

// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Express is up and running on port %s", port);
});


// Global Exception Handlers
app.get('*', function(req, res, next) {
  // This middleware throws an error, so Express will go straight to
  // the next error handler
    throw new Error('This action is not allowed, please check your request.');
});

app.post('*', function(req, res, next) {
  // This middleware throws an error, so Express will go straight to
  // the next error handler
  throw new Error('This action is not allowed, please check your request.');
});

app.use(function(error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  res.status(400).json({ message: error.message });
});
