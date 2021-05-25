const express = require('express')
const router = express.Router()
const logic = require('../entries/logic')
const { validationResult } = require('express-validator')
const { checkEntries } = require('../../utils/validation/entries')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkEntries, (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.create(req.body.entry).then(entry => {
            res.json({entry})
        }).catch(err => {
            res.send(err)
        })
    })

module.exports = router