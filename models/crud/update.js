const AWS = require('aws-sdk');
const _ = require('lodash');
const log = require('./../../libs/logger');
const { dbTables } = require('./../setup/init');
const { setDbTableKeys } = require('./../../utils');
const flatten = require('flat');

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
  const updateExpressionArr = [];
  const ExpressionAttributeValues = {};
  // const ExpressionAttributeNames = {};

  const flatData = flatten(data);

  _.forEach(flatData, (attrValue, attrKey) => {
    const validAttrKey = attrKey.replace('.', '');
    updateExpressionArr.push(`${attrKey} = :${validAttrKey}`);
    ExpressionAttributeValues[`:${validAttrKey}`] = attrValue;
  });

  UpdateExpression += updateExpressionArr.join(', ');
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
    ReturnValues: 'ALL_NEW',
  };

  Object.assign(params, updateDataExp);

  log.info(`updateItemById: ${params}`);
  return documentClient.update(params).promise();
}

module.exports = { updateItemById };
