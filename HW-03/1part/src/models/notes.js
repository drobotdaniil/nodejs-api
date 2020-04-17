const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  }
})

module.exports = mongoose.model('Notes', schema)