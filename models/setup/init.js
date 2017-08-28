const AWS = require('aws-sdk');
const Schema = require('./schema');
const log = require('./../../libs/logger');

const dbTables = {
  Planes: {
    name: 'Planes',
    hash: 'id',
    hashType: 'string',
  },
};

function updateAWSConfig() {
  log.info(`updateAWSConfig: REGION: ${process.env.REGION}`);
  // TODO
  /**
   * Update the configuration and Docker setup to be able to run in
   * deployment in Amazon server.
   * For now it is working only for local dynamodb.
   */
  const awsConfig = {
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
    region: process.env.REGION,
    endpoint: `${process.env.DYNAMO_ENDPOINT}:${process.env.DYNAMO_PORT}`,
  };

  log.trace('updateAWSConfig', awsConfig);

  AWS.config.update(awsConfig);
}

// TODO
// Implement functionality of creating multiple tables at once

/**
 * Creates tables in DynamoDB
 *
 * @returns {promise}
 */
async function createDbTables() {
  const dynamoDb = new AWS.DynamoDB();
  try {
    log.info(`Creating table: ${dbTables.Planes.name}`);
    const params = new Schema(dbTables.Planes.name, dbTables.Planes.hash, dbTables.Planes.hashType);

    await dynamoDb.createTable(params).promise();
    log.info('Db tables have successfully been created');
  } catch (err) {
    log.error(err);
    throw err;
  }
}

// module.exports = async () => {
//   log.info('init');
//   await updateAWSConfig();
//   await createDbTables();
// };

module.exports = {
  updateAWSConfig,
  createDbTables,
  dbTables,
};

