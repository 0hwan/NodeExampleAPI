
const express = require('express');
const log4js = require('log4js');
const config = require('config');

const authMiddleware = require('../middlewares/authorization');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

const logger = log4js.getLogger();
const router = express.Router();

router.get('/', asyncMiddleware.wrapAsync(async (req, res) => {
  logger.info('info health..... logger');
  logger.debug('debug health..... logger');
  res.sendStatus(200);
}));

module.exports = router;
