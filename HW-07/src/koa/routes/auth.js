const router = require('koa-router')()

const di = require('../di')

const { 
  UserValidation,
  AuthController, 
} = di.container

router.post('/login', UserValidation.checkUser, AuthController.login)

router.post('/signup', UserValidation.checkUser, AuthController.signup)

module.exports = router
