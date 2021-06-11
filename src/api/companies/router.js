const express = require('express')
const { createIndexes } = require('../../database/models/companies')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkCompanies } = require('../../utils/validation/companies')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkCompanies, (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.create(req.body.newCompany).then(resp => {
            res.send(resp)
        }).catch(err => {
            res.send(err)
        })
    })
    .get((req, res) => {
        logic.getAll(req.query.page, req.query.rows).then(resp => {
            res.send(resp)
        }).catch(err => {
            res.send(err)
        })
    })
router.route('/:id')
    .put((req, res) => {
        logic.update(req.params.id, req.body).then(resp => {
            res.send(resp)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .delete((req, res) => {
        logic.delete(req.params.id).then(resp => {
            res.send(resp)
        })
        .catch(err => {
            res.send(err)
        })
    })


module.exports = router