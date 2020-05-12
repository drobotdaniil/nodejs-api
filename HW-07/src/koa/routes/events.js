const router = require('koa-router')()

const authCheck = require('./auth-check-middleware')
const di = require('../di')
const { EventController, EventValidation } = di.container

router.post('/', authCheck, EventValidation.checkEvent, EventController.createEvent)

router.get('/', EventController.getEvents)

router.delete('/', authCheck, EventController.deleteEvent)

router.put('/', authCheck, EventController.updateEvent)

module.exports = router
