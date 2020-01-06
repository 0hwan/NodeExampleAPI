
const express = require('express');
const log4js = require('log4js');
const config = require('config');
const responseFormat = require('response-format');

const authMiddleware = require('../middlewares/authorization');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

const services = require('../services');

const logger = log4js.getLogger();
const router = express.Router();

router.get('/', authMiddleware.tokenAuthenticate, asyncMiddleware.wrapAsync(async (req, res) => {
  logger.info('info users..... logger');

  const user = services.users.userInfo(res.credentials.userId);
  if (!user || !user.id) {
    res.json(responseFormat.badRequest('Invalid Argument'));
    return;
  }

  logger.debug('debug users..... logger');
  res.json(responseFormat.success('OK', user));
}));

module.exports = router;
