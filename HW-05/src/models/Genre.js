const { db, Sequelize } = require('../db-connect')

const Genre = db.define('genre', {
  title: {
    type: Sequelize.STRING,
  },
})

module.exports = Genre
