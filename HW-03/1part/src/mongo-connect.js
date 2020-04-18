const mongoose = require('mongoose')
const config = require('./config/config')

mongoose.connect(config.mongodb.uri, {useNewUrlParser: true})

mongoose.connection.on('error', err => {
  console.log('Error:', err)
})

mongoose.connection.on('connected', () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on('disconnected', () => {
  console.log("Connected to MongoDB");
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
      console.log('Connection closed');
      process.exit(0);
  });
});

module.exports = mongoose