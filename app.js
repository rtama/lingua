require('babel-core/register');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import route handlers
const api = require('./server/routes/api.js');
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, promise) => {
  if (reason.stack) {
		console.error(reason.stack);
	} else {
		console.error('Unhandled Rejection at: Promise ', promise, ' reason: ', reason);
	}
});

// Map paths to route handlers 
app.use('/api', api);

// Send index route to index.html 
app.use(express.static(__dirname + '/dist'));
app.get('*', function (req, res) { 
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
