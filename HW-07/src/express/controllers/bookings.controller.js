const {
  bookings,
  bookEvent,
  cancelBooking
} = require('../services/bookings.service');

async function getBookingsController(req, res) {
  const result = await bookings(req.dbContext);

  res.send(result);
}

async function bookEventController(req, res) {
  const result = await bookEvent(req.body.eventId, req.userId, req.dbContext);

  res.send(result);
}

async function cancelBookingController(req, res) {
  const result = await cancelBooking(req.body.bookingId, req.dbContext);

  res.send(result);
}

module.exports = {
  getBookingsController,
  bookEventController,
  cancelBookingController
}
