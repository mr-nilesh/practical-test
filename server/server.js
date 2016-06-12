/**
 *
 * Main application file
 *
 **/
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.express = require('express');
var config = require('./config/environment');
global.CONFIG = config;
global.ROOT_PATH = __dirname;
global.DS = '/';

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.server.port, config.server.host, function () {
  console.log('Express server listening on %d, in %s mode', config.server.port, app.get('env'));
});

// Expose app
exports = module.exports = app;