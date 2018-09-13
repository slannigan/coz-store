// Main dependencies
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

// Local constants
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:${PORT}`;

// Require routes
const testRouter = require('./routes/test');
const otherTestRouter = require('./routes/otherTest');
const productsRouter = require('./routes/products');

// On entry for any route
app.use('/', (req, res, next) => {
  // console.log('headers:', req.headers);
  // console.log('query:', req.query);
  // console.log('params:', req.params);
  // res.send(req);
  // console.log('host variable:', process.env.HOST, '; host:', req.headers.host);
  if (req.headers.host !== HOST) {
    res.status(403).send(`Access is not allowed through ${req.headers.host}.`);
  }
  next();
});

// Serve up front end
app.use(serveStatic(__dirname + '/vueapp/dist'));

// Import routes
app.use('/', testRouter);
app.use('/', otherTestRouter);
app.use('/api/', productsRouter);

// Start server
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
