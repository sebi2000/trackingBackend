const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkTracking } = require('../../utils/validation/tracking')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router
  .route('/')
  .post(checkTracking, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
    else
      logic
        .create(req.body.tracking)
        .then((tracking) => {
          res.send({ tracking })
        })
        .catch((err) => {
          res.send(err)
        })
  })
  .get((req, res) => {
    logic
      .getAll(req.query.page, req.query.rows)
      .then((tracking) => {
        res.json(tracking)
      })
      .catch((err) => {
        res.send(err)
      })
  })

module.exports = router
