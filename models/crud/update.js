const AWS = require('aws-sdk');
const _ = require('lodash');
const log = require('./../../libs/logger');
const { dbTables } = require('./../setup/init');
const { setDbTableKeys } = require('./../../utils');

const documentClient = new AWS.DynamoDB.DocumentClient();

/**
 * Creates additional expressions to use as in
 * aws-sdk to update the specific attributes of
 * table item.
 *
 * @param {object} data
 * @returns {object}
 */
function UpdateDataExpression(data) {
  let UpdateExpression = 'set ';
  const ExpressionAttributeValues = {};

  _.forEach(data, (attrValue, attrKey) => {
    UpdateExpression += `${attrKey} = :${attrKey}, `;
    ExpressionAttributeValues[`:${attrKey}`] = attrValue;
  });

  /* Remove the last `, ` from the string as it causes error */
  UpdateExpression = UpdateExpression.substring(0, UpdateExpression.length - 2);
  return { UpdateExpression, ExpressionAttributeValues };
}

/**
 * Update the input with the data
 *
 * @param {string} tableName
 * @param {string} id
 * @param {object} data
 * @returns {object}
 */
async function updateItemById(tableName, id, data) {
  const key = setDbTableKeys(tableName, id, dbTables);
  const updateDataExp = new UpdateDataExpression(data);

  const params = {
    TableName: tableName,
    Key: key,
    ReturnValues: 'UPDATED_NEW',
  };

  Object.assign(params, updateDataExp);

  log.info(`updateItemById: ${params}`);
  return documentClient.update(params).promise();
}

module.exports = { updateItemById };
