const { db, Sequelize } = require('../helpers/dbConnect')

const Genre = db.define('genre', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Genre
