const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

const CONSTANTS = require('./src/utils/constants')
const connection = require('./src/database/connection')
const cors = require('cors')

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

// catch 404 and forward to error handler
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
      res.render('error')
    })


    app.listen(CONSTANTS.PORT)
    console.log(`Listening to port ${CONSTANTS.PORT} and connected to database`)
  }).catch(err => {
        console.log('Cannot connect to database', err)
      })


module.exports = app
