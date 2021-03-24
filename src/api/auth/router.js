const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const Helpers = require('../../utils/helpers')
const { checkLogin } = require('../../utils/validation/auth')

router.route('/')
    .post (checkLogin, (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        }
        else{
            logic.login(req.body.user).then(resp => {
                res.send(resp)
            })
            .catch(err =>{
                res.json(err)
                res.status(404)
            })
        }   
    })

module.exports = router