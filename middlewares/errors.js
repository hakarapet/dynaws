const log = require('./../libs/logger');

function error404(req, res, next) {
  const err = new Error('Endpoint not found');
  err.code = 404;
  return next(err);
}

function mainErrorHandler(err, req, res) {
  log.error(err);
  return res.status(err.code || 500).json({ msg: err.message });
}

module.exports = {
  error404,
  mainErrorHandler,
};
