const express = require('express');
const Controller = require('./../controllers/main');
const log = require('../libs/logger');
const { capitalizeFirstLetter } = require('./../utils');

const router = express.Router();

router
  .get('/:tableName/:key', async (req, res, next) => {
    try {
      const reqParams = req.params;
      const tableName = capitalizeFirstLetter(reqParams.tableName);
      const inputKey = reqParams.key || '';

      log.info(`getInputById: Getting input with key: ${inputKey}`);
      const result = await Controller.getInputById(tableName, inputKey);

      return res.status(200).json(result);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  })
  .get('/:tableName', async (req, res, next) => {
    try {
      const limit = req.query.limit || 20;
      const tableName = capitalizeFirstLetter(req.params.tableName);

      log.info(`getInputs: Getting first ${limit} from table ${tableName}`);
      const result = await Controller.getInputs(tableName, limit);

      return res.status(200).json(result);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  })
  .post('/:tableName', async (req, res, next) => {
    try {
      const tableName = capitalizeFirstLetter(req.params.tableName);

      log.info(`createNewInput: Creating new input in table: ${tableName}`);
      const result = await Controller.createNewInput(tableName, req.body);

      return res.status(200).json(result);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  })
  .delete('/:tableName/:key', async (req, res, next) => {
    try {
      const reqParams = req.params;
      const tableName = capitalizeFirstLetter(reqParams.tableName);
      const inputKey = reqParams.key || '';

      log.info(`deleteInputById: Getting input with key: ${inputKey} from table:${tableName}`);
      const result = await Controller.deleteInput(tableName, inputKey);

      return res.status(200).json(result);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  })
  .patch('/:tableName/:key', async (req, res, next) => {
    try {
      const reqParams = req.params;
      const tableName = capitalizeFirstLetter(reqParams.tableName);
      const inputKey = reqParams.key || '';
      const updateData = req.body;

      log.info(`updateInputById: Update data for key: ${inputKey} from table:${tableName}`);
      const result = await Controller.updateInput(tableName, inputKey, updateData);

      return res.status(200).json(result);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  });

module.exports = router;
