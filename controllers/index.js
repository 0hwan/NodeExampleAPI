
const fs = require('fs');
const config = require('config');
const appRoot = require('app-root-path');

const API_VERSION = `/api/${config.app.version}`;
const BASE_PATH = `${appRoot}/controllers`;

function findController(app, dir) {
  fs
    .readdirSync(dir)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'locales'))
    .forEach((file) => {
      file = `${dir}/${file}`;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // console.log(`DIR ${file}`);
        findController(app, file);
      } else {
        const localPath = `${file.split(`${BASE_PATH}/`)[1].split('.')[0]}`;
        console.log(`/${localPath}  ${file}`);
        // eslint-disable-next-line import/no-dynamic-require
        app.use(`${API_VERSION}/${localPath}`, require(file));
        // eslint-disable-next-line import/no-dynamic-require
        app.use(`/${localPath}`, require(file));
      }
    });
}

module.exports = (app) => {
  findController(app, BASE_PATH);
  // eslint-disable-next-line import/no-dynamic-require
  app.use('/', require(`${BASE_PATH}/media`));
  console.log('\r');
};
