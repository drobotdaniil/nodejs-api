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

const CheckError = require('./middlewares/handleError')

bottle.factory('CheckError', function CheckErrorInit() {
  return new CheckError()
})

bottle.factory('AuthService', function AuthServiceInit() {
  return new AuthService(dbContext.User)
})

bottle.factory('AuthController', function AuthControllerInit(container) {
  return new AuthController(container.AuthService)
}) 

bottle.factory('UserValidator', function UserValidatorInit() {
  return new UserValidation()
})

bottle.factory('EventService', function EventServiceInit() {
  return new EventService(dbContext.Event, dbContext.User)
})

bottle.factory('EventController', function EventControllerInit(container) {
  return new EventController(container.EventService)
})

bottle.factory('EventValidation', function EventValidationInit() {
  return new EventValidation()
})

bottle.factory('BookingService', function BookingServiceInit() {
  return new BookingService(dbContext.Booking)
})

bottle.factory('BookingController', function BookingControllerInit(container) {
  return new BookingController(container.BookingService)
})

bottle.factory('BookingValidation', function BookingValidationInit() {
  return new BookingValidation()
})

module.exports = bottle