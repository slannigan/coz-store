'use strict'
const merge = require('webpack-merge')
const stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  API_URL: '"http://localhost:3000/api"',
  NODE_ENV: '"development"'
})
