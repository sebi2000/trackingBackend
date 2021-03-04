const express = require('express')
const router = express.Router()
const logic = require('./logic')
const bcrypt = require('bcrypt')

router.route('/')
    .post((req, res) =>{ 
        logic.create(req.body).then(users => {
            res.json(users)      
        }).catch(err => {
            res.send(err)
        })  
    })
    .get((req,res) => {
        logic.getAll().then(users => {
            res.json(users)
        }) .catch(err => {
            res.send(err)
        })
    })

router.route('/:ID')
    .get((req,res) => {
        logic.getById(req.params.ID).then(user => {
            res.json(user)
        }).catch(err => {
            res.status(400)
            res.send(err)
        })
    })
    

module.exports = router