const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) => {
        logic.create(req.body.tracking).then(tracking => {
            res.send({tracking})
        })
        .catch(err => {
            res.send(err)
        })
    })
    .get((req,res) => {
        logic.getAll(req.query.page, req.query.rows).then(tracking => {
            res.json(tracking)
        }).catch(err => {
            res.send(err)
        })
    })

module.exports = router