
const config = require('config');
const jwt = require('jsonwebtoken');
const log4js = require('log4js');

const constHelper = require('../helpers/constHelper');

const logger = log4js.getLogger();
async function jwtVerify(token, algorithm = config.auth.jwt.algorithm) {
  const verifyOptions = {
    algorithm: [algorithm],
  };
  logger.debug('jwtVerify verifyOptions:', verifyOptions);
  try {
    return jwt.verify(token,
      algorithm === 'HS256' ? config.auth.jwt.secretKey : config.auth.jwt.publicKey,
      verifyOptions);
  } catch (err) {
    logger.error('jwtVerify Error : ', err);
    return false;
  }
}

exports.tokenAuthenticate = async (req, res, next) => {
  try {
    console.log('req.headers.authorization :', req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const credentials = await jwtVerify(token);
    if (credentials && credentials.userId) {
      res.credentials = credentials;
      next();
      return;
    }
  } catch (error) {
    console.log('Middleware Auth Error : ', error);
  }

  res.status(constHelper.HTTP_STATUS.UNAUTHORIZED).json({
    statusCode: constHelper.HTTP_STATUS.UNAUTHORIZED,
    error: true,
    message: 'Unauthorized',
  });
};
