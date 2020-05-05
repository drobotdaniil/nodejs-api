class BookingController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getBookings = async (req) => {
    try {
      return await this.entityService.bookings(req.dbContext);
    } catch (err) {
      throw err;
    }
  }

  bookEvent = async (req) => {
    try {
      return await this.entityService.bookEvent(req.payload.eventId, req.userId, req.dbContext);
    } catch (err) {
      throw err;
    }
  }

  cancelBooking = async (req) => {
    try {
      return await this.entityService.cancelBooking(req.payload.bookingId, req.dbContext);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookingController;
