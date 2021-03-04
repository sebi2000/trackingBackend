const express = require('express')
const router = express.Router()
const logic = require('./logic')

router.route('/')
    .post((req, res) => {
        logic.getByName(req.body).then(user =>{
            if(user === null)
                res.json("The user does not exist")
            else {
                const resp = logic.validatePass(req.body.password, user.password)
                res.json(resp)
            }
        })
        .catch(err =>{
            res.json(err)
            res.status(404)
        })
    })

module.exports = router