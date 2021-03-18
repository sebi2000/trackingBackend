const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) => {
        logic.login(req.body.user).then(resp => {
            res.send(resp)
        })
        .catch(err =>{
            res.json(err)
            res.status(404)
        })
    })

module.exports = router