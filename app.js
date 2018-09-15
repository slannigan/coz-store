// Main dependencies
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

// Local constants
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:${PORT}`;

// Require routes
const testRouter = require('./routes/test');
const otherTestRouter = require('./routes/otherTest');
const products = require('./routes/products');
const transactions = require('./routes/transactions');

// On entry for any route
app.use('/', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  // If running local development, allow access from any host, to make development easier
  if (HOST.indexOf('localhost') > -1) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  }
  next();
});

// Serve up front end
app.use(serveStatic(__dirname + '/vueapp/dist'));
// Allow POST to read req.body
app.use(bodyParser.json());

// Import routes
app.use('/', testRouter);
app.use('/', otherTestRouter);
app.use('/api/', products);
app.use('/api/', transactions);

// Start server
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
