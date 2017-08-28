
const initDb = require('./models/setup/init');

initDb.updateAWSConfig();

const express = require('express');
const bodyParser = require('body-parser');
const log = require('./libs/logger');
const { mainErrorHandler, error404 } = require('./middlewares/errors');
const pathLog = require('./middlewares/logs');
const router = require('./routes/router');

const PORT = process.env.PORT;

(async function main() {
  try {
    /**
     * Setups middlewares
     * and the router as a middleware.
     */
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Logs the original url of any request
     */
    app.use(pathLog);

    /**
     * Sets up main routers
     */
    app.use(router);

    /**
     * Sets up error handlers
     */
    app.use(error404, mainErrorHandler);

    await initDb.createDbTables();
    /**
     * Starts the service.
     */
    app.listen(PORT, () => {
      log.info(`Service is running at port: ${PORT}`);
    });
  } catch (err) {
    log.error(`Error on setting up service: ${err.message}`);
    process.exit(1);
  }
}());
