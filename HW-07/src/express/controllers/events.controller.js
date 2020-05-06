class EventController {
  constructor(entityService) {
    this.entityService = entityService
  }

  getEvents = async (req, res) => {
    try {
      const result = await this.entityService.events();
  
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  createEvent = async (req, res) => {
    try {
      const result = await this.entityService.createEvent(req.body, req.userId);
  
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  deleteEvent = async (req, res) => {
    try {
      const result = await this.entityService.deleteEvent(req.body.id, req.dbContext);
      res.send(result)
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  updateEvent = async (req, res) => {
    try {
      const result = await this.entityService.updateEvent(req.body, req.dbContext)
  
      res.send(result)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }
}

module.exports = EventController
