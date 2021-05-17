const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
<<<<<<< HEAD
const session = require('express-session')
const CronJob = require('cron').CronJob
const {sendEmailToAdmin} = require('./src/utils/services')
=======
const session = require('express-session');
const jwt = require('jsonwebtoken')
const { getById } = require('./src/api/users/logic')
>>>>>>> c4d0148 (feat : add jwt auth)

const CONSTANTS = require('./src/utils/constants')
const connection = require('./src/database/connection')
const cors = require('cors')

const usersRouter = require('./src/api/users/router')
const authRouter = require('./src/api/auth/router')
const entriesRouter = require('./src/api/entries/router')
const resetRouter = require('./src/api/reset/router')

const authHandler = async (req, res, next) => {
  let auth = req.headers.authorization
  token = auth.substr(auth.indexOf(' ') + 1)
  let decoded

  try{
    decoded = jwt.verify(token, 'secret')
    req.auth = decoded
  }catch(err) {
    res.send(err)
  }

  let user = await getById(decoded.user._id)
 
  if(user !== null)
    next()
  else res.send('User not found')
  
}

const app = express();

connection().then( () => {

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(cors({
        origin: CONSTANTS.ORIGIN,
        credentials: true
     }))
  
  app.use(session ({
    secret: 'maresecret',
  }))

  app.use('/auth', authRouter)
  app.use(authHandler)
  app.use('/reset', resetRouter)
  app.use('/users', usersRouter)
  app.use('/entries', entriesRouter)

  var job = new CronJob('0 0 13 * * *', function() {
    sendEmailToAdmin()
  }, null, true, 'Europe/Bucharest');
  job.start();


  app.use('/isLogged', (req, res) => {
    res.send(req.auth)
  })

  app.use('/logout', (req, res) => {
    delete req.auth
    console.log("REQ.AUTH", req.auth)
    res.send("Log out")

  })

  

  
 
  app.use(function(req, res, next) {
      next(createError(404))
  })

  // error handler
    app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
      res.status(err.status || 500);
      res.send(err)
    })

    app.listen(CONSTANTS.PORT)
    console.log(`Listening to port ${CONSTANTS.PORT} and connected to database`)

  }).catch(err => {
      console.log('Cannot connect to database', err)
    })


module.exports = app
