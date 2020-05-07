const dbContext = require('../database/models')
const bottle = require('bottlejs').pop('express')

const {
  AuthController,
  EventController,
  BookingController
} = require('./controllers')

const {
  AuthService,
  EventService,
  BookingService
} = require('./services')

const {
  UserValidation,
  EventValidation,
  BookingValidation
} = require('./validations')

const ValidationError = require('./middlewares/error-check-middleware')

bottle.factory('UserModel', () => {
  return dbContext.User
})

bottle.factory('EventModel', () => {
  return dbContext.Event
})

bottle.factory('BookingModel', () => {
  return dbContext.Booking
})

bottle.factory('CheckError', () => {
  return new ValidationError()
})

bottle.factory('AuthService', (container) => {
  return new AuthService(container.UserModel)
})

bottle.factory('AuthController', (container) => {
  return new AuthController(container.AuthService)
}) 

bottle.factory('UserValidator', () => {
  return new UserValidation()
})

bottle.factory('EventService', (container) => {
  return new EventService(container.EventModel, container.UserModel)
})

bottle.factory('EventController', (container) => {
  return new EventController(container.EventService)
})

bottle.factory('EventValidation', () => {
  return new EventValidation()
})

bottle.factory('BookingService', (container) => {
  return new BookingService(container.BookingModel)
})

bottle.factory('BookingController', (container) => {
  return new BookingController(container.BookingService)
})

bottle.factory('BookingValidation', () => {
  return new BookingValidation()
})

module.exports = bottle