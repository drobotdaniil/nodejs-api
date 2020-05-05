class AuthController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  login = async (req) => {
    try {
      return await this.entityService.login(req.payload.email, req.payload.password, req.dbContext);
    } catch (err) {
      throw err;
    }
  }

  signup = async (req) => {
  try {
    return await this.entityService.signup(req.payload.email, req.payload.password, req.dbContext);
  } catch (err) {
    throw err;
  }

  }
}

module.exports = AuthController;
