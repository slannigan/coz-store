// Main dependencies
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// Local constants
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:${PORT}`;

// Require routes
const products = require('./routes/products');
const transactions = require('./routes/transactions');

// If not doing local development, redirect http to https
if (HOST.indexOf('localhost') === -1) {
  app.use(redirectToHTTPS());
}

// On entry for any route
app.use('/', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  if (HOST.indexOf('localhost') > -1) {
    // If running local development, allow access from any host, to make development easier
    res.header("Access-Control-Allow-Origin", "*");
  }
  next();
});

// Serve up front end
app.use(serveStatic(__dirname + '/vueapp/dist'));
// Allow POST to read req.body
app.use(bodyParser.json());

// Import routes
app.use('/api/', products);
app.use('/api/', transactions);

// Start server
app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}.`);
});
