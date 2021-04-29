const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) => {
        logic.sendEmail(req.body.email).then(resp => {
            res.send(resp)
        })
    })
router.route('/:TOKEN')
    .get((req, res) => {
        logic.verifyToken(req.params.TOKEN).then(resp => {
            res.json(resp)
        })
    })

module.exports = router
