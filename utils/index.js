const _ = require('lodash');

/**
 * Capitalizes the first letter of the string
 *
 * @param {string} string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Set up the key values for
 * specific tables
 *
 * @param {string} tableName
 * @param {string} id
 * @param {object} dbTables
 * @returns {object}
 */
function setDbTableKeys(tableName, id, dbTables) {
  const key = {};
  const searchTable = _.find(dbTables, { name: tableName });
  key[searchTable.hash] = id;
  return key;
}

module.exports = {
  capitalizeFirstLetter,
  setDbTableKeys,
};
