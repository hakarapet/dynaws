const pino = require('pino');
const appName = require('../package.json').name;

module.exports = pino({
  name: appName,
  level: 'debug',
});
