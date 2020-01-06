
const Sequelize = require('sequelize');

module.exports = (db) => {
  const users = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_admin: {
      type: Sequelize.INTEGER,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    user_level: {
      type: Sequelize.INTEGER,
    },
    user_description: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    is_deleted: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }, {
    validations: {},
    methods: {},
    tableName: 'users',
    timestamps: false,
    underscored: false,
  });

  return users;
};
