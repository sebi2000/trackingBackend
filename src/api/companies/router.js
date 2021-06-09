const express = require('express')
const { createIndexes } = require('../../database/models/companies')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) => {
        logic.create(req.body.newCompany).then(resp => {
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