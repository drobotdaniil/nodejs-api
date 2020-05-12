const { check } = require('express-validator')

class EventValidation {
  checkEvent() {
    return [
      check('title').isLength({ min: 5 }),
      check('description').isLength({ min: 5 }),
      check('date').isLength({ min: 5 }),
      check('price').isNumeric(),
    ]
  }
}

module.exports = EventValidation
