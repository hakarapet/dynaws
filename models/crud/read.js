const AWS = require('aws-sdk');
const log = require('./../../libs/logger');
const { dbTables } = require('./../setup/init');
const { setDbTableKeys } = require('./../../utils');

const documentClient = new AWS.DynamoDB.DocumentClient();

/**
 * Get input with specific id (key).
 *
 * @param {any} [id=null]
 * @param {any} [tableName=null]
 * @returns
 */
async function getItemById(tableName = null, id = null) {
  const key = setDbTableKeys(tableName, id, dbTables);

  const params = {
    TableName: tableName,
    Key: key,
  };

  log.info(`getItemById: ${params}`);
  return documentClient.get(params).promise();
}
/**
 * Gets the first 20 inputs.
 *
 * @param {any} [tableName=null]
 * @param {number} [limit=20]
 * @returns
 */
async function getListOfInputs(tableName = null, limit) {
  const params = {
    TableName: tableName,
    Limit: limit,
  };

  log.info(`getListOfInputs: ${params}`);
  return documentClient.scan(params).promise();
}

module.exports = {
  getItemById,
  getListOfInputs,
};
