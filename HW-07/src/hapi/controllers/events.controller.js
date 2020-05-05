class EventController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getEvents = async (req) => {
    try {
      return await this.entityService.events(req.dbContext);
    } catch (err) {
      throw err;
    }
  }

  createEvent = async (req) => {
    try {
      return await this.entityService.createEvent(req.payload, req.userId, req.dbContext);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EventController;
