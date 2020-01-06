
const Sequelize = require('sequelize');
const _ = require('lodash');

const models = require('../models');

module.exports = {
  userInfo: async (id) => {
    const user = await models.users.findOne({
      raw: true,
      where: {
        id,
      },
    });
    return user;
  },
};
