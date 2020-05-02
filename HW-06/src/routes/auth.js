const { Router } = require('express')
const router = Router()
const passportFacebook = require('../loaders/passport')

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Sign in',
  })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.get('/facebook', passportFacebook.authenticate('facebook'))

router.get(
  '/facebook/callback',
  passportFacebook.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/user')
  }
)

module.exports = router