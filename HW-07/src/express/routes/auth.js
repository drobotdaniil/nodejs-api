const { Router } = require('express');
const di = require('../di')
const {
  AuthController,
  UserValidator,
  CheckError
} = di.container 

const router = Router();

router.post(
  '/login',
  UserValidator.checkUser(),
  CheckError.handleError,
  AuthController.login
);

router.post(
  '/signup',
  UserValidator.checkUser(),
  CheckError.handleError,
  AuthController.signup
);

module.exports = router;
