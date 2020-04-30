const { Router } = require('express')
const router = Router()

router.get('/', ensureAuthenticated, function (req, res, next) {
  console.log(req.user)
  res.render('user', { user: req.user, title: "User's page" })
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}

module.exports = router
