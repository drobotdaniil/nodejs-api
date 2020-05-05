const {
  events,
  createEvent,
  deleteEvent,
  updateEvent
} = require('../services/event.service');

async function getEventsController(req, res) {
  const result = await events(req.dbContext);

  res.send(result);
}

async function createEventController(req, res) {
  const result = await createEvent(req.body, req.userId, req.dbContext);

  res.send(result);
}

async function deleteEventController(req, res) {
  try {
    const result = await deleteEvent(req.body.id, req.dbContext);
    res.send(result)
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function updateEventController(req, res) {
  try {
    const result = await updateEvent(req.body, req.dbContext)

    res.send(result)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = {
  getEventsController,
  createEventController,
  deleteEventController,
  updateEventController,
}
