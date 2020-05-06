class EventController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getEvents = async (req, h) => {
    try {
      return await this.entityService.events();
    } catch (err) {
      return h.response(err.message).code(400);
    }
  }

  createEvent = async (req, h) => {
    try {
      return await this.entityService.createEvent(req.payload, req.userId);
    } catch (err) {
      return h.response(err.message).code(400);
    }
  }

  deleteEvent = async (req, h) => {
    try {
      return await this.entityService.deleteEvent(req.payload.id)
    } catch (err) {
      return h.response(err.message).code(500)
    }
  }

  updateEvent = async (req, h) => {
    try {
      return await this.entityService.updateEvent(req.payload)
    } catch (err) {
      return h.response(err.message).code(500)
    }
  } 
}

module.exports = EventController;
