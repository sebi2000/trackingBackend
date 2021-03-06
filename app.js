const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const CronJob = require('cron').CronJob
const { sendEmailToAdmin } = require('./src/utils/services')

const { authHandler } = require('./src/utils/middlewares')

const CONSTANTS = require('./src/utils/constants')
const connection = require('./src/database/connection')
const cors = require('cors')

const usersRouter = require('./src/api/users/router')
const authRouter = require('./src/api/auth/router')
const entriesRouter = require('./src/api/entries/router')
const resetRouter = require('./src/api/reset/router')
const tabletRouter = require('./src/api/tablet/router')
const companiesRouter = require('./src/api/companies/router')
const trackingRouter = require('./src/api/tracking/router')

const app = express()

connection()
  .then(() => {
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(
      cors({
        origin: CONSTANTS.ORIGIN,
        credentials: true,
      })
    )

    app.use('/auth', authRouter)
    app.use('/reset', resetRouter)
    app.use('/tablet', tabletRouter)
    app.use(authHandler)
    app.use('/entries', entriesRouter)
    app.use('/tracking', trackingRouter)
    app.use('/isLogged', (req, res) => {
      res.send(req.auth)
    })
    app.use('/companies', companiesRouter)
    app.use('/users', usersRouter)

    var job = new CronJob(
      '0 0 18 * * *',
      function () {
        sendEmailToAdmin()
      },
      null,
      true,
      'Europe/Bucharest'
    )
    job.start()

    app.use('/logout', (req, res) => {
      delete req.auth
      res.send('Log out')
    })

    app.use(function (req, res, next) {
      next(createError(404))
    })

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.send(err)
    })

    app.listen(CONSTANTS.PORT)
    console.log(`Listening to port ${CONSTANTS.PORT} and connected to database`)
  })
  .catch((err) => {
    console.log('Cannot connect to database', err)
  })

module.exports = app
