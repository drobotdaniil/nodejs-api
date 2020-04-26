const { db } = require('../helpers/db-connect')
const Movie = require('./Movie')
const Genre = require('./Genre')

const Navigation = db.define('navigation', {})

Movie.belongsToMany(Genre, { through: Navigation })
Genre.belongsToMany(Movie, { through: Navigation })

module.exports = Navigation
