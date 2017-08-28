
const attributeTypes = {
  string: 'S',
  number: 'N',
  binary: 'B',
};
/**
 * Creates a schema for dynamodb using minimum tableName, hash and hashType.
 * All other attributes are optional.
 *
 * @param {any} tableName
 * @param {any} hash
 * @param {any} hashType
 * @param {any} range
 * @param {any} rangeType
 * @param {number} [read=5]
 * @param {number} [write=2]
 * @returns {object}
 */
function createSchema(tableName, hash, hashType, range, rangeType, read = 5, write = 2) {
  if (!(tableName && hash && hashType)) {
    return new Error('Missing required parameters: tableName or hash');
  }

  /**
   * Defining schema this way so the
   * eslint would not change it back to const.
   * Having schema as const will create an error when
   * there will be range and rangeType attributes.
   */
  let schema;

  schema = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: hash,
        KeyType: 'HASH',
      },
    ],
    AttributeDefinitions: [
      { AttributeName: hash,
        AttributeType: attributeTypes[hashType],
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: read,
      WriteCapacityUnits: write,
    },
  };

  if (range && rangeType) {
    schema.KeySchema.push(
      {
        AttributeName: range,
        KeyType: 'RANGE',
      },
    );
    schema.AttributeDefinitions.push(
      {
        AttributeName: range,
        AttributeType: attributeTypes[rangeType],
      },
    );
  }

  return schema;
}

module.exports = createSchema;
