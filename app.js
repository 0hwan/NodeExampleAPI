
// const nr = require('newrelic');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const config = require('config');
const responseTime = require('response-time');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const log4js = require('log4js');

log4js.configure(config.logger.config, { reloadSecs: 30 });

// 1. Run server
(() => {
  const app = express();
  app.use(log4js.connectLogger(log4js.getLogger('http'), {
    level: 'auto',
    // include the Express request ID in the logs
    format: (req, res, format) => format(`:remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" ":response-time"`),
    nolog: '/health',
  }));


  app.use(responseTime());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // CORS 설정
  app.use(cors());
  app.use(cookieParser());
  // app.use(compression());
  app.use(bearerToken());

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../app/views'));
  app.set('trust proxy', true);

  app.disable('etag');
  app.disable('x-powered-by');

  app.use('/api/v1/docs', express.static(path.join(__dirname, './docs')));
  app.set('port', process.env.PORT || config.http.port);

  if (config.http.enable) {
    http.createServer(app).listen(config.http.port, () => {
      console.log(`Express HTTP server listening on port ${config.http.port}`);
    });
  }

  if (config.https.enable) {
    const httpsOptions = {
      key: fs.readFileSync(config.https.key),
      cert: fs.readFileSync(config.https.cert),
      passphrase: config.https.passphrase,
    };
    https.createServer(httpsOptions, app).listen(config.https.port, () => {
      console.log(`Express HTTPS server listening on port ${config.http.port}`);
    });
  }

  app.timeout = 60 * 60 * 1000;

  console.log('---------------------------------------------------------------');
  console.log('[%s] running by [%s]', config.app.name, config.app.env);
  console.log('\r');
})();
