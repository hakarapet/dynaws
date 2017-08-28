const AWS = require('aws-sdk');
const log = require('./../../libs/logger');
const uuid = require('uuid/v4');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = async (tableName = null, data = {}) => {
  const params = {
    TableName: tableName,
    Item: data,
  };

  params.Item.id = uuid();
  log.info('create');
  await documentClient.put(params).promise();
  data.id = params.Item.id;
  return { data };
};
