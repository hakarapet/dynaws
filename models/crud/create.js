const AWS = require('aws-sdk');
const _ = require('lodash');
const log = require('./../../libs/logger');
const uuid = require('uuid/v4');
const { dbTables } = require('./../setup/init');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = async (tableName = null, data = {}, hash) => {
  const params = {
    TableName: tableName,
    Item: data,
  };

  const table = _.find(dbTables, { name: tableName });
  params.Item[table.hash] = hash || uuid();
  params.Item[table.hash] = params.Item[table.hash].toLowerCase();

  log.info('create');
  await documentClient.put(params).promise();
  data.id = params.Item.id;

  return { data };
};
