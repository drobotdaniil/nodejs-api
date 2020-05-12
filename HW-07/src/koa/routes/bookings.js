const router = require('koa-router')()

const authCheck = require('./auth-check-middleware')

const di = require('../di')
const { BookingController, BookingValidation } = di.container

router.get('/', authCheck, BookingController.getBookings)

router.post('/', authCheck, BookingValidation.checkEventId, BookingController.bookEvent)

router.delete('/', authCheck, BookingValidation.checkBookingId, BookingController.cancelBookingController)

module.exports = router
