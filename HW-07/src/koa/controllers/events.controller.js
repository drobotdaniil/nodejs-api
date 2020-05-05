const {
  events,
  createEvent,
  deleteEvent,
  updateEvent
} = require('../services/event.service');

async function eventsController(ctx, next) {
  ctx.body = await events(ctx.dbContext);
}

async function createEventController(ctx, next) {
  ctx.body = await createEvent(ctx.request.body, ctx.userId, ctx.dbContext);
}

async function deleteEventController(ctx, next) {
  ctx.body = await deleteEvent(ctx.request.body.id, ctx.dbContext)
}

async function updateEventController(ctx, next) {
  ctx.body = await updateEvent(ctx.request.body, ctx.dbContext)
  // try {
  //   const result = await updateEvent(req.body, req.dbContext)

  //   res.send(result)
  // } catch (e) {
  //   res.status(500).send(e.message)
  // }
}

module.exports = {
  eventsController,
  createEventController,
  deleteEventController,
  updateEventController
}
