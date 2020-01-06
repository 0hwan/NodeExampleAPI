
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config');

const db = {};

const sequelize = new Sequelize(config.database.dbname, null, null, {
  dialect: config.database.protocol,
  port: config.database.port,
  replication: {
    read: [
      {
        host: config.database.replication.slave.host,
        username: config.database.replication.slave.username,
        password: config.database.replication.slave.password,
      },
    ],
    write: {
      host: config.database.replication.master.host,
      username: config.database.replication.master.username,
      password: config.database.replication.master.password,
    },
  },
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 100,
    min: 2,
    idle: 10000,
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== '_query.js') && (file !== 'v2'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;

module.exports = db;
