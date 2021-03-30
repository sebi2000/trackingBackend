const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req,res) => {
        logic.create(req.body.entries).then(entries => {
            res.json(entries)
        }).catch(err => {
            res.send(err)
        })
    })

    .get((req, res) => {
        logic.getAll(req.query.page, req.query.rows, req.query.start, req.query.end).then(response => {
            res.json(response)
        }).catch(err => {
            res.send(err)
        })
    })
    
module.exports = router