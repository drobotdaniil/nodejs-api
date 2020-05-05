const router = require('koa-router')();

const authCheck = require('./auth-check-middleware');

const {
  createEventController,
  eventsController,
  deleteEventController,
  updateEventController
} = require('../controllers/events.controller');

const {
  createValidator
} = require('../validators/event.validation');

router.post('/', authCheck, createValidator, createEventController);

router.get('/', authCheck, eventsController);

router.delete('/', authCheck, deleteEventController);

router.put('/', authCheck, updateEventController);

module.exports = router;
