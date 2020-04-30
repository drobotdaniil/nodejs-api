const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: '884412702030652',
      clientSecret: '5f5ddd777b67559f3bfb8369851e6c42',
      callbackURL: 'https://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName'],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
