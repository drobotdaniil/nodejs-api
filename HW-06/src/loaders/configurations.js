const exphbs = require('express-handlebars')
const { static } = require('express')
const { join } = require('path')
const sesion = require('express-session')
const passport = require('passport')

const homeRouter = require('../routes/home')
const userRouter = require('../routes/user')
const authRouter = require('../routes/auth')

function initMiddlewares(app) {
  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
  })

  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', 'views')

  app.use(static(join(__dirname, '..', 'public')))
  app.use(
    sesion({
      secret: 's3cr3t',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 300000 },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/', homeRouter)
  app.use('/user', userRouter)
  app.use('/auth', authRouter)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error', {
      error: err.message,
    })
  })
}

module.exports = initMiddlewares
