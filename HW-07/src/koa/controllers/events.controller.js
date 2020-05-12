class EventController {
  constructor(entityService) {
    this.entityService = entityService
  }

  getEvents = async (ctx, next) => {
    ctx.body = await this.entityService.events()
  }

  createEvent = async (ctx, next) => {
    ctx.body = await this.entityService.createEvent(ctx.request.body, ctx.userId)
  }

  deleteEvent = async (ctx, next) => {
    ctx.body = await this.entityService.deleteEvent(ctx.request.body.id)
  }

  updateEvent = async (ctx, next) => {
    ctx.body = await this.entityService.updateEvent(ctx.request.body)
  }
}

module.exports = EventController
