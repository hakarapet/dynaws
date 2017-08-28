const AWS = require('aws-sdk');
const log = require('./../../libs/logger');
const { dbTables } = require('./../setup/init');
const { setDbTableKeys } = require('./../../utils');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = async (tableName = null, id = null) => {
  const key = setDbTableKeys(tableName, id, dbTables);

  const params = {
    TableName: tableName,
    Key: key,
    ReturnValues: 'ALL_OLD',
  };

  log.info('delete');
  const data = await documentClient.delete(params).promise();
  return {
    msg: `Input with id: ${id} has successfully been deleted.`,
    data,
  };
};
