const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const sesion = require('express-session')
const fs = require('fs')
const https = require('https')
const homeRouter = require('./api/routes/home')
const userRouter = require('./api/routes/user')
const authRouter = require('./api/routes/auth')
const key = fs.readFileSync(__dirname + '/certs/selfsigned.key')
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt')

const credentials = { key, cert }
const app = express()
const PORT = process.env.PORT || 3000
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use(
  sesion({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = https.createServer(credentials, app)

server.listen(PORT, () => {
  console.log(`server is running on https://localhost:${PORT}`)
})
