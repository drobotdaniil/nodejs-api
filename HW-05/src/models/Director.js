const { db, Sequelize } = require('../db-connect')

const Director = db.define(
  'director',
  {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    yearOfBirth: {
      type: Sequelize.DATE,
    },
  }
)

module.exports = Director