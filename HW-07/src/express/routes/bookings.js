const { Router } = require('express')

const authCheck = require('../middlewares/auth-check-middleware')
const di = require('../di')
const { BookingController, BookingValidation, CheckError } = di.container

const router = Router()

router.get('/', authCheck, BookingController.getBookingsController)

router.post(
  '/',
  authCheck,
  BookingValidation.checkEventId(),
  CheckError.handleError,
  BookingController.bookEventController
)

router.delete(
  '/',
  authCheck,
  BookingValidation.checkBookingId(),
  CheckError.handleError,
  BookingController.cancelBooking
)

module.exports = router
