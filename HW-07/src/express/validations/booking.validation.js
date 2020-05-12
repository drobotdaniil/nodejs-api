const { check } = require('express-validator')

class BookingsValidation {
  checkEventId() {
    return [check('eventId').isLength({ min: 5 })]
  }

  checkBookingId() {
    return [check('bookingId').isLength({ min: 5 })]
  }
}

module.exports = BookingsValidation
