const _ = require('lodash');
const keystone = require('keystone');

/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = (req, res, next) => {
  const locals = res.locals;
  locals.user = req.user;
  // Add your own local variables here
  next();
};

/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = (req, res, next) => {
  res.err = (err, title, message) =>
    res.status(500).render('errors/500', {
      err: err,
      errorTitle: title,
      errorMsg: message
    });

  res.notfound = (title, message) =>
    res.status(404).render('errors/404', {
      errorTitle: title,
      errorMsg: message
    });

  next();
};
