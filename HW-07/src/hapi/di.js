const bottle = require('bottlejs').pop('app');

const {
  AuthController,
  BookingController,
  EventController
} = require('./controllers');

const dbContext = require('../database/models');

const {
  AuthService,
  BookingsService,
  EventService
} = require('./services');

const {
  UserValidator,
  BookingValidator,
  EventValidator
} = require('./validations');


bottle.factory('UserModel', () => {
  return dbContext.User
})

bottle.factory('EventModel', () => {
  return dbContext.Event
})

bottle.factory('BookingModel', () => {
  return dbContext.Booking
})

// User
bottle.factory('AuthService', (container) => {
  return new AuthService(container.UserModel);
});

bottle.factory('AuthController', (container) => {
  return new AuthController(container.AuthService);
});

bottle.factory('UserValidator', () => {
  return new UserValidator();
});

// Event
bottle.factory('EventService', (container) => {
  return new EventService(container.EventModel, container.UserModel);
});

bottle.factory('EventController', (container) => {
  return new EventController(container.EventService);
});

bottle.factory('EventValidator', () => {
  return new EventValidator();
});

// Booking
bottle.factory('BookingService', (container) => {
  return new BookingsService(container.BookingModel);
});

bottle.factory('BookingController', (container) => {
  return new BookingController(container.BookingService);
});

bottle.factory('BookingValidator', () => {
  return new BookingValidator();
});

module.exports = bottle;
