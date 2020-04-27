const { db, Sequelize } = require('../helpers/dbConnect')

const Director = db.define(
  'director',
  {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    yearOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }
)

module.exports = Director