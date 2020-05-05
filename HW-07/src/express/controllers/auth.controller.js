const {
  login,
  signup
} = require('../services/auth.service');

async function loginController(req, res) {
  const result = await login(req.body.email, req.body.password, req.dbContext);
  res.send(result);
}

async function signupController(req, res) {
  const result = await signup(req.body.email, req.body.password, req.dbContext);
  res.send(result);
}

module.exports = {
  loginController,
  signupController,
}
