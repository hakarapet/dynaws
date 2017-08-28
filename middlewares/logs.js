const log = require('./../libs/logger');

function pathLog(req, res, next) {
  log.info(`Original URL: ${req.originalUrl}`);
  return next();
}

module.exports = pathLog;
