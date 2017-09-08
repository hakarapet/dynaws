const AWS = require('aws-sdk');
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
  const flattenData = flatten(data, { safe: true });
  const ExpressionAttributeValues = {};
  const ExpressionAttributeNames = {};

  const updateExpressionArr = Object.keys(flattenData).map((flatKey, index) => {
    const flatVal = flattenData[flatKey];
    let flatValueIndex = `:v_${index}`;
    const keyArray = flatKey.split('.');

    ExpressionAttributeValues[flatValueIndex] = flatVal;

    let updateExpressionBlock = keyArray.map((keyArrVal, keyArrIdx) => {
      const key = `#k_${index}_${keyArrIdx}`;
      ExpressionAttributeNames[key] = keyArrVal;
      return key;
    });
    updateExpressionBlock = updateExpressionBlock.join('.');

    if (Array.isArray(flatVal)) {
      flatValueIndex = `list_append(${updateExpressionBlock}, :v_${index})`;
    }

    return `${updateExpressionBlock} = ${flatValueIndex}`;
  });

  const UpdateExpression = `set ${updateExpressionArr.join(', ')}`;

  return { UpdateExpression, ExpressionAttributeValues, ExpressionAttributeNames };
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
    ...updateDataExp,
  };

  log.info(`updateItemById: ${params}`);
  return documentClient.update(params).promise();
}

module.exports = { updateItemById };
