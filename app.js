require('babel-core/register');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'static')));

// app.use('/static', express.static(path.join(__dirname, 'static')));
// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, promise) => {
  if (reason.stack) {
		console.error(reason.stack);
	} else {
		console.error('Unhandled Rejection at: Promise ', promise, ' reason: ', reason);
	}
});


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Send index route to index.html 
app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('/*', function (req, res) { 
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

module.exports = app;
