class BookingController {
  constructor(entityService) {
    this.entityService = entityService
  }

  getBookingsController = async (req, res) => {
    try {
      const result = await this.entityService.bookings()

      res.send(result)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  bookEventController = async (req, res) => {
    try {
      const result = await this.entityService.bookEvent(req.body.eventId, req.userId)

      res.send(result)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  cancelBooking = async (req, res) => {
    try {
      const result = await this.entityService.cancelBooking(req.body.bookingId)

      res.send(result)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}

module.exports = BookingController