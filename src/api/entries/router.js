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
        logic.getAll().then(entries => {
            res.json(entries)
        }).catch(err => {
            res.send(err)
        })
    })
    
module.exports = router