class BookingService {
  constructor(model) {
    this.model = model
  }

  bookings = async () => {
    return await this.model.scope('withModels').findAll()
  }

  bookEvent = async (eventId, userId) => {
    try {
      const booking = await this.model.create({
        eventId,
        userId,
      })

      return await this.model.scope('withModels').findByPk(booking.id)
    } catch (err) {
      throw new Error(err)
    }
  }

  cancelBooking = async (bookingId) => {
    try {
      const booking = await this.model.scope('withModels').findByPk(bookingId)
      const event = booking.event

      await booking.destroy()

      return event
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = BookingService
