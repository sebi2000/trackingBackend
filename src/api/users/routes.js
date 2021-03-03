const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) =>{ 
        logic.create(req.body).then(()=>{
            res.json("succes")
        })
        .catch(err => {
            res.send(err)
        })
    })
    .get((req,res) => {
        logic.getAll().then(users => {
            res.json(users)
        }) 
        .catch(err => {
            res.send(err)
        })
    })
    

module.exports = router