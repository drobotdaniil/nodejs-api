const { db, Sequelize } = require('../db-connect')

const Movie = db.define(
  'movie',
  {
    directorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  }
)

module.exports = Movie