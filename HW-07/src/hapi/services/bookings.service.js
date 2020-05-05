class BookingsService {
  constructor(model) {
    this.model = model;
  }

  bookings = async () => {
    return await this.model.scope('withModels').findAll();
  }

  bookEvent = async (eventId, userId) => {
    const booking = await this.model.create({
      eventId,
      userId
    });

    return await this.model.scope('withModels').findByPk(booking.id);
  }

  cancelBooking = async (bookingId) => {
    const booking = await this.model.scope('withModels').findByPk(bookingId);
    const event = booking.event;

    await booking.destroy();

    return event;
  }
}

module.exports = BookingsService;
