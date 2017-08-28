const AWS = require('aws-sdk');
const Schema = require('./schema');
const log = require('./../../libs/logger');
const dbTables = require('./tables.json');

/**
 * Sets up the configurations
 * for connecting to AWS db
 *
 */
function updateAWSConfig() {
  log.info(`updateAWSConfig: REGION: ${process.env.REGION}`);
  const awsConfig = {
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
    region: process.env.REGION,
    endpoint: `${process.env.DYNAMO_ENDPOINT}:${process.env.DYNAMO_PORT}`,
  };

  log.trace('updateAWSConfig', awsConfig);

  AWS.config.update(awsConfig);
}

/**
 * Creates tables in DynamoDB
 *
 * @returns {promise}
 */
async function createDbTables() {
  const dynamoDb = new AWS.DynamoDB();
  try {
    await Promise.all(dbTables.map(async (tb) => {
      log.info(`Creating table: ${tb.name}`);
      const params = new Schema(tb.name, tb.hash, tb.hashType);

      await dynamoDb.createTable(params).promise();
      log.info(`Db table ${tb.name} have successfully been created.`);
    }));
  } catch (err) {
    log.error(err);
    throw err;
  }
}

module.exports = {
  updateAWSConfig,
  createDbTables,
  dbTables,
};

