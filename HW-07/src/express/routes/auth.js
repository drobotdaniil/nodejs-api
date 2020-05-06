const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const di = require('../di')
const {
  AuthController,
  UserValidator,
  CheckError
} = di.container 

// console.log(UserValidator)
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
