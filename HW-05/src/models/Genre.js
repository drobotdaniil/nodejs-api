const { db, Sequelize } = require('../helpers/db-connect')

const Genre = db.define('genre', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Genre
