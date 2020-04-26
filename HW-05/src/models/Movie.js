const { db, Sequelize } = require('../helpers/db-connect')
const Director = require('./Director')

const Movie = db.define(
  'movie',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    directorId: {
      type: Sequelize.INTEGER,
      references: {
        model: Director,
        key: 'id'
      },
      allowNull: false
    }
  }
)

Director.hasMany(Movie)

module.exports = Movie