const { check } = require('express-validator')

class UserValidation {
  checkUser() {
    return [check('email').isEmail(), check('password').isLength({ min: 5 })]
  }
}

module.exports = UserValidation
