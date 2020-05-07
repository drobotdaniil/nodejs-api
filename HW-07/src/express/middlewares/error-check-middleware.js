const { validationResult } = require('express-validator')

class ValidationError {
  handleError(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    next()
  }
}

module.exports = ValidationError
