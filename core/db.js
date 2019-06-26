const Sequelize = require('sequelize');
const { dbName, host, port, user, password } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  // logging: true,
  logging: false,
  timezone: '+08:00',
  define: {
    //create_time  update_time delete_time
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true,
  },
});

sequelize.sync({
  force: true,
});

module.exports = {
  sequelize,
};
