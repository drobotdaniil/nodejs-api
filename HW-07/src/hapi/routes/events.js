const di = require('../di');

const {
  EventController,
  EventValidator
} = di.container;

module.exports = [
  {
    method: 'GET',
    path: '/events',
    handler: EventController.getEvents
  },
  {
    method: 'POST',
    path: '/events',
    options: {
      auth: 'jwt',
      validate: EventValidator.getCreateValidator()
    },
    handler: EventController.createEvent
  },
  {
    method: 'DELETE',
    path: '/events',
    options: {
      auth: 'jwt'
    },
    handler: EventController.deleteEvent
  },
  {
    method: 'PUT',
    path: '/events',
    options: {
      auth: 'jwt'
    },
    handler: EventController.updateEvent
  }
]
