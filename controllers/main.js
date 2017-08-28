const log = require('./../libs/logger');
const createInput = require('./../models/crud/create');
const deleteInputById = require('./../models/crud/delete');
const { getItemById, getListOfInputs } = require('./../models/crud/read');
const _ = require('lodash');
const { dbTables } = require('./../models/setup/init');

async function createNewInput(tableName, inputData) {
  const table = _.find(dbTables, { name: tableName });
  const hash = inputData[table.hash] || false;

  log.info(`Creating new input. Table name: ${tableName}`);
  const result = await createInput(tableName, inputData, hash);
  return result;
}

async function getInputById(tableName = null, key = null) {
  log.info(`Getting input with key: ${key} in table ${tableName}`);
  const result = await getItemById(tableName, key);

  return {
    data: result.Item,
  };
}

async function getInputs(tableName = null, limit = 20) {
  log.info(`Getting first ${limit} inputs from table ${tableName}`);
  const result = await getListOfInputs(tableName, limit);

  return {
    data: result.Items,
    meta: {
      totalCount: result.Count,
    },
  };
}

async function deleteInput(tableName = null, key = null) {
  log.info(`Deleting input with id: ${key}`);
  const result = await deleteInputById(tableName, key);

  return result;
}

module.exports = {
  createNewInput,
  getInputById,
  getInputs,
  deleteInput,
};
