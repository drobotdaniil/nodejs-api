const { Router } = require('express');
const di = require('../di')
const {
  EventController,
  EventValidation,
  CheckError
} = di.container
const authCheck = require('../middlewares/auth-check-middleware');

const router = Router();

router.get('/', EventController.getEvents);

router.post(
  '/',
  authCheck,
  EventValidation.checkEvent(),
  CheckError.handleError,
  EventController.createEvent
);

router.delete('/', authCheck, EventController.deleteEvent)

router.put('/', authCheck, EventController.updateEvent)

module.exports = router;
